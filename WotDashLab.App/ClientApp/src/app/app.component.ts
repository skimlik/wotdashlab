import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, takeUntil } from 'rxjs/operators';
import { applicationTitleSelector } from './core/store/layout';
import {
  currentAppDescriptionSelector,
  redirectsSelector,
} from './core/store/settings';
import { ICoreState } from './core/store/core.state';
import { LocalStorageService } from './core/infrastructure/local-storage.service';
import { DefaultRegion } from './core/constants/default-settings';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, Subject } from 'rxjs';
import { IAuthInfo } from './core/infrastructure/authentication/auth-info';
import { activeAccountProfileSelector } from "./accounts/store/profile";
import { IAccountProfileState } from "./accounts/store/profile/account-profile.state";
import { IAccountsState } from "./accounts/store/accounts-state";
import { SupportedRegions } from "./common/constants/string-constraints";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private _dispose$ = new Subject<void>();

  brand$ = this.store.pipe(select(applicationTitleSelector));
  availableRegions$ = this.store.pipe(
    select(redirectsSelector),
    map((redirects) => Object.keys(redirects) as SupportedRegions[])
  );
  currentApiName$ = this.store.pipe(
    select(currentAppDescriptionSelector),
    map((m) => m.name)
  );
  currentRegion = DefaultRegion;

  constructor(
    private store: Store<ICoreState>,
    private localStorage: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.currentRegion = this.localStorage.getRegion();
  }

  ngOnInit(): void {
    combineLatest([
      this.route.queryParams.pipe(map(p => p['status'])),
      this.route.queryParams.pipe(map(p => p['access_token'])),
      this.route.queryParams.pipe(map(p => p['account_id'])),
      this.route.queryParams.pipe(map(p => p['expires_at'])),
      this.route.queryParams.pipe(map(p => p['nickname'])),
    ]).pipe(
      takeUntil(this._dispose$)
    ).subscribe((data) => {
      const [status, accessToken, accountId, expiresAt, nickname] = data;
      const isOk = Array.isArray(status) && status.length > 0
        ? status[status.length - 1] === 'ok'
        : status === 'ok';

      if (isOk && accessToken && expiresAt) {
        const authInfo: IAuthInfo = {
          accountId,
          expiresAt,
          nickname,
          accessToken,
        };
        this.localStorage.setValue("Auth", JSON.stringify(authInfo));
      }
    })
  }

  ngOnDestroy(): void {
    this._dispose$.next();
    this._dispose$.complete();
  }

  onRegionChange(region: SupportedRegions) {
    this.currentRegion = region;
    this.localStorage.setValue('region', JSON.stringify({ default: region }));
  }

  profileRequested(): void {
    const auth = this.localStorage.getAuth();
    if (auth) {
      this.router.navigate(['accounts', auth.accountId]);
    }
  }

  logoff() {
    this.localStorage.removeValue('Auth');
  }

  get currentUser(): IAuthInfo {
    return this.localStorage.getAuth();
  }
}
