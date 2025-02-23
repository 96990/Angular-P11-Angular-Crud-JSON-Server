import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', loadComponent: () => import('./product/product.component').then(mod => mod.ProductComponent)},
    {path: 'login', loadComponent: () => import('./login/login.component').then(mod => mod.LoginComponent)},
    {path: 'lists', loadComponent: () => import('./product/product-list/product-list.component').then(mod => mod.ProductListComponent)},
    {path: 'details/:id', loadComponent: () => import('./product/product-details/product-details.component').then(mod => mod.ProductDetailsComponent)},
    {path: 'info', loadComponent: () => import('./product/product-info/product-info.component').then(mod => mod.ProductInfoComponent)},
    {path: 'create', loadComponent: () => import('./product/product-create/product-create.component').then(mod => mod.ProductCreateComponent)},
    {path: '**', loadComponent: () => import('./product/product-error/product-error.component').then(mod => mod.ProductErrorComponent)},
];
