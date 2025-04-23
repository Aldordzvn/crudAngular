import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Producto } from '../producto.model';
import { ProductosService } from '../../../productos.service';

@Component({
  selector: 'app-add-producto',
  imports: [RouterModule, FormsModule],
  templateUrl: './add-producto.component.html',
  styleUrl: './add-producto.component.scss'
})
export class AddProductoComponent {
  warningImg = 'img/warning.svg';
  closeImg = 'img/close.svg';
  nombre: string = '';
  marca: string = '';
  descripcion: string = '';
  index!: number;
  alerta: boolean = false;
  llaveProducto: string | null = null;


  constructor(private productoService: ProductosService, private route: Router, private activatedRouter: ActivatedRoute) { }

  
  ngOnInit(){
    const llave = this.activatedRouter.snapshot.paramMap.get('llave');
    if(llave){
      const producto = this.productoService.getProductoByLlave(llave);
      if(producto){
        this.llaveProducto = llave;
        this.descripcion = producto.descripcion;
        this.nombre = producto.nombre;
        this.marca = producto.marca;
      }
    }
  }

  toggleAlerta(){
    this.alerta = !this.alerta;
  }

  addProducto(form: NgForm) {
    if (!form.valid) {
      this.alerta = true;
      this.limpiarFormulario();
    } else {
       const producto: Producto = new Producto(this.nombre,this.marca,this.descripcion);
       this.productoService.guardarProducto(producto, this.llaveProducto);
       this.route.navigate(['/productos']);
    }
  }

  limpiarFormulario(){
    this.nombre = '';
    this.marca = '';
    this.descripcion = '';
  }
}
