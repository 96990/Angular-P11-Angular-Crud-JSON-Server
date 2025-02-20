import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, mergeMap, of, tap, withLatestFrom } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';

import { Product } from '../product.model';
import { selectAllProducts } from './product.selectors'
import { ProductService } from '../product.service';
import * as ProductActions from './product.actions';
@Injectable()
export class ProductEffects {
    private actions$ = inject(Actions);
    private store = inject(Store);
    private router = inject(Router);
    private productService = inject(ProductService);
    private messageService = inject(MessageService);

    loadProducts$ = createEffect(() => this.actions$.pipe(
        ofType(ProductActions.loadProducts),
        mergeMap(() => this.productService.getProductsList().pipe(
            map((products: Product[]) => ProductActions.loadProductsSuccess({ products })),
            catchError(error => of(ProductActions.loadProductsFailure({ error: error.message })))
        ))
    ));

    addProduct$ = createEffect(() => this.actions$.pipe(
        ofType(ProductActions.addProduct),
        mergeMap(action => this.productService.createProduct(action.product).pipe(
            tap((res) => console.log("add", res)),
            map((product: Product) => {
                return ProductActions.addProductSuccess({ product });
            }),
            catchError(error => of(ProductActions.addProductFailure({ error: error.message })))
        ))
    ));

    addProductSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(ProductActions.addProductSuccess),
        tap((product) => {
            console.log("product success", product);
            // withLatestFrom(this.store.select(selectAllProducts)),
            // tap(([actions,products]) => console.log("productsadd",products)),
            // this.productService.getProductsList().pipe(
            //     map(data => {
            //         this.productService.productsCount = data[data.length-1].id
            //         console.log("productscount",this.productService.productsCount);
            //     })
            // )
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added successfully' });
            this.router.navigate(['/lists']);
        })
    ),
        { dispatch: false }
    );


    updateProduct$ = createEffect(() => this.actions$.pipe(
        ofType(ProductActions.updateProduct),
        mergeMap(action => this.productService.updateProduct(action.product, action.product.id).pipe(
            tap((res) => console.log("update", res)),
            map((product: Product) => {
                return ProductActions.updateProductSuccess({ product })
            }),
            catchError(error => of(ProductActions.updateProductFailure({ error: error.message })))
        ))
    ));

    updateProductSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(ProductActions.updateProductSuccess),
        tap(() => {
            // this.productService.getProductsList().pipe(
            //     map(data => {
            //         this.productService.productsCount = data[data.length-1].id
            //     })
            // )
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product updated successfully' });
            this.router.navigate(['/lists']);
        }),
    ),
        { dispatch: false }
    );

    deleteProduct$ = createEffect(() => this.actions$.pipe(
        ofType(ProductActions.deleteProduct),
        mergeMap(action => this.productService.deleteProduct(action.productId).pipe(
            tap((res) => console.log("res", res)),
            map(() => {
                this.messageService.add({ severity: 'error', summary: 'Deleted', detail: 'Product deleted successfully' });
                return ProductActions.deleteProductSuccess({ productId: action.productId });
            }),
            catchError(error => of(ProductActions.deleteProductFailure({ error: error.message })))
        ))
    ));

    loadProduct$ = createEffect(() => this.actions$.pipe(
        ofType(ProductActions.loadProductDetails),
        withLatestFrom(this.store.select(selectAllProducts)),
        tap(([actions, products]) => console.log("before", products)),
        mergeMap(([action, products]) => {
            const product = products.find(p => p.id === action.productId);
            if (product) {
                return of(ProductActions.loadProductDetailsSuccess({ product }))
            } else {
                return this.productService.getProductDetails(action.productId).pipe(
                    map((product: Product) => ProductActions.loadProductDetailsSuccess({ product })),
                    tap(product => console.log("tapmapptoduct", product)),
                    catchError(error => of(ProductActions.LoadProductDetailsFailure({ error: error.message })))
                )
            }

        })
    )
    )
}