import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';
import { Product } from '../product.model';

export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  error: string | null;
  loading: boolean;
  productLength: number
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  error: null,
  loading: false,
  productLength: 30
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProducts, (state) => ({ ...state, loading: true })),
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({ ...state, products, loading: false })),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(ProductActions.addProductSuccess, (state, { product }) => {
    console.log("addproductreducer",)
    return { ...state, products: [...state.products, product] }
  }),
  on(ProductActions.deleteProductSuccess, (state, { productId }) => ({ ...state, products: state.products.filter(p => p.id !== productId) })),
  on(ProductActions.updateProductSuccess, (state, { product }) => ({
    ...state,
    products: state.products.map(p => (p.id === product.id ? product : p))
  })),
  on(ProductActions.loadProductDetails,(state, { productId }) => ({ ...state, loading: true })),
  on(ProductActions.loadProductDetailsSuccess,(state, { product }) => ({ ...state, selectedProduct: product, loading: true })),
  on(ProductActions.LoadProductDetailsFailure,(state, { error }) => ({ ...state, error, loading: false })),

);
