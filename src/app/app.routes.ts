import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'login', loadComponent: () => import('./login/login.component').then(mod => mod.LoginComponent)},
    {path: 'products', loadChildren: () => import('./product/product.routes').then(mod => mod.productRoutes)}
];
