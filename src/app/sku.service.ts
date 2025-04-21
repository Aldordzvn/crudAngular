import { Injectable } from '@angular/core';
import { Sku } from './side-view/sku/sku.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { DatosService } from './datos.service';

@Injectable({
  providedIn: 'root'
})
export class SkuService {

  skus : {[llave:string]: Sku} = {};
  skuActualizados = new Subject<{[llave:string]: Sku}>();

  constructor(private datosService:DatosService){}

  listarRegistros(){
    return this.datosService.listarSku();
  }

  guardarSku(registro: Sku, llave: string | null = null){
    if(!llave){
      this.datosService.agregarSku(registro).subscribe(() =>{
        this.refrescarRegistros();
      });
    }else{
      this.datosService.modificarSku(registro, llave).subscribe(()=>{
        this.refrescarRegistros();
        console.log("entre a modificar desde el service: ", this.skus);
      });
    }
  }

  private refrescarRegistros(){
    this.listarRegistros().subscribe((skus:{[llave:string]: Sku}) =>{
      this.setSkus(skus);
    })
  }

  setSkus(skus: {[llave:string]: Sku}){
    this.skus = skus;
    this.skuActualizados.next(this.skus);
  }

  getSkuByLlave(llave:string): Sku | undefined{
    return this.skus[llave];
  }

  eliminarSkus(llave:string){
    this.datosService.eliminarRegistro(llave, 'skus').subscribe(() =>{
      this.refrescarRegistros();
    })
  }





  // skuContainer: BehaviorSubject<Sku[]> = new BehaviorSubject<Sku[]>([]);

  // skuContainer: Sku[] = [
  //   {
  //     id: 1,
  //     producto: 'Pantalones',
  //     id_producto: 1,
  //     sku: 'SKU1999',
  //     cantidad: 150
  //   },
  //   {
  //     id: 2,
  //     producto: 'Cachuchas',
  //     id_producto: 2,
  //     sku: 'SKU2000',
  //     cantidad: 200
  //   },
  //   {
  //     id: 3,
  //     producto: 'Tenis AF1',
  //     id_producto: 3,
  //     sku: 'SKU2001',
  //     cantidad: 100
  //   }
  // ];

  // skuReload = [...this.skuContainer];

  // constructor() { }

  // ngOnInit(){
  //   this.skuContainer = this.skuReload;
  // }

  // obtenerId(): number {
  //   if (this.skuContainer.length === 0) {
  //     let index: number = 0;
  //     // console.log("Entro al undefined");
  //     return index;
  //   } else {
  //     let ultimo: Sku = this.skuContainer.slice(-1)[0];
  //     let index: number = ultimo.id;
  //     return index;
  //   }
  // }

  // // obtenerIdProducto(): number{
    
  // // }

  // addSku(sku: Sku) {
  //   let lastIndex: number = this.obtenerId();
  //   let skuadd: Sku = sku;
  //   skuadd.id = ++lastIndex;
  //   this.skuContainer.push(skuadd);
  // }

  // editSku(sku:Sku){
  //   let skuFind = this.skuReload.findIndex(p => p.id === sku.id);
  //   if(skuFind !== -1 ){
  //     this.skuReload[skuFind].id = sku.id;
  //     this.skuReload[skuFind].producto = sku.producto;
  //     this.skuReload[skuFind].id_producto = sku.id_producto;
  //     this.skuReload[skuFind].sku = sku.sku;
  //     this.skuReload[skuFind].cantidad = sku.cantidad;
  //     console.log(this.skuContainer[skuFind]);
  //     this.ngOnInit();
  //   }else{
  //     console.error(`No se encontro el SKU con el ID: ${sku.id}`);
  //   }
  // }

}
