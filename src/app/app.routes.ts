import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', loadComponent: () => import('./product/product.component').then(mod => mod.ProductComponent)},
    {path: 'lists', loadComponent: () => import('./product/product-list/product-list.component').then(mod => mod.ProductListComponent)},
    {path: 'details/:id', loadComponent: () => import('./product/product-details/product-details.component').then(mod => mod.ProductDetailsComponent)},
    {path: 'create', loadComponent: () => import('./product/product-create/product-create.component').then(mod => mod.ProductCreateComponent)},
    {path: '**', loadComponent: () => import('./product/product-error/product-error.component').then(mod => mod.ProductErrorComponent)},
];
