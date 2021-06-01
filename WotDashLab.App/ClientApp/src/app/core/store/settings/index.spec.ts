import { IApplicationSettingsState, ICoreState } from '../core.state';
import * as fromIndex from './index';

describe('App Settings state selectors', () => {
  const defaultSettings: IApplicationSettingsState = {
    redirects: {},
    apiTypes: {
      wot: {
        regions: ['Ru', 'Eu', 'Na', 'Asia'],
        name: 'World of Tanks',
      },
    },
    api: 'wot',
    applicationId: 'fake application id'
  };

  const initialState: ICoreState = {
    appSettings: defaultSettings,
    layout: {
      busy: false,
      applicationTitle: 'WoT Dashboards',
    },
  };

  it('should select application settings state', () => {
    expect(fromIndex.appSettingsSelector.projector(initialState)).toEqual(
      defaultSettings
    );
  });

  it('should select current api', () => {
    expect(fromIndex.currentApiSelector.projector(defaultSettings)).toEqual(
      defaultSettings.api
    );
  });

  it('should select current api descriptor', () => {
    expect(
      fromIndex.currentAppDescriptionSelector.projector(
        defaultSettings,
        defaultSettings.api
      )
    ).toEqual({
      api: defaultSettings.api,
      name: defaultSettings.apiTypes[defaultSettings.api].name,
      regions: defaultSettings.apiTypes[defaultSettings.api].regions,
    });
  });

  it('should select applicationId', () => {
    expect(fromIndex.applicationIdSelector.projector(defaultSettings)).toEqual(
      defaultSettings.applicationId
    );
  });
});
