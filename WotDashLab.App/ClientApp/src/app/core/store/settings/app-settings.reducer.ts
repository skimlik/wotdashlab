import { IApplicationSettingsState } from '../core.state';
import { createReducer, on } from '@ngrx/store';
import * as fromActions from './app-settings.actions';

const defaultState: IApplicationSettingsState = {
  applicationId: null,
  api: 'Wot',
  apiTypes: {},
  redirects: {},
};

export const appSettingsReducer = createReducer(
  defaultState,
  on(fromActions.setApplicationId, (state, { applicationId }) => ({
    ...state,
    applicationId,
  })),
  on(fromActions.setDefaultApi, (state, { api, region }) => ({
    ...state,
    api,
    region,
  })),
  on(fromActions.setApiTypes, (state, { apiTypes }) => ({
    ...state,
    apiTypes: { ...apiTypes }
  })),
  on(fromActions.setupRedirects, (state, { redirects }) => ({
    ...state,
    redirects: Object.keys(redirects).reduce((pv, cv) => {
      if (pv[cv]) {
        return pv;
      }
      pv[cv] = redirects[cv];
      return pv;
    }, {})
  })),
);
