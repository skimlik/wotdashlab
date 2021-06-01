import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAccountsState } from './accounts-state';

export const featureName = 'Accounts';

export const accountFeatureSelector = createFeatureSelector<IAccountsState>(featureName);
