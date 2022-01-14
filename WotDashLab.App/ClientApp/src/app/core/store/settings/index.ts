import { createSelector } from '@ngrx/store';
import { SupportedLanguages } from 'src/app/common/constants/string-constraints';
import { coreFeatureSelector } from '../index';

export const appSettingsSelector = createSelector(
  coreFeatureSelector,
  (state) => state.appSettings
);

export const applicationIdSelector = createSelector(
  appSettingsSelector,
  (state) => state.applicationId
);

export const currentApiSelector = createSelector(
  appSettingsSelector,
  (state) => state.api
);

export const currentLanguageSelector = createSelector(
  appSettingsSelector,
  () => 'ru' as SupportedLanguages,
);

export const redirectsSelector = createSelector(
  appSettingsSelector,
  (state) => state.redirects
);

export const currentAppDescriptionSelector = createSelector(
  appSettingsSelector,
  currentApiSelector,
  (state, api) => {
    const app = state.apiTypes[api];
    return app
      ? {
        api,
        name: app.name,
        regions: app.regions,
      }
      : null;
  }
);
