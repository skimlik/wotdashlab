import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, take} from 'rxjs/operators';
import {IWgnAccountSearchResult} from '../../account';
import {WgnAccountSearchService} from '../../search/wgn-account-search.service';
import * as fromActions from './account-search.actions';

@Injectable()
export class AccountSearchEffects {
  createSearch$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.createSearch),
        mergeMap(({searchTerm}) =>
          this.createSearch(searchTerm).pipe(map((data) => fromActions.accountSearchSuccess({data})))
        ),
        catchError((error) => of(fromActions.accountSearchFailure({error})))
      ),
    {dispatch: true}
  );

  setBusy$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.createSearch),
        map(() => fromActions.setLoading({isBusy: true}))
      ),
    {dispatch: true}
  );

  setLoaded$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.accountSearchSuccess),
        map(() => fromActions.setLoading({isBusy: false}))
      ),
    {dispatch: true}
  );

  setLoadedAfterError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.accountSearchFailure),
        map(() => fromActions.setLoading({isBusy: false}))
      ),
    {dispatch: true}
  );

  constructor(private actions$: Actions, private searchService: WgnAccountSearchService) {}

  private createSearch(search: string): Observable<IWgnAccountSearchResult[]> {
    if (!search) {
      return of([]);
    }

    return this.searchService
      .searchAll({
        search,
        type: search.indexOf(',') > -1 ? 'exact' : 'startswith',
      })
      .pipe(take(1));
  }
}
