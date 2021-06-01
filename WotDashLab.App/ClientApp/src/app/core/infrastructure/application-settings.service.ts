import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApplicationSettings } from './application-settings.';

@Injectable({ providedIn: 'root'})
export class ApplicationSettingsService {
  private endpoint = 'api/settings';

  constructor(private http: HttpClient) {
  }

  public get(): Observable<IApplicationSettings> {
    return this.http.get<IApplicationSettings>(this.endpoint);
  }
}
