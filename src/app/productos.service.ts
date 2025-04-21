import { Injectable } from '@angular/core';
import { Producto } from './side-view/productos/producto.model';
import { Subject } from 'rxjs';
import { DatosService } from './datos.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  // productosContainer: Producto[] = [
  //   {
  //     id: 1,
  //     nombre: "Pantalones",
  //     marca: "American Eagle",
  //     descripcion: "Pantalones Skinny modelo 12321312"
  //   },
  //   {
  //     id: 2,
  //     nombre: "Cachuchas",
  //     marca: "First Line",
  //     descripcion: "Cachucas corte quien sabe que pa no le sé"
  //   },
  //   {
  //     id: 3,
  //     nombre: "Tenis AF1",
  //     marca: "Adidas",
  //     descripcion: "Tenis Air Force 1 color verde cobn blanco edicion especial"
  //   }
  // ];

  productos: {[llave:string]: Producto} = {};
  productosActualizados = new Subject<{[llave:string]: Producto}>();

  nombre: string = '';
  marca: string = '';
  descripcion: string = '';


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
    // else{
    //   this.datosService.modificarSku(producto, llave).subscribe(()=>{
    //     this.refrescarProductos();
    //   });
    // }
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



  ///////////////////////////////////////////////////////////////////// LOCAL ////////////////////////////////////////////////////////////////////////
  // get productosLista() {
  //   return this.productosContainer;
  // }

  // obtenerId(): number {
  //   if(this.productosContainer.length === 0){
  //     let index: number = 0;
  //     console.log("Entro al undefined");
  //     return index;
  //   }else{
  //     let ultimo: Producto = this.productosContainer.slice(-1)[0];
  //     let index: number = ultimo.id;
  //     return index;
  //   }
  // }

  // addProducto(producto: Producto) {
  //   let lastIndex: number = this.obtenerId();
  //   let objeto: Producto = producto;
  //   objeto.id = ++lastIndex;
  //   console.log(objeto.id);
  //   this.productosContainer.push(objeto);
  // }

  // deleteProducto(index: number) {
  //   for (let item of this.productosContainer) {
  //     if (item.id == index) {
  //       let indexProducto: number = this.productosContainer.indexOf(item);
  //       // console.log(index);
  //       this.productosContainer.splice(indexProducto, 1);
  //     }
  //   }
  // }
}
