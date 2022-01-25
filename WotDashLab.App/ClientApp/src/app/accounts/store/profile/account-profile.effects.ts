import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AccountProfileService} from './account-profile.service';
import * as fromActions from './account-profile.actions';
import {catchError, filter, map, mergeMap} from 'rxjs/operators';
import {TanksService} from 'src/app/core-api/tanks/tanks.service';
import { of } from 'rxjs';

@Injectable()
export class AccountProfileEffects {
  setLoading$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.selectAccountById),
        map(() => fromActions.setProfileLoading({busy: true}))
      ),
    {dispatch: true}
  );

  setLoaded$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.setAccountProperties),
        map(() => fromActions.setProfileLoading({busy: false}))
      ),
    {dispatch: true}
  );

  fetchAccountById$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.selectAccountById),
        mergeMap((action) =>
          this.accountProfileService.fetch(
            action.accountId,
            action.region,
            action.extend,
            action.fields,
            action.language
          )
        ),
        filter((result) => !!result),
        map((profile) => fromActions.setAccountProperties({account: profile}))
      ),
    {dispatch: true}
  );

  fetchFragsPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadFragsPage),
      mergeMap((action) => {
        const response$ = this.tanksService.search(action.tankIds, action.region, action.language);
        return response$.pipe(
          map((frags) => {
            return {
              accountId: action.accountId,
              frags,
            };
          })
        );
      }),
      map((data) => fromActions.fragsPageLoaded(data)),
      catchError((error) => of(fromActions.fragsPageLoadError({ error }))),
    )
  );

  constructor(
    private actions$: Actions,
    private accountProfileService: AccountProfileService,
    private tanksService: TanksService
  ) {}
}
