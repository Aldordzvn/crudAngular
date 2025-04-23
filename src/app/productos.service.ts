import { Injectable } from '@angular/core';
import { Producto } from './side-view/productos/producto.model';
import { Subject } from 'rxjs';
import { DatosService } from './datos.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  productos: {[llave:string]: Producto} = {};
  productosActualizados = new Subject<{[llave:string]: Producto}>();

  constructor(private datosService:DatosService) { }

  listarProductos(){
    return this.datosService.listarProductos();
  }

  guardarProducto(producto: Producto, llave: string | null = null){
    if(llave === null){
      this.datosService.agregarProducto(producto).subscribe(() =>{
        this.refrescarProductos();
      });
    }
  }

  private refrescarProductos(){
    this.listarProductos().subscribe((productos:{[llave:string]: Producto}) =>{
      this.setProductos(productos);
    })
  }

  setProductos(productos:{[llave:string]: Producto}){
    this.productos = productos;
    this.productosActualizados.next(this.productos);
  }

  getProductoByLlave(llave:string): Producto | undefined{
    return this.productos[llave];
  }

  eliminarProducto(llave:string){
    this.datosService.eliminarRegistro(llave, 'datos').subscribe(() =>{
      this.refrescarProductos();
    });
  }
}
