import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SupportedLanguages, SupportedRegions } from 'src/app/common/constants/string-constraints';
import { ITankInfoModel } from './tank-info.model';

@Injectable({
  providedIn: 'root'
})
export class TanksService {
  constructor(private httpClient: HttpClient) {
  }

  search(
    tankIds: number[],
    region: SupportedRegions,
    language: SupportedLanguages = 'en',
    limit: number = null,
  ): Observable<ITankInfoModel[]> {
    if (!Array.isArray(tankIds) || tankIds.length < 1) {
      return of([]);
    }
    const url = `api/${region}/tanks/search`;
    const params = new HttpParams().append('language', language);
    if (limit) {
      params.append('limit', limit.toString());
    }

    return this.httpClient.post<ITankInfoModel[]>(url, {
      tankIds
    }, { params });
  }

  get(tankId: number, region: SupportedRegions, language: SupportedLanguages = 'en'): Observable<ITankInfoModel> {
    const url = `api/${region}/tanks/${tankId}`;
    const params = new HttpParams().append('language', language);
    return this.httpClient.get<ITankInfoModel>(url, { params });
  }
}
