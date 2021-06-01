import { createAction, props } from '@ngrx/store';
import { ProfileExtras } from './account-profile.service';
import { IAccountProfileState } from './account-profile.state';

export const AccountProfileActionTypes = {
  SelectAccountById: '[Account Profile] Select account by Id',
  SetAccountProperties: '[Account Profile] Set account properties',
};

export const selectAccountById = createAction(
  AccountProfileActionTypes.SelectAccountById,
  props<{
    accountId: number,
    extend?: ProfileExtras[],
    fields?: string[],
    language: string,
    region: string,
  }>(),
);

export const setAccountProperties = createAction(
  AccountProfileActionTypes.SetAccountProperties,
  props<{ account: IAccountProfileState }>(),
);
