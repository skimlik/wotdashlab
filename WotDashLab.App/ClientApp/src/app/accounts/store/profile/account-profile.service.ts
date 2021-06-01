import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAccountProfileState } from './account-profile.state';

export declare type ProfileExtras =
  | 'private.boosters'
  | 'private.garage'
  | 'private.grouped_contacts'
  | 'private.personal_missions'
  | 'private.rented'
  | 'statistics.epic'
  | 'statistics.fallout'
  | 'statistics.globalmap_absolute'
  | 'statistics.globalmap_champion'
  | 'statistics.globalmap_middle'
  | 'statistics.random'
  | 'statistics.ranked_battles'
  | 'statistics.ranked_battles_current'
  | 'statistics.ranked_battles_previous';

@Injectable()
export class AccountProfileService {
  constructor(private http: HttpClient) {}

  fetch(
    accountId: number,
    region: string,
    extras: ProfileExtras[],
    fields: string[],
    language: string = 'ru'
  ): Observable<IAccountProfileState> {
    const body = {
      extras,
      fields,
      language,
    };
    return this.http.post<IAccountProfileState>(
      `/api/${region}/accounts/profile/${accountId}`,
      body
    );
  }
}
