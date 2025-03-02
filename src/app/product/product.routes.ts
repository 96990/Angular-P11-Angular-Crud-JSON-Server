import { importProvidersFrom } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { provideStore } from "@ngrx/store";
import { productReducer } from "./store/product.reducer";
import { provideEffects } from "@ngrx/effects";
import { ProductEffects } from "./store/product.effects";

export const productRoutes: Routes = [
    {   path: '', 
        providers: [
            provideStore({ products: productReducer }),
            provideEffects([ProductEffects])
        ], 
        loadComponent: () => import('./product.component').then(mod => mod.ProductComponent)
    },
    {path: 'lists', loadComponent: () => import('./product-list/product-list.component').then(mod => mod.ProductListComponent)},
    {path: 'details/:id', loadComponent: () => import('./product-details/product-details.component').then(mod => mod.ProductDetailsComponent)},
    {path: 'info', loadComponent: () => import('./product-info/product-info.component').then(mod => mod.ProductInfoComponent)},
    {path: 'create', loadComponent: () => import('./product-create/product-create.component').then(mod => mod.ProductCreateComponent)},
    {path: '**', loadComponent: () => import('./product-error/product-error.component').then(mod => mod.ProductErrorComponent)},
];

export const productProviders = [
    importProvidersFrom(RouterModule.forChild(productRoutes)),
]