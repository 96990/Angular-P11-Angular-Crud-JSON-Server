import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'login', loadComponent: () => import('./auth/login/login.component').then(mod => mod.LoginComponent)},
    {path: 'signup', loadComponent: () => import('./auth/signup/signup.component').then(mod => mod.SignupComponent)},
    {   path: 'products',
        loadChildren: () => import('./product/product.routes').then(mod => mod.productRoutes)
    }
];
