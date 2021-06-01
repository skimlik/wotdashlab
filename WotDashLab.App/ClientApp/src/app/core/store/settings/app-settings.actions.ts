import { createAction, props } from '@ngrx/store';
import { IWotAppDescription } from '../../infrastructure/application-settings.';

export const ApplicationSettingsActionTypes = {
  setApplicationId: '[AppSettings] Set application id',
  setDefaultApi: '[AppSettings] Set selected WG Api',
  setApiTypes: '[AppSettings] Set available Api Types',
  setupRedirects: '[AppSettings] Setup redirects',
};

export const setApplicationId = createAction(
  ApplicationSettingsActionTypes.setApplicationId,
  props<{ applicationId: string }>()
);

export const setDefaultApi = createAction(
  ApplicationSettingsActionTypes.setDefaultApi,
  props<{ api: string; region: string }>()
);

export const setApiTypes = createAction(
  ApplicationSettingsActionTypes.setApiTypes,
  props<{ apiTypes: { [key: string]: IWotAppDescription } }>()
);

export const setupRedirects = createAction(
  ApplicationSettingsActionTypes.setupRedirects,
  props<{ redirects: { [key: string]: string } }>()
);
