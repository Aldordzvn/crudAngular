import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sku',
  imports: [RouterModule],
  templateUrl: './sku.component.html',
  styleUrl: './sku.component.scss'
})
export class SkuComponent {
  iconImg = 'img/add.svg';

}
