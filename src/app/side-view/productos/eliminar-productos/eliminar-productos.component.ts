import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-eliminar-productos',
  imports: [RouterModule],
  templateUrl: './eliminar-productos.component.html',
  styleUrl: './eliminar-productos.component.scss'
})
export class EliminarProductosComponent {
  eliminarImg = 'img/delete_model.svg';
}
