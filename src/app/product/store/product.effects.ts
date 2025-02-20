import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import * as ProductActions from './product.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private productService: ProductService) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.productService.getProductsList().pipe(
          map(products => ProductActions.loadProductsSuccess({ products })),
          catchError(error => of(ProductActions.loadProductsFailure({ error: error.message })))
        )
      )
    )
  );

//   addProduct$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(ProductActions.addProduct),
//       mergeMap(action =>
//         this.productService.createProduct(action.product).pipe(
//           map(product => ProductActions.addProductSuccess({ product })),
//           catchError(error => of(ProductActions.addProductFailure({ error: error.message })))
//         )
//       )
//     )
//   );

//   updateProduct$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(ProductActions.updateProduct),
//       mergeMap(action =>
//         this.productService.updateProduct(action.product, action.product.id).pipe(
//           map(product => ProductActions.updateProductSuccess({ product })),
//           catchError(error => of(ProductActions.updateProductFailure({ error: error.message })))
//         )
//       )
//     )
//   );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      mergeMap(action =>
        this.productService.deleteProduct(action.productId).pipe(
          map(() => ProductActions.deleteProductSuccess({ productId: action.productId })),
          catchError(error => of(ProductActions.deleteProductFailure({ error: error.message })))
        )
      )
    )
  );
}