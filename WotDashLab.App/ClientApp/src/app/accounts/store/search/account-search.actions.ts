import { createAction, props } from '@ngrx/store';
import { IWgnAccountSearchResult } from '../../account';

export const AccountSearchActionTypes = {
  SearchAccounts: '[Account Search] Search accounts by nickname(s)',
  AccountSearchSuccess: '[Account Search] Account Search success',
  AccountSearchFailure: '[Account Search] Account Search failed',
  SetSearchText: '[Account Search] Set search text',
  SetLoading: '[Account Search] Set loading',
  ClearSearch: '[Account Search] Clear Search',
};

export const createSearch = createAction(
  AccountSearchActionTypes.SearchAccounts,
  props<{ searchTerm: string }>(),
);

export const accountSearchSuccess = createAction(
  AccountSearchActionTypes.AccountSearchSuccess,
  props<{ data: IWgnAccountSearchResult[] }>(),
);

export const accountSearchFailure = createAction(
  AccountSearchActionTypes.AccountSearchFailure,
  props<{ error: string }>(),
);

export const setSearchText = createAction(
  AccountSearchActionTypes.SetSearchText,
  props<{ searchTerm: string }>(),
);

export const setLoading = createAction(
  AccountSearchActionTypes.SetLoading,
  props<{ isBusy: boolean }>(),
);

export const clearAccountSearch = createAction(
  AccountSearchActionTypes.ClearSearch,
);
