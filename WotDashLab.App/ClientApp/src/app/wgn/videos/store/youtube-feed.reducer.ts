import { VideoFeed } from "../../store/wgn.state";
import { createReducer, on } from "@ngrx/store";
import { loadYoutubeFeed, loadYoutubeFeedComplete, loadYoutubeFeedFailed } from "./youtube-feed.actions";

const defaultState: VideoFeed = {
  currentPage: 1,
  pageSize: 50,
  totalPages: 0,
  totalRecords: 0,
  feed: [],
}

export const youtubeFeedReducer = createReducer(
  defaultState,
  on(loadYoutubeFeed, (state, { request }) => ({
    ...state,
    currentPage: request.pageNo,
    pageSize: request.limit,
  })),
  on(loadYoutubeFeedComplete, (state, { payload }) => ({
    ...state,
    feed: [...payload.data],
    currentPage: payload.meta.page,
    totalPages: payload.meta.page_total,
    pageSize: payload.meta.limit,
    totalRecords: payload.meta.total,
  })),
  on(loadYoutubeFeedFailed, (state) => ({
    ...state,
    feed: [],
  })),
);
