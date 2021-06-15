import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IServerInfo } from "../store/wgn.state";
import { SupportedRegions } from "../../common/constants/string-constraints";

@Injectable({ providedIn: 'root' })
export class ServersInfoService {

  constructor(private httpClient: HttpClient) {
  }

  get(region: SupportedRegions = 'ru'): Observable<{[key: string]: IServerInfo[]}> {
    const url = `api/${region}/wgn/servers`;
    return this.httpClient.get<{[key: string]: IServerInfo[]}>(url)
  }
}
