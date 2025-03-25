import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Producto } from '../producto.model';
import { ProductosService } from '../../../productos.service';

@Component({
  selector: 'app-eliminar-productos',
  imports: [RouterModule],
  templateUrl: './eliminar-productos.component.html',
  styleUrl: './eliminar-productos.component.scss'
})
export class EliminarProductosComponent {
  eliminarImg = 'img/delete_model.svg';
  id!:number;
  
  constructor(private route:ActivatedRoute, private productoService: ProductosService, private router: Router){}

  ngOnInit(): void{
    this.id= this.route.snapshot.queryParams['id'];
    // console.log(this.id);
  }

  eliminarProducto(){
    this.productoService.deleteProducto(this.id);
    this.router.navigate(['productos']);
  }

}
