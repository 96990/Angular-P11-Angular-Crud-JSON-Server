import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';

export const selectProductState = createFeatureSelector<ProductState>('products');
export const selectAllProducts = createSelector(selectProductState, (state) => state.products);
export const selectProductLoading = createSelector(selectProductState, (state) => state.loading);
export const selectProductError = createSelector(selectProductState, (state) => state.error);
export const selectSelectedProduct = createSelector(selectProductState, (state) => state.selectedProduct);

export const selectedProductById = (productId: number) => 
    createSelector(selectProductState, (state) => 
        state.products.find(product => product.id === productId) || null
    );