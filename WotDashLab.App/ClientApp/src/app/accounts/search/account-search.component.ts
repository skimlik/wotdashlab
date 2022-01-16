import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { IAccountsState } from '../store/accounts-state';
import { select, Store } from '@ngrx/store';
import * as fromActions from '../store/search/account-search.actions';
import { accountSearchExpressionSelector, accountSearchLoadingSelector, accountSearchResultSelector } from '../store/search';
import { combineLatest, Observable, Subject } from 'rxjs';

@Component({
  selector: 'account-search',
  templateUrl: 'account-search.component.html',
  styleUrls: ['account-search.component.scss'],
})
export class AccountSearchComponent implements OnInit, OnDestroy {
  private _disposed$ = new Subject<void>();
  private _savedSearchText$ = this.store.pipe(select(accountSearchExpressionSelector));

  readonly loading$ = this.store.pipe(select(accountSearchLoadingSelector));
  searchText = '';
  rowData$ = this.store.pipe(select(accountSearchResultSelector));

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<IAccountsState>
  ) {
  }

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        map((q) => q.get('search')),
        filter((text) => !!text),
        takeUntil(this._disposed$)
      ).subscribe((searchTerm) => {
        this.store.dispatch(fromActions.setSearchText({ searchTerm }));
        this.store.dispatch(fromActions.createSearch({ searchTerm }));
      });

    this._savedSearchText$.pipe(takeUntil(this._disposed$)).subscribe((text) => this.searchText = text);
  }

  ngOnDestroy(): void {
    this._disposed$.next();
    this._disposed$.complete();
  }

  search(): void {
    this.store.dispatch(fromActions.createSearch({ searchTerm: this.searchText }));
  }

  onTextChange(text: string): void {
    this.store.dispatch(fromActions.setSearchText({ searchTerm: text }));
  }

  openProfile(accountId: number): void {
    this.router.navigate(['accounts', accountId]);
  }

  isWotProfile(games: string[]): boolean {
    return games?.some(g => g === 'wot') || false;
  }

  clearSearch(): void {
    this.store.dispatch(fromActions.clearAccountSearch());
  }

  hasData$(): Observable<boolean> {
    return this.rowData$.pipe(
      map((data) => Array.isArray(data) && data.length > 0)
    );
  }

  canClearSearch$(): Observable<boolean> {
    return combineLatest([
      this.hasData$(),
      this._savedSearchText$
    ]).pipe(
      map(([hasData, text]) => hasData || !!text)
    );
  }

  resolveGameName(value: string[]): string {
    const values = value?.map(p => {
      switch (p) {
        case 'wot':
          return 'World of Tanks';
        case 'wotb':
          return 'World of Tanks Blitz';
        case 'wowp':
          return 'World of Warplanes';
        case 'wows':
          return 'World of Warpships';
        case 'wgcb':
          return 'Console';
        case 'wgn':
          return 'WARGAMING.NET';
        default:
          return p;
      }
    });

    return values?.join(', ');
  }
}
