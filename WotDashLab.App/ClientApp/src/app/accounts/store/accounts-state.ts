import { IAccountProfileState } from './profile/account-profile.state';
import { ActionReducerMap } from '@ngrx/store';
import { selectedAccountReducer } from './profile/account-profile.reducer';

export interface IAccountsState {
  selectedAccounts: ISelectedAccountsState;
}

export interface ISelectedAccountsState {
  count: number;
  activeAccountId?: number;
  profiles:  {[accountId: number]: IAccountProfileState };
}

export const reducers: ActionReducerMap<IAccountsState> = {
  selectedAccounts: selectedAccountReducer,
};
