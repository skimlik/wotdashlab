import { ISelectedAccountsState } from '../accounts-state';
import { createReducer, on } from '@ngrx/store';
import * as fromActions from './account-profile.actions';

const defaultState: ISelectedAccountsState = {
  profiles: {},
  frags: {},
  activeAccountId: null,
  count: 0,
  busy: false,
};

export const selectedAccountReducer = createReducer(
  defaultState,
  on(fromActions.selectAccountById, (state, { accountId }) => ({
    ...state,
    activeAccountId: accountId,
  })),
  on(fromActions.setAccountProperties, (state, { account }) => {
    const profilesCollection = {
      ...state.profiles,
      [account.accountId]: { ...account },
    };

    return {
      ...state,
      profiles: profilesCollection,
      count: Object.keys(profilesCollection).length,
    };
  }),
  on(fromActions.setProfileLoading, (state, { busy }) => ({
    ...state,
    busy,
  })),
);
