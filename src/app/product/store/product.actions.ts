import { createAction, props } from '@ngrx/store';
import { Product } from '../product.model';

export const loadProducts = createAction('[Product] Load Products', props<{products: Product[]}>);

export const addProduct = createAction('[Product] Add Product', props<{ product: Product }>());

export const updateProduct = createAction('[Product] Update Product', props<{ product: Product }>());

export const deleteProduct = createAction('[Product] Delete Product', props<{ productId: number }>());
