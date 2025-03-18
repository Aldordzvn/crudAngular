import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-eliminar',
  imports: [RouterModule],
  templateUrl: './eliminar.component.html',
  styleUrl: './eliminar.component.scss'
})
export class EliminarComponent {
  eliminarImg = 'img/delete_model.svg';

}
