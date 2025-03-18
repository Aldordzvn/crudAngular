import { Routes } from '@angular/router';
import { SkuComponent } from './side-view/sku/sku.component';
import { ProductosComponent } from './side-view/productos/productos.component';
import { DetallesComponent } from './side-view/sku/detalles/detalles.component';
import { EditarComponent } from './side-view/sku/editar/editar.component';
import { EliminarComponent } from './side-view/sku/eliminar/eliminar.component';
import { EliminarProductosComponent } from './side-view/productos/eliminar-productos/eliminar-productos.component';
import { AddProductoComponent } from './side-view/productos/add-producto/add-producto.component';

export const routes: Routes = [
    {path: '', component: SkuComponent},
    {path: 'administracion', component: SkuComponent, children:[
        {path:'detalles', component:DetallesComponent},
        {path:'guardar', component:EditarComponent},
        {path:'eliminar', component:EliminarComponent}

    ]},
    {path: 'productos', component: ProductosComponent, children:[
        {path:'eliminar', component: EliminarProductosComponent },
        {path:'guardar', component: AddProductoComponent }
    ]}
];
