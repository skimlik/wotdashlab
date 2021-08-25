import { createAction, props } from "@ngrx/store";
import { VideoInfo, VideoSearchRequest } from "../youtube-feed.service";
import { SupportedRegions } from "../../../common/constants/string-constraints";
import { IWorPagedResponse } from "../../../core/infrastructure/http/wot-response";

export enum YoutubeFeedActionTypes {
  LoadYoutubeFeed = '[Youtube Feed] Load feed',
  LoadYoutubeFeedComplete = '[Youtube Feed] Load feed complete successfully',
  LoadYoutubeFeedFailed = '[Youtube Feed] Load feed failed',
}

export const loadYoutubeFeed = createAction(
  YoutubeFeedActionTypes.LoadYoutubeFeed,
  props<{ request: VideoSearchRequest, region: SupportedRegions }>(),
);

export const loadYoutubeFeedComplete = createAction(
  YoutubeFeedActionTypes.LoadYoutubeFeedComplete,
  props<{ payload: IWorPagedResponse<VideoInfo[]> }>(),
);

export const loadYoutubeFeedFailed = createAction(
  YoutubeFeedActionTypes.LoadYoutubeFeedFailed,
);
