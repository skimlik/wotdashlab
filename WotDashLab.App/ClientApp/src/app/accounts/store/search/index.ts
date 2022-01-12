import { createSelector } from '@ngrx/store';
import { accountFeatureSelector } from '..';

export const accountSearchFeatureSelector = createSelector(
  accountFeatureSelector,
  (state) => state.accountSearch,
);

export const accountSearchExpressionSelector = createSelector(
  accountSearchFeatureSelector,
  (state) => state.searchTerm,
);

export const accountSearchResultSelector = createSelector(
  accountSearchFeatureSelector,
  (state) => state.data,
);
