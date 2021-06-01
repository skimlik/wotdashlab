import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ICoreState } from '../../core/store/core.state';
import { appSettingsSelector } from '../../core/store/settings';
import { IWotAppDescription } from '../../core/infrastructure/application-settings.';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-servers',
  templateUrl: 'servers.component.html'
})

export class ServersComponent implements OnInit {
  appSettings$ = this.store.pipe(select(appSettingsSelector));
  apiTypes$: Observable<IWotAppDescription[]>;

  constructor(private store: Store<ICoreState>) {
    this.apiTypes$ = this.appSettings$.pipe(
      map(data => Object.keys(data.apiTypes).map(key => data.apiTypes[key]))
    );
  }

  ngOnInit() {
  }
}
