import { createReducer, on } from '@ngrx/store';
import { Product } from '../product.model';
import * as ProductActions from './product.actions';

export interface ProductState {
  products: Product[];
}

export const initialState: ProductState = {
  products: [],
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProducts, (state, { products }) => ({ ...state, products})),
  on(ProductActions.addProduct, (state, { product }) => ({ ...state, products:[...state.products, product] })),
  on(ProductActions.updateProduct, (state, { product }) => ({ ...state, products: state.products.map((p) => (p.id == product.id? product : p)) })),
  on(ProductActions.deleteProduct, (state, { productId }) => ({ ...state, products: state.products.filter((p) => p.id!== productId) })),
);