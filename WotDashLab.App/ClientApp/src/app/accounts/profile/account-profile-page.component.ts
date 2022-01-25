import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { TabModel } from 'src/app/common/tab-control/tab.model';
import { LocalStorageService } from 'src/app/core/infrastructure/local-storage.service';
import { currentLanguageSelector } from 'src/app/core/store/settings';
import { IAccountsState } from '../store/accounts-state';
import { accountProfileLoadingSelector, activeAccountProfileSelector } from '../store/profile';
import * as fromProfileActions from '../store/profile/account-profile.actions';
import { IAccountProfileState } from '../store/profile/account-profile.state';

@Component({
  selector: 'app-account-profile-page',
  templateUrl: './account-profile-page.component.html',
  styleUrls: ['./account-profile-page.component.scss']
})
export class AccountProfilePageComponent implements OnInit, OnDestroy {
  private _disposed$ = new Subject<void>();
  private _allTabs: TabModel[] = [
    {
      key: 'profile',
      name: 'Profile'
    }, {
      key: 'frags',
      name: 'Frags'
    }];
  private _activeTab$ = new BehaviorSubject<TabModel>(this._allTabs[0]);

  selectedProfile$: Observable<IAccountProfileState> = this.store.pipe(
    select(activeAccountProfileSelector)
  );
  readonly language$ = this.store.pipe(select(currentLanguageSelector));
  readonly profileLoading$ = this.store.pipe(select(accountProfileLoadingSelector));
  readonly region = this.storage.getRegion();

  readonly tabs$ = this.selectedProfile$.pipe(
    map((profile) => this._allTabs.map((t) => {
      const hideFrags = t.key === 'frags' && !profile?.statistics?.frags;
      const disabled = !profile || hideFrags;
      return {
        ...t,
        disabled
      };
    })),
  );

  activeTab$ = this._activeTab$.asObservable();

  constructor(
    private store: Store<IAccountsState>,
    private route: ActivatedRoute,
    private storage: LocalStorageService) {
    }

  ngOnInit(): void {
    const accountIdParamName = 'accountId';
    const accountId$ = this.route.params.pipe(map((p) => +p[accountIdParamName]));

    combineLatest([accountId$, this.language$])
    .pipe(takeUntil(this._disposed$))
    .subscribe((data) => {
      const [accountId, language] = data;
      this.store.dispatch(
        fromProfileActions.selectAccountById({
          accountId,
          region: this.region,
          language,
        })
      );
    });
  }

  ngOnDestroy(): void {
    this._disposed$.next();
    this._disposed$.complete();
  }

  onTabSelected(tab: TabModel): void {
    if (!tab) {
      return;
    }

    this._activeTab$.next(tab);
  }
}
