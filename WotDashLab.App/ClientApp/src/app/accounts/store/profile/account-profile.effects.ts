import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AccountProfileService} from './account-profile.service';
import * as fromActions from './account-profile.actions';
import {filter, map, mergeMap} from 'rxjs/operators';

@Injectable()
export class AccountProfileEffects {
  setLoading$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromActions.selectAccountById),
      map(() => fromActions.setProfileLoading({ busy: true }))
    ),
    { dispatch: true }
  );

  setLoaded$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromActions.setAccountProperties),
      map(() => fromActions.setProfileLoading({ busy: false }))
    ),
    { dispatch: true }
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

  constructor(
    private actions$: Actions,
    private accountProfileService: AccountProfileService,
  ) {}
}
