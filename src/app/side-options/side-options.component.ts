import { Component } from '@angular/core';
import { RouterModule} from '@angular/router';

@Component({
  selector: 'app-side-options',
  imports: [RouterModule],
  templateUrl: './side-options.component.html',
  styleUrl: './side-options.component.scss'
})
export class SideOptionsComponent {
  inventoryImg = 'img/inventory.svg';
  productImg = 'img/product.svg';
  gitHubImg = 'img/github.svg';
  linkedinImg = 'img/linkedin.svg';
  gitLink = 'https://github.com/Aldordzvn/crudAngular';
  linkedinLink = 'https://www.linkedin.com/in/aldordzvn/';

  
}
