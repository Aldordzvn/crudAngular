import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SkuService } from '../../../sku.service';

@Component({
  selector: 'app-eliminar',
  imports: [RouterModule],
  templateUrl: './eliminar.component.html',
  styleUrl: './eliminar.component.scss'
})
export class EliminarComponent {
  eliminarImg = 'img/delete_model.svg';
  llaveSku!: string;

  constructor(private route:ActivatedRoute, private skuService:SkuService, private router:Router){}

  ngOnInit(){
    this.llaveSku = this.route.snapshot.queryParams['llave'];  
    console.log(this.llaveSku);
  }

  eliminarRegistro(){
    this.skuService.eliminarSkus(this.llaveSku);
    this.router.navigate(['administracion']);
  }

}
