import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { take, withLatestFrom } from 'rxjs/operators';
import { ICoreState } from '../../store/core.state';
import { applicationIdSelector, redirectsSelector } from '../../store/settings';
import { LocalStorageService } from '../local-storage.service';
import { UnixDateService } from '../../services/unix-date.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private loginPath = '/wot/auth/login/';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private store: Store<ICoreState>,
    private localStorage: LocalStorageService,
  ) {
  }

  login(region: string): void {
    this.store.pipe(
      select(redirectsSelector),
      withLatestFrom(this.store.select(applicationIdSelector)),
      take(1),
    ).subscribe(([redirects, appId]) => {
      const url = redirects[region];
      if (!url) {
        throw 'OpenID authentication server is not defined';
      }

      const login = `${url}${this.loginPath}?application_id=${appId}&redirect_uri=${this.window.location}`;
      window.location.href = login;
    });
  }

  isLoggedIn(): boolean {
    const auth = this.localStorage.getAuth();
    return !!auth && auth.expiresAt > UnixDateService.toUnixDate(new Date());
  }

  private get window(): Window {
    return this.document.defaultView;
  }
}
