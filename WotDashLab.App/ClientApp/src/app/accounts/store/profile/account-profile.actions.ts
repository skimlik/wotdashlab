import { createAction, props } from '@ngrx/store';
import { SupportedLanguages, SupportedRegions } from 'src/app/common/constants/string-constraints';
import { ITankInfoModel } from 'src/app/core-api/tanks/tank-info.model';
import { ProfileExtras } from './account-profile.service';
import { IAccountProfileState } from './account-profile.state';

export const AccountProfileActionTypes = {
  SelectAccountById: '[Account Profile] Select account by Id',
  SetAccountProperties: '[Account Profile] Set account properties',
  LoadFragsPage: '[Account Profile] Load frags page',
  FragsPageLoaded: '[Account Profile] Frags page loaded',
  FragsPageLoadError: '[Account Profile] Frags page load error',
  SetBusy: '[Account Profile] Set Loading',
};

export const selectAccountById = createAction(
  AccountProfileActionTypes.SelectAccountById,
  props<{
    accountId: number,
    extend?: ProfileExtras[],
    fields?: string[],
    language: SupportedLanguages,
    region: SupportedRegions,
  }>(),
);

export const loadFragsPage = createAction(
  AccountProfileActionTypes.LoadFragsPage,
  props<{ accountId: number, tankIds: number[], region: SupportedRegions, language: SupportedLanguages }>()
);

export const fragsPageLoaded = createAction(
  AccountProfileActionTypes.FragsPageLoaded,
  props<{ accountId: number, frags: ITankInfoModel[] }>(),
);

export const fragsPageLoadError = createAction(
  AccountProfileActionTypes.FragsPageLoadError,
  props<{ error: string }>()
);

export const setAccountProperties = createAction(
  AccountProfileActionTypes.SetAccountProperties,
  props<{ account: IAccountProfileState }>(),
);

export const setProfileLoading = createAction(
  AccountProfileActionTypes.SetBusy,
  props<{ busy: boolean }>(),
);
