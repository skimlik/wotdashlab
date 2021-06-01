import { Injectable } from '@angular/core';
import { ApplicationSettingsService } from './application-settings.service';
import { IApplicationSettings } from './application-settings.';
import { ICoreState } from '../store/core.state';
import { Store } from '@ngrx/store';
import * as fromActions from '../store/settings/app-settings.actions';
import * as fromLayoutActions from '../store/layout/layout.actions';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class ApplicationSettingsLoaderService {
  constructor(
    private appSettingsService: ApplicationSettingsService,
    private localStorageService: LocalStorageService,
    private store: Store<ICoreState>
  ) { }

  load(): Promise<IApplicationSettings | void> {
    this.store.dispatch(fromLayoutActions.setApplicationBusy({ busy: true }));

    const data = this.appSettingsService
      .get()
      .toPromise()
      .then((d) => {
        this.store.dispatch(fromActions.setApplicationId(d));
        this.store.dispatch(fromActions.setDefaultApi({
          api: d.defaultApi.api,
          region: d.defaultApi.region,
        }));
        this.store.dispatch(fromActions.setupRedirects({ redirects: d.redirects }));
        this.store.dispatch(fromActions.setApiTypes({ apiTypes: d.apiTypes }));
        this.store.dispatch(fromLayoutActions.setApplicationBusy({ busy: false }));
      }).catch(() => {
        this.store.dispatch(fromLayoutActions.setApplicationBusy({ busy: false }));
      });

    return data;
  }
}
