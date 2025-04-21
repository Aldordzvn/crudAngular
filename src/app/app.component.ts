import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideOptionsComponent } from './side-options/side-options.component';
import { SideViewComponent } from './side-view/side-view.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [SideOptionsComponent,SideViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'crud_angular';
}
