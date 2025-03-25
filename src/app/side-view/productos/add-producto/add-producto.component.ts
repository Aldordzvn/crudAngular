import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
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

  constructor(private productoService: ProductosService, private route: Router) { }

  // addProducto(event: Event){
  //   if(this.nombre && this.marca && this.descripcion){
  //     const producto: Producto = new Producto(this.nombre, this.marca, this.descripcion);
  //     this.productoService.addProducto(producto);
  //     this.route.navigate(['productos']);
  //   }else{
  //     this.alerta = true;
  //   }
  // }

  toggleAlerta(){
    this.alerta = !this.alerta;
  }

  addProducto(form: NgForm) {
    if (!form.valid) {
      this.alerta = true;
    } else {
      const producto: Producto = new Producto(this.index, this.nombre, this.marca, this.descripcion);
      this.productoService.addProducto(producto);
      this.route.navigate(['productos']);
    }
  }


}
