import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWotAccount } from '../account';
import { SupportedRegions, SupportedSearchTypes } from "../../common/constants/string-constraints";

export class WotAccountSearchParams {
  region: SupportedRegions = 'ru';
  text: string;
  match: SupportedSearchTypes = 'startswith';
  limit = 10;
}

@Injectable({ providedIn: 'root' })
export class WotAccountSearchService {
  constructor(private httpClient: HttpClient) {}

  public search(region: SupportedRegions, nickname: string): Observable<IWotAccount> {
    const url = `api/${region}/accounts/${nickname}`;
    return this.httpClient.get<IWotAccount>(url);
  }

  public searchAll(searchParams: WotAccountSearchParams): Observable<IWotAccount[]> {
    const { region, text, match, limit } = searchParams;
    const url = `api/${region}/accounts`;
    const params = new HttpParams()
      .append('search', text)
      .append('searchType', match)
      .append('limit', (limit ? limit : 0).toString());

    return this.httpClient.get<IWotAccount[]>(url, { params });
  }
}
