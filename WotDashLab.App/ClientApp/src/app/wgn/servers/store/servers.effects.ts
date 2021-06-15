import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadServers, serversLoadComplete, serversLoadFailed } from './servers.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ServersInfoService } from '../servers-info.service';
import { of } from "rxjs";

@Injectable()
export class ServersInfoEffects {
  load$ = createEffect(() => this.actions$.pipe(
    ofType(loadServers),
    mergeMap((action) => (this.serversService.get(action.region))),
    map(payload => serversLoadComplete({ payload })),
    catchError(() => of(serversLoadFailed())),
  ));

  constructor(private actions$: Actions, private serversService: ServersInfoService) {
  }
}
