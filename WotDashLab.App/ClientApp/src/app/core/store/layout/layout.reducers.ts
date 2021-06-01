import { ILayoutState } from '../core.state';
import { createReducer, on } from '@ngrx/store';
import * as fromActions from './layout.actions';

const defaultState: ILayoutState = {
  busy: false,
  applicationTitle: 'WoT Dashboard',
};

export const layoutReducer = createReducer(
  defaultState,
  on(fromActions.setApplicationBusy, (state, { busy }) => ({
    ...state,
    busy,
  })),
  on(fromActions.setApplicationTitle, (state, { applicationTitle }) => ({
    ...state,
    applicationTitle,
  }))
)
