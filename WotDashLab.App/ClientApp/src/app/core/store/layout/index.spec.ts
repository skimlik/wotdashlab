import { ILayoutState } from '../core.state';
import {
  layoutSelector,
  applicationTitleSelector,
  applicationIsBusySelector,
} from './index';

describe('Layout state selectors', () => {
  const layoutState: ILayoutState = {
    applicationTitle: 'Application title',
    busy: false,
  };

  const initialState = {
    layout: layoutState,
  };

  it('should select layout state', () => {
    expect(layoutSelector.projector(initialState)).toEqual(layoutState);
  });

  it('should select application title', () => {
    expect(applicationTitleSelector.projector(layoutState)).toEqual(layoutState.applicationTitle);
  });

  it('should select application is busy flag', () => {
    expect(applicationIsBusySelector.projector(layoutState)).toBe(layoutState.busy);
  });
});
