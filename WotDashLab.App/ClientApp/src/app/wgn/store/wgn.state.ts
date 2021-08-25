import { ActionReducerMap } from "@ngrx/store";
import { wgnServersReducer } from "../servers/store/servers.reducer";
import { VideoInfo } from "../videos/youtube-feed.service";
import { youtubeFeedReducer } from "../videos/store/youtube-feed.reducer";

export interface IServerInfo {
  players_online: number;
  server: string;
}

export interface VideoFeed {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  feed: VideoInfo[];
}

export interface IWgnState {
  servers: { [key: string]: IServerInfo[] };
  videoFeed: VideoFeed;
}

export const wgnReducers: ActionReducerMap<IWgnState> = {
  servers: wgnServersReducer,
  videoFeed: youtubeFeedReducer,
};
