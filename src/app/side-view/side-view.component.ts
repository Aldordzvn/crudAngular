import { Component } from '@angular/core';
import { SkuComponent } from './sku/sku.component';
import { ProductosComponent } from './productos/productos.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-side-view',
  imports: [SkuComponent,ProductosComponent, RouterOutlet],
  templateUrl: './side-view.component.html',
  styleUrl: './side-view.component.scss'
})
export class SideViewComponent {
  iconImg = "img/add.svg";
}
