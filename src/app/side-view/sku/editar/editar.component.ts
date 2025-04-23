import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Producto } from '../../productos/producto.model';
import { ProductosService } from '../../../productos.service';
import { Sku } from '../sku.model';
import { SkuService } from '../../../sku.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editar',
  imports: [RouterModule, FormsModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.scss'
})
export class EditarComponent {
  productosLista: {[llave:string]: Producto} = {};
  skuLista: {[llave:string]: Sku} = {};
  productosSubscription : Subscription | null = null;
  skuSubscription : Subscription | null = null;
  llaveSku : string = '';
  llaveProducto! : string;
  closeImg = 'img/close.svg';
  warningImg = 'img/warning.svg';
  id!: number;
  sku: string = '';
  opcValue!: number;
  cantidad!: number;
  productoObjeto!: Producto;
  skuObjeto!: Sku;
  alerta: boolean = false;
  skuEncontrado: boolean = false;
  editDisabled: boolean = false;
  @ViewChild('claseInputSku') referenciaSkuInput!: ElementRef;

  constructor(private productoService: ProductosService, private skuService: SkuService, private route: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.llaveSku = this.activateRoute.snapshot.queryParams['llave'];
    if(this.llaveSku){
      this.editDisabled = true;
    }
    this.cargarProductos();
    this.cargarSkus();
    this.productosSubscription = this.productoService.productosActualizados.subscribe((productos) => {
      this.productosLista = productos;
    });
    this.skuSubscription = this.skuService.skuActualizados.subscribe((skus)=>{
      this.skuLista = skus;
    });
  }

  cargarProductos(){
    this.productoService.listarProductos().subscribe((productos: {[llave:string]: Producto}) => {
      this.productosLista = productos;
      this.productoService.setProductos(productos);
    });
  }

  cargarSkus(){
    this.skuService.listarRegistros().subscribe((skus: {[llave:string]: Sku}) =>{
      this.skuLista = skus;
      this.skuService.setSkus(skus);
      if(this.llaveSku){
        const obj = this.llaveSku;
        this.obtenerSku(obj);
      }
    });
  }

  obtenerLlaves(): string[]{
    if(this.productosLista){
      return Object.keys(this.productosLista);
    }
    return[];
  }

  obtenerLlavesSku(): string[]{
    if(this.skuLista){
      return Object.keys(this.skuLista);
    }
    return[];
  }

  toggleAlerta(){
    this.alerta = !this.alerta;
    if(this.skuEncontrado){
      this.skuEncontrado = false;
    }
  }

  limpiarFormulario(){
    this.sku = '';
    this.opcValue = 0;
    this.cantidad = 0;
  }

  obtenerSku(llave: string){
    const skuObj = this.skuLista[llave];
    if(skuObj){
      this.sku = skuObj.sku;
      this.llaveProducto = skuObj.llaveProducto;
      this.cantidad = skuObj.cantidad;
      console.log(`${this.sku} - ${this.llaveProducto} - ${this.cantidad}`);
    }else{
      console.error(`No se encontro la llave ${llave} - ${skuObj}`);
      console.error(this.skuLista[llave]);
    }
  } 

  obtenerSkuIdentico(skuClave: string): boolean{
    for(let llave of this.obtenerLlavesSku()){
      if(this.skuLista[llave].sku === this.sku){
        this.skuEncontrado = true;
        return true;
      }
    }
    return false;
  }

  guardarSku(form: NgForm) {
    if (!form.valid) {
      this.alerta = true;
      this.limpiarFormulario();
    } else {
      if(this.llaveSku === undefined){
        const nombreProducto = this.productosLista[this.llaveProducto].nombre;
        const sku: Sku = new Sku(nombreProducto, this.llaveProducto,this.sku, this.cantidad);
        console.log(sku);
        if(this.obtenerSkuIdentico(this.sku) || this.cantidad <= 0){
          this.alerta = true;
          this.limpiarFormulario();
          console.log("entro a true", this.alerta);
        }else{
          this.skuService.guardarSku(sku, this.llaveSku);
          this.route.navigate(['administracion']);
        }
      }else{
        const registro: Sku = {...this.skuLista[this.llaveSku]};
        if(registro){
          registro.llaveProducto = this.llaveProducto;
          registro.producto = this.productosLista[this.llaveProducto].nombre;
          registro.cantidad = this.cantidad;
          if(this.cantidad <= 0){
            this.alerta = true;
          }else{
            this.skuService.guardarSku(registro, this.llaveSku);
            console.log(registro);
            this.route.navigate(['administracion']);
          }
        }else{
          console.error(`No se encontro el registro : ${registro}`);
        }
      }
    }
  }
}
