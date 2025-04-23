import { Injectable } from '@angular/core';
import { Sku } from './side-view/sku/sku.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { DatosService } from './datos.service';

@Injectable({
  providedIn: 'root'
})
export class SkuService {

  skus : {[llave:string]: Sku} = {};
  skuActualizados = new Subject<{[llave:string]: Sku}>();

  constructor(private datosService:DatosService){}

  listarRegistros(){
    return this.datosService.listarSku();
  }

  guardarSku(registro: Sku, llave: string | null = null){
    if(!llave){
      this.datosService.agregarSku(registro).subscribe(() =>{
        this.refrescarRegistros();
      });
    }else{
      this.datosService.modificarSku(registro, llave).subscribe(()=>{
        this.refrescarRegistros();
        console.log("entre a modificar desde el service: ", this.skus);
      });
    }
  }

  private refrescarRegistros(){
    this.listarRegistros().subscribe((skus:{[llave:string]: Sku}) =>{
      this.setSkus(skus);
    })
  }

  setSkus(skus: {[llave:string]: Sku}){
    this.skus = skus;
    this.skuActualizados.next(this.skus);
  }

  getSkuByLlave(llave:string): Sku | undefined{
    return this.skus[llave];
  }

  eliminarSkus(llave:string){
    this.datosService.eliminarRegistro(llave, 'skus').subscribe(() =>{
      this.refrescarRegistros();
    })
  }
}
