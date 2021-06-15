import { createReducer, on } from '@ngrx/store';
import { IServerInfo } from "../../store/wgn.state";
import { serversLoadComplete, serversLoadFailed } from "./servers.actions";

const defaultState: {[key: string]: IServerInfo[]} = {};

export const wgnServersReducer = createReducer(
  defaultState,
  on(serversLoadComplete, (state, { payload }) => ({
    ...payload,
  })),
  on(serversLoadFailed, () => ({})),
);
