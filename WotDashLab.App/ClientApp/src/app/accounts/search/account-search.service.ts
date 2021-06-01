import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAccount } from '../account';

export class AccountSearchParams {
  region: 'ru' | 'na' | 'eu' | 'asia' = 'ru';
  text: string;
  match: 'exact' | 'startswith';
  limit = 10;
}

@Injectable({ providedIn: 'root' })
export class AccountSearchService {
  constructor(private httpClient: HttpClient) {}

  public search(region: string, nickname: string): Observable<IAccount> {
    const url = `api/${region}/accounts/${nickname}`;
    return this.httpClient.get<IAccount>(url);
  }

  public searchAll(searchParams: AccountSearchParams): Observable<IAccount[]> {
    const { region, text, match, limit } = searchParams;
    const url = `api/${region}/accounts`;
    const params = new HttpParams()
      .append('search', text)
      .append('searchType', match)
      .append('limit', (limit ? limit : 0).toString());

    return this.httpClient.get<IAccount[]>(url, { params });
  }
}
