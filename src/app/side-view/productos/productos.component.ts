import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductosService } from '../../productos.service';
import { Producto } from './producto.model';

@Component({
  selector: 'app-productos',
  imports: [RouterModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent {
  productoVista: Producto[] = [];
  itemImg = 'img/item.svg';
  deleteImg = 'img/delete.svg';
  iconImg = 'img/add.svg';

  constructor(private productoService:ProductosService, private route: ActivatedRoute){}

  ngOnInit(){
    this.productoVista = this.productoService.productosLista;
  }

  
}
