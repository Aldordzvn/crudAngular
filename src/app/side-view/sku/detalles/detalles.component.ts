import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Producto } from '../../productos/producto.model';
import { ProductosService } from '../../../productos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalles',
  imports: [RouterModule],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.scss'
})
export class DetallesComponent {
  productoDetalles: { [llave: string]: Producto } = {};
  closeImg = 'img/close.svg';
  nombreProducto!: string;
  marca_producto!: string;
  cantidad!: number;
  descripcion!: string;
  productosSubscription: Subscription | null = null;
  llaveSku: string = '';
  llaveProducto: string = '';
  cantidadSku!: number;

  constructor(private route: ActivatedRoute, private productoService: ProductosService) { }

  ngOnInit() {
    this.llaveSku = this.route.snapshot.queryParams['llave'];
    this.llaveProducto = this.route.snapshot.queryParams['llaveP'];
    this.cantidadSku = this.route.snapshot.queryParams['cantidad'];
    if (this.llaveProducto && this.cargarProductos()) {
      this.obtenerProducto(this.llaveProducto);
      console.log(this.productoDetalles[this.llaveProducto]);
    }
  }

  cargarProductos() {
    this.productoService.listarProductos().subscribe((productos: { [llave: string]: Producto }) => {
      this.productoDetalles = productos;
      this.productoService.setProductos(productos);
      if (this.llaveProducto) {
        this.obtenerProducto(this.llaveProducto);
      } else {
        console.error(`No se encontro el objeto, llave: ${this.llaveProducto}`);
      }
    });
  }

  obtenerProducto(llave: string) {
    const objetoProducto = this.productoDetalles[llave];
    if (objetoProducto) {
      this.nombreProducto = objetoProducto.nombre;
      this.marca_producto = objetoProducto.marca;
      this.descripcion = objetoProducto.descripcion;
    } else {
      console.error(`No se encontro el objeto: ${objetoProducto}`);
    }
  }
}
