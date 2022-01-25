import {Component, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { SupportedLanguages, SupportedRegions } from 'src/app/common/constants/string-constraints';
import { IAccountsState, IFragInfo, IFragInfoMap } from '../store/accounts-state';
import { IAccountProfileState } from '../store/profile/account-profile.state';
import * as fromActions from '../store/profile/account-profile.actions';
import { fragsSelector } from '../store/profile';
import { map, tap } from 'rxjs/operators';
import { ITankInfoModel } from 'src/app/core-api/tanks/tank-info.model';


@Component({
  selector: 'app-account-frags',
  templateUrl: './account-frags.component.html',
  styleUrls: ['./account-frags.component.scss'],
})
export class AccountFragsComponent implements OnInit, OnDestroy {
  private _dispose$ = new Subject<void>();
  private _profile: IAccountProfileState;
  private _tankIds: number[] = [];
  private _pageSize = 100;
  private _fragsMap = this.store.pipe(select(fragsSelector));

  loading = 0;
  fragsCount = 0;

  @Input() ready = true;
  @Input() region: SupportedRegions = 'ru';
  @Input() language: SupportedLanguages = 'ru';
  @Input()
  set profile(value: IAccountProfileState) {
    if (value) {
      this._profile = value;
      if (value.statistics?.frags) {
        this._tankIds = Object.keys(value.statistics.frags).map((k) => +k);
        this.fragsCount = this._tankIds.length;
      }
    }
  }
  get profile(): IAccountProfileState {
    return this._profile;
  }

  constructor(private store: Store<IAccountsState>) {}

  ngOnInit(): void {
    const accountId = +this.profile.accountId;
    for (let i = 0; i < Math.floor(this._tankIds.length / this._pageSize); i++) {
      const pageStart = i * this._pageSize;
      const tankIds = this._tankIds.slice(pageStart, pageStart + this._pageSize);
      this.store.dispatch(fromActions.loadFragsPage({
        accountId,
        language: this.language,
        region: this.region,
        tankIds
      }));
    }
  }

  ngOnDestroy(): void {
    this._dispose$.next();
    this._dispose$.complete();
  }

  getFragsCount(tankId: number): number {
    return this.profile?.statistics?.frags?.[tankId] ?? 0;
  }

  getFragsSorted$(): Observable<IFragInfo[]> {
    return this.accountFrags$.pipe(
      map((data) => Object.keys(data).map((key) => data[key] as ITankInfoModel)),
      map((data) => data.map(tank => ({
        ...tank,
        count: this.getFragsCount(tank.id)
      }))),
      map((data) => data.sort(this.sortFn)),
    );
  }

  get accountFrags$(): Observable<IFragInfoMap> {
    return this._fragsMap.pipe(
      map((data) => data?.[this.profile.accountId] || {})
    );
  }

  private sortFn(d1: IFragInfo, d2: IFragInfo): number {
    if (d1.count === d2.count) {
      return d1.tier > d2.tier ? -1 : 1;
    }
    return d1.count > d2.count ? -1 : 1;
  }
}
