import { createReducer, on } from '@ngrx/store';
import { IAccountSearchState } from '../accounts-state';
import * as fromActions from './account-search.actions';

const initialState: IAccountSearchState = {
  searchTerm: null,
  data: [],
  busy: false,
};

export const accountSearchReducer = createReducer(
  initialState,
  on(fromActions.accountSearchSuccess, (state, { data }) => ({
    ...state,
    data
  })),
  on(fromActions.setSearchText, (state, { searchTerm }) => ({
    ...state,
    searchTerm,
  })),
  on(fromActions.setLoading, (state, { isBusy }) => ({
    ...state,
    busy: isBusy,
  })),
);
