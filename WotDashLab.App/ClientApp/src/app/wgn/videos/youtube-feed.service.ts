import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SupportedRegions } from "../../common/constants/string-constraints";
import { Observable } from "rxjs";
import { PagedRequest } from "../../common/contracts/http/paged-request";
import { IWorPagedResponse } from "../../core/infrastructure/http/wot-response";

export interface VideoSearchRequest extends PagedRequest{
  categoryId?: number[];
  dateFrom?: number;
  fields?: string[];
  important?: boolean;
  programIds?: number[];
  projectIds?: number[];
  language?: string[];
  query?: string;
  vehicleIds?: number[];
  videoIds?: number[];
}

export interface VideoThumbnail {
  height: number;
  width: number;
  url: string;
}

export interface VideoThumbnails {
  default: VideoThumbnail;
  high: VideoThumbnail;
  medium: VideoThumbnail;
  maxres: VideoThumbnail;
  standard: VideoThumbnail;
}

export interface VideoInfo {
  category_id: number[];
  description: string;
  important: boolean;
  video_url: string;
  title: string;
  ext_title: string;
  duration?: number;
  video_id: string;
  program_id?: number;
  project_id: number[];
  published_at: number;
  vehicles: number[];
  thumbnails: VideoThumbnails;
}

@Injectable({ providedIn: 'root' })
export class YoutubeFeedService {
  constructor(private http: HttpClient) {
  }

  get(region: SupportedRegions = 'ru', request: VideoSearchRequest): Observable<IWorPagedResponse<VideoInfo[]>> {
    const url = `api/${region}/wgn/videos/search`;
    return this.http.post<IWorPagedResponse<VideoInfo[]>>(url, request);
  }
}
