import { createAction, props } from "@ngrx/store";
import { IServerInfo } from "../../store/wgn.state";
import { SupportedLanguages, SupportedRegions } from "../../../common/constants/string-constraints";

export enum ServerInfoActionTypes {
  Load = '[Server Infos] Load',
  Loaded = '[Server Infos] Loaded',
  FailedToLoad = '[Server Infos] Failed to load',
}

export const loadServers = createAction(
  ServerInfoActionTypes.Load,
  props<{ region: SupportedRegions, language?: SupportedLanguages }>()
);

export const serversLoadComplete = createAction(
  ServerInfoActionTypes.Loaded,
  props<{ payload: {[key: string]: IServerInfo[]}}>(),
);

export const serversLoadFailed = createAction(
  ServerInfoActionTypes.FailedToLoad,
);
