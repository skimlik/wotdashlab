import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ICoreState } from '../../core/store/core.state';
import { appSettingsSelector } from '../../core/store/settings';
import { IWotAppDescription } from '../../core/infrastructure/application-settings.';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IServerInfo, IWgnState } from "../store/wgn.state";
import { loadServers } from "./store/servers.actions";
import { LocalStorageService } from "../../core/infrastructure/local-storage.service";
import { serverInfosSelector } from "./index";

@Component({
  selector: 'app-servers',
  templateUrl: 'servers.component.html',
  styleUrls: ['servers.component.scss']
})

export class ServersComponent implements OnInit {
  appSettings$ = this.store.pipe(select(appSettingsSelector));
  apiTypes$: Observable<IWotAppDescription[]>;
  serverInfos$ = this.wgnStore.pipe(select(serverInfosSelector))

  constructor(
    private store: Store<ICoreState>,
    private wgnStore: Store<IWgnState>,
    private localStorage: LocalStorageService) {
    this.apiTypes$ = this.appSettings$.pipe(
      map(data => Object.keys(data.apiTypes).map(key => data.apiTypes[key]))
    );
  }

  ngOnInit() {
    const region = this.localStorage.getRegion()
    this.wgnStore.dispatch(loadServers({ region }));
  }

  servers$(apiType: string): Observable<IServerInfo[]> {
    return this.serverInfos$.pipe(
      map(data => data[apiType])
    );
  }
}
