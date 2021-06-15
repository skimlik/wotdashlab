import { ActionReducerMap } from "@ngrx/store";
import { wgnServersReducer } from "../servers/store/servers.reducer";

export interface IServerInfo {
  players_online: number;
  server: string;
}

export interface IWgnState {
  servers: { [key: string]: IServerInfo[] };
}

export const wgnReducers: ActionReducerMap<IWgnState> = {
  servers: wgnServersReducer
};
