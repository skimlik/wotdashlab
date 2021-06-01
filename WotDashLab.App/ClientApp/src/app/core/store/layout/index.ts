import { createSelector } from '@ngrx/store';
import { coreFeatureSelector } from '../index';

export const layoutSelector = createSelector(
  coreFeatureSelector,
  (state) => state.layout
);

export const applicationIsBusySelector = createSelector(
  layoutSelector,
  (state) => state.busy
);

export const applicationTitleSelector = createSelector(
  layoutSelector,
  (state) => state.applicationTitle
);
