import { IAccountProfileState } from './profile/account-profile.state';
import { ActionReducerMap } from '@ngrx/store';
import { selectedAccountReducer } from './profile/account-profile.reducer';
import { IWgnAccountSearchResult } from '../account';
import { accountSearchReducer } from './search/account-search.reducer';

export interface IAccountsState {
  selectedAccounts: ISelectedAccountsState;
  accountSearch: IAccountSearchState;
}

export interface ISelectedAccountsState {
  count: number;
  activeAccountId?: number;
  profiles: {[accountId: number]: IAccountProfileState };
}

export interface IAccountSearchState {
  searchTerm?: string;
  data: IWgnAccountSearchResult[];
  busy: boolean;
}

export const reducers: ActionReducerMap<IAccountsState> = {
  selectedAccounts: selectedAccountReducer,
  accountSearch: accountSearchReducer,
};
