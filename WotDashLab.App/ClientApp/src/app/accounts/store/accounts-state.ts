import { IAccountProfileState } from './profile/account-profile.state';
import { ActionReducerMap } from '@ngrx/store';
import { selectedAccountReducer } from './profile/account-profile.reducer';
import { IWgnAccountSearchResult } from '../account';
import { accountSearchReducer } from './search/account-search.reducer';
import { ITankInfoModel } from 'src/app/core-api/tanks/tank-info.model';

export interface IAccountsState {
  selectedAccounts: ISelectedAccountsState;
  accountSearch: IAccountSearchState;
}

export interface IFragInfo extends ITankInfoModel{
  count?: number;
}

export interface ISelectedAccountsState {
  count: number;
  activeAccountId?: number;
  profiles: {[accountId: number]: IAccountProfileState };
  frags: {[accountId: number]: IFragInfo[]};
  busy: boolean;
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
