export interface IApplicationSettings {
  applicationId: string;
  defaultApi: IDefaultWotApi;
  apiTypes: { [key: string]: IWotAppDescription };
  redirects: { [key: string]: string };
}

export interface IDefaultWotApi {
  api: string;
  region: string;
}

export interface IWotAppDescription {
  name: string;
  regions: string[];
}
