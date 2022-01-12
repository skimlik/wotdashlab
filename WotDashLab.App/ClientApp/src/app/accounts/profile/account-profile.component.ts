import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAccountsState } from '../store/accounts-state';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subject} from 'rxjs';
import { activeAccountProfileSelector } from '../store/profile';
import { IAccountProfileState } from '../store/profile/account-profile.state';
import { ActivatedRoute } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { currentLanguageSelector } from '../../core/store/settings';
import * as fromProfileActions from '../store/profile/account-profile.actions';
import { LocalStorageService } from '../../core/infrastructure/local-storage.service';
import { TabModel } from 'src/app/common/tab-control/tab.model';

@Component({
  selector: 'account-profile',
  templateUrl: 'account-profile.component.html',
  styleUrls: ['account-profile.component.scss'],
})
export class AccountProfileComponent implements OnInit, OnDestroy {
  private _region = this.storage.getRegion();
  private _language$ = this.store.pipe(select(currentLanguageSelector));
  private _disposed$ = new Subject<void>();

  readonly tabs: TabModel[] = [{
    key: 'profile',
    name: 'Profile'
  }, {
    key: 'frags',
    name: 'Frags'
  }];
  activeTab: TabModel = this.tabs?.[0];
  selectedProfile$: Observable<IAccountProfileState> = this.store.pipe(
    select(activeAccountProfileSelector)
  );

  constructor(
    private store: Store<IAccountsState>,
    private route: ActivatedRoute,
    private storage: LocalStorageService,
  ) {
  }

  ngOnInit(): void {
    const accountId$ = this.route.params.pipe(map((p) => +p['accountId']));

    combineLatest([accountId$, this._language$])
    .pipe(takeUntil(this._disposed$))
    .subscribe((data) => {
      const [accountId, language] = data;
      this.store.dispatch(
        fromProfileActions.selectAccountById({
          accountId,
          region: this._region,
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
    this.activeTab = tab;
  }
}
