import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Producto } from '../producto.model';
import { ProductosService } from '../../../productos.service';
import { Sku } from '../../sku/sku.model';
import { SkuService } from '../../../sku.service';

@Component({
  selector: 'app-eliminar-productos',
  imports: [RouterModule],
  templateUrl: './eliminar-productos.component.html',
  styleUrl: './eliminar-productos.component.scss'
})
export class EliminarProductosComponent {
  productos: { [llave: string]: Producto } = {};
  skus: { [llave: string]: Sku } = {};
  llaves: string[] = [];
  eliminarImg = 'img/delete_model.svg';
  warningImg = 'img/warning.svg';
  llave!: string;
  alerta: boolean = false;

  constructor(private route: ActivatedRoute, private skuService: SkuService, private router: Router, private productoService: ProductosService) { }

  ngOnInit(): void {
    this.llave = this.route.snapshot.queryParams['llave'];
    this.cargarSkus();
  }

  cargarSkus() {
    this.skuService.listarRegistros().subscribe((skus: { [llave: string]: Sku }) => {
      this.skus = skus;
      this.skuService.setSkus(skus);
      this.productosEnSkus();

    });
  }

  obtenerLlaves(): string[] {
    if (this.skus) {
      return Object.keys(this.skus);
    }
    return [];
  }

  productosEnSkus() {
    for (let llave of this.obtenerLlaves()) {
      const llaveEncontrada = this.skus[llave].llaveProducto;
      if (llaveEncontrada == this.llave) {
        console.log(llaveEncontrada);
        this.llaves.push(llave);
      }
    }
    if (this.llaves.length >= 1) {
      this.alerta = true;
    }
  }

  eliminarProducto() {
    this.productoService.eliminarProducto(this.llave);
    this.router.navigate(['productos']);
  }

}
