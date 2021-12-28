import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { IWgnAccountSearchResult } from '../account';
import { WgnAccountSearchService } from "./wgn-account-search.service";

@Component({
  selector: 'account-search',
  templateUrl: 'account-search.component.html',
  styleUrls: ['account-search.component.scss'],
})
export class AccountSearchComponent implements OnInit, OnDestroy {
  private _disposed$ = new Subject<void>();

  searchText = '';
  rowData$ = new BehaviorSubject<IWgnAccountSearchResult[]>([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: WgnAccountSearchService,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        map((q) => q.get('search')),
        takeUntil(this._disposed$)
      )
      .subscribe((text) => (this.searchText = text));
  }

  ngOnDestroy(): void {
    this._disposed$.next();
    this._disposed$.complete();
    this.rowData$.complete();
  }

  search() {
    const search$ = this.searchText
      ? this.searchService.searchAll({
        search: this.searchText,
        type: this.searchText.indexOf(',') > -1 ? 'exact' : 'startswith'
      }).pipe(take(1))
      : of([]);

    search$.subscribe(data => this.rowData$.next(data));
  }

  openProfile(accountId: number): void {
    this.router.navigate(['accounts', accountId]);
  }

  isWotProfile(games: string[]): boolean {
    return games?.some(g => g === 'wot') || false;
  }

  resolveGameName(value: string[]) {
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
    })
    return values?.join(', ')
  }
}
