import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';

export const selectProductState = createFeatureSelector<ProductState>('product');

export const selectAllProducts = createSelector(selectProductState, state => state.products);

export const selectProductLoading = createSelector(selectProductState, state => state.loading);

export const selectProductError = createSelector(selectProductState, state => state.error);