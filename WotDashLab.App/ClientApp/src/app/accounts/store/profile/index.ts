import { createSelector } from '@ngrx/store';
import { accountFeatureSelector } from '../index';

export const selectedAccountsSelector = createSelector(
  accountFeatureSelector,
  (state) => state.selectedAccounts
);

export const selectedAccountsCountSelector = createSelector(
  selectedAccountsSelector,
  (state) => state.count
);

export const activeAccountIdSelector = createSelector(
  selectedAccountsSelector,
  (state) => state.activeAccountId
);

export const activeAccountProfileSelector = createSelector(
  selectedAccountsSelector,
  activeAccountIdSelector,
  (state, accountId) => state.profiles[accountId]
);
