import { createSelector } from '@ngrx/store';
import { accountFeatureSelector } from '../index';

export const selectedAccountsFeatureSelector = createSelector(
  accountFeatureSelector,
  (state) => state.selectedAccounts
);

export const selectedAccountsCountSelector = createSelector(
  selectedAccountsFeatureSelector,
  (state) => state.count
);

export const activeAccountIdSelector = createSelector(
  selectedAccountsFeatureSelector,
  (state) => state.activeAccountId
);

export const activeAccountProfileSelector = createSelector(
  selectedAccountsFeatureSelector,
  activeAccountIdSelector,
  (state, accountId) => state.profiles[accountId]
);

export const accountProfileLoadingSelector = createSelector(
  selectedAccountsFeatureSelector,
  (state) => state.busy,
);
