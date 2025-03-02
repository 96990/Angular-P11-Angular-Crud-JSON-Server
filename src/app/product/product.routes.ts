import { importProvidersFrom } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { provideStore } from "@ngrx/store";
import { productReducer } from "./store/product.reducer";
import { provideEffects } from "@ngrx/effects";
import { ProductEffects } from "./store/product.effects";

export const productRoutes: Routes = [
    {path: '', loadComponent: () => import('./product.component').then(mod => mod.ProductComponent)},
    {path: 'lists', loadComponent: () => import('./product-list/product-list.component').then(mod => mod.ProductListComponent), outlet: 'products'},
    {path: 'details/:id', loadComponent: () => import('./product-details/product-details.component').then(mod => mod.ProductDetailsComponent), outlet: 'products'},
    {path: 'info', loadComponent: () => import('./product-info/product-info.component').then(mod => mod.ProductInfoComponent), outlet: 'products'},
    {path: 'create', loadComponent: () => import('./product-create/product-create.component').then(mod => mod.ProductCreateComponent), outlet: 'products'},
    {path: '**', loadComponent: () => import('./product-error/product-error.component').then(mod => mod.ProductErrorComponent), outlet: 'products'},
];

// export const productProviders = [
//     provideStore({ products: productReducer }),
//     provideEffects([ProductEffects])
// ];