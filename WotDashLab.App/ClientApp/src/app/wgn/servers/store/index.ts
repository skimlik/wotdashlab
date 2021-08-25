import { createSelector } from '@ngrx/store';
import { wgnFeatureSelector } from '../../store';

export const serverInfosSelector = createSelector(
  wgnFeatureSelector,
  (state) => state.servers,
);
