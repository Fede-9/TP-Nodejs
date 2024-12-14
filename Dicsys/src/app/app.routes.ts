import { Routes } from '@angular/router';
import { HomeComponent } from './ui/pages/home/home.component';
import { ProductosComponent } from './ui/pages/productos/productos.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'productos',
        component: ProductosComponent
    },
];
