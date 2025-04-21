import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductosService } from '../../productos.service';
import { Producto } from './producto.model';
import { Subscription } from 'rxjs';
import { HttpClient, provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-productos',
  imports: [RouterModule],
  providers: [],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent {
  productosVista: {[llave:string]: Producto} = {};
  productosSubscription: Subscription | null = null;
  productosArray! : Producto;
  // objectKeys = Object.keys;
  itemImg = 'img/item.svg';
  deleteImg = 'img/delete.svg';
  iconImg = 'img/add.svg';

  constructor(private productoService:ProductosService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(){
    this.cargarProductos();
    this.productosSubscription = this.productoService.productosActualizados.subscribe((productos) => {
      this.productosVista = productos;
    });
  }

  cargarProductos(){
    this.productoService.listarProductos().subscribe((productos: {[llave:string]: Producto}) => {
      this.productosVista = productos;
      this.productoService.setProductos(productos);
      // console.log(this.productosVista);
    });
  }

  obtenerLlaves(): string[]{
    if(this.productosVista){
      return Object.keys(this.productosVista);
    }
    return[];
  }



  
}
