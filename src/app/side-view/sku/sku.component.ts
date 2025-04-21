import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Sku } from './sku.model';
import { SkuService } from '../../sku.service';
import { ProductosService } from '../../productos.service';
import { Producto } from '../productos/producto.model';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sku',
  imports: [RouterModule, FormsModule],
  templateUrl: './sku.component.html',
  styleUrl: './sku.component.scss'
})
export class SkuComponent {
  skusVista: {[llave:string]: Sku} = {};
  skusSubscription : Subscription | null = null;
  iconImg = 'img/add.svg';
  skuListado: Sku[] = [];
  productoListado: Producto[] = [];
  id!: number;

  constructor(private skuService:SkuService, private productoService:ProductosService){}

  
  ngOnInit(){ 
    this.cargarSkus();
    this.skusSubscription = this.skuService.skuActualizados.subscribe((skus) =>{
      this.skusVista = skus;
    });
  }

  cargarSkus(){
    this.skuService.listarRegistros().subscribe((skus: {[llave:string]: Sku})=>{
      this.skusVista = skus;
      this.skuService.setSkus(skus);
    });
  }

  obtenerLlaves(): string[]{
    if(this.skusVista){
      return Object.keys(this.skusVista);
    }
    return[];
  }

}
