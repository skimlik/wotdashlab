import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SupportedLanguages, SupportedRegions, SupportedSearchTypes } from "../../common/constants/string-constraints";
import { IWgnAccountSearchResult } from "../account";
import { Observable } from "rxjs";
import { LocalStorageService } from "../../core/infrastructure/local-storage.service";

export class WgnAccountSearchParams {
  search: string;
  type: SupportedSearchTypes = 'startswith';
  fields?: string[];
  game?: string[];
  limit?: number;
  language?: SupportedLanguages
}

@Injectable({ providedIn: 'root' })
export class WgnAccountSearchService {

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) {
  }

  searchAll(request: WgnAccountSearchParams): Observable<IWgnAccountSearchResult[]> {
    const region = this.localStorage.getRegion() || 'ru';
    const uri = `api/${region}/wgn/accounts/search`;
    return this.httpClient.post<IWgnAccountSearchResult[]>(uri, request);
  }
}
