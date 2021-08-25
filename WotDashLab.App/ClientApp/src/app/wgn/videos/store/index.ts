import { createSelector } from '@ngrx/store';
import { wgnFeatureSelector } from '../../store';

export const videoFeedFeatureSelector = createSelector(
  wgnFeatureSelector,
  (state) => state.videoFeed,
);

export const videoFeedSelector = createSelector(
  videoFeedFeatureSelector,
  (state) => state.feed,
);

export const videoFeedPageNumberSelector = createSelector(
  videoFeedFeatureSelector,
  (state) => state.currentPage,
);

export const videoFeedPageSizeSelector = createSelector(
  videoFeedFeatureSelector,
  (state) => state.pageSize,
);

export const videoFeedTotalItemsSelector = createSelector(
  videoFeedFeatureSelector,
  (state) => state.totalRecords,
);

export const videoFeedTotalPagesSelector = createSelector(
  videoFeedFeatureSelector,
  (state) => state.totalPages,
);
