import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DefaultRegion } from '../constants/default-settings';
import { IAuthInfo } from './authentication/auth-info';
import { SupportedRegions } from "../../common/constants/string-constraints";

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private _valueChange$ = new Subject<{ key: string, value: string }>();
  valueChange$: Observable<{ key: string, value: string }>;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.valueChange$ = this._valueChange$.asObservable();
  }

  setValue(key: string, value: string): void {
    this.storage.setItem(key, value);
    this._valueChange$.next({ key, value });
  }

  getValue(key: string): string {
    return this.storage.getItem(key);
  }

  getAuth(): IAuthInfo {
    const auth = this.storage.getItem('Auth');
    if (auth) {
      return JSON.parse(auth);
    }
    return null;
  }

  getRegion(): SupportedRegions {
    const reg = this.getValue('region');
    if (reg) {
      const parsed = JSON.parse(reg);
      return parsed.default || DefaultRegion;
    }
    return DefaultRegion;
  }

  removeValue(key: string): void {
    this.storage.removeItem(key);
  }

  private get storage(): Storage {
    return this.window.localStorage;
  }

  private get window(): Window {
    return this.document.defaultView;
  }
}
