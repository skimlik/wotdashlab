import { createAction, props } from '@ngrx/store';

export const LayoutActionTypes = {
  setApplicationBusy: '[Core Layout] Set application busy',
  setApplicationTitle: '[Core Layout] Set application title',
};

export const setApplicationBusy = createAction(
  LayoutActionTypes.setApplicationBusy,
  props<{ busy: boolean }>()
);

export const setApplicationTitle = createAction(
  LayoutActionTypes.setApplicationTitle,
  props<{ applicationTitle: string }>()
);
