import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { layoutReducer } from './layout/layout.reducers';
import { appSettingsReducer } from './settings/app-settings.reducer';
import { IWotAppDescription } from '../infrastructure/application-settings.';

export interface ICoreState {
  layout: ILayoutState;
  appSettings: IApplicationSettingsState;
}

export interface ILayoutState {
  busy: boolean;
  applicationTitle: string;
}

export interface IApplicationSettingsState {
  applicationId: string;
  api: string;
  apiTypes: { [key: string]: IWotAppDescription };
  redirects: { [region: string]: string };
}

export const coreReducers: ActionReducerMap<ICoreState> = {
  layout: layoutReducer,
  appSettings: appSettingsReducer,
};

export const metaReducers: MetaReducer<ICoreState>[] = [];
