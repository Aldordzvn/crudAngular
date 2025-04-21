import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from './side-view/productos/producto.model';
import { HttpClient } from '@angular/common/http';
import { Sku } from './side-view/sku/sku.model';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  url = 'https://crud-angular-adca9-default-rtdb.firebaseio.com/';

  constructor(private httpClient: HttpClient) { }

  listarProductos(): Observable<{[llave:string]: Producto}>{
    const url_listar = `${this.url}datos.json`;
    return this.httpClient.get<{[llave:string]: Producto}>(url_listar);
  }

  agregarProducto(producto: Producto): Observable<any>{
    const url_agregar = `${this.url}datos.json`;
    return this.httpClient.post(url_agregar, producto);
  }

  eliminarRegistro(llave: string, coleccion: string): Observable<any>{
    const url_eliminar = `${this.url}${coleccion}/${llave}.json`;
    return this.httpClient.delete(url_eliminar);
  }

  listarSku(): Observable<{[llave:string]: Sku}>{
    const url_listar = `${this.url}skus.json`;
    return this.httpClient.get<{[llave:string]: Sku}>(url_listar);
  }

  agregarSku(registro: Sku): Observable<any>{
    const url_agregar = `${this.url}skus.json`;
    return this.httpClient.post(url_agregar, registro);
  }

  modificarSku(registro: Sku, llave: string): Observable<any>{
    const url_modificar = `${this.url}skus/${llave}.json`;
    console.log(`${url_modificar}`);
    return this.httpClient.put(url_modificar, registro);
  }

  
}
