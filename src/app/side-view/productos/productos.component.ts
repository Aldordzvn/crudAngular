import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-productos',
  imports: [RouterModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent {
  itemImg = 'img/item.svg';
  deleteImg = 'img/delete.svg';
  iconImg = 'img/add.svg';
}
