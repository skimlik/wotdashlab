export interface IHttpErrorDescription {
  code: number;
  message: string;
  field: string;
  value: string;
}

export interface IWotResponseMetadata {
  count: number;
}

export interface IWotResponsePagedMetadata extends IWotResponseMetadata {
  total: number;
  limit: number;
  page: number;
  page_total: number;
}

export interface IWotResponseWrapper<TData, TMetadata> {
  status: 'ok' | 'error';
  error: IHttpErrorDescription | string;
  meta: TMetadata;
  isOk: boolean;
  data: TData;
}

export interface IWorPagedResponse<TData> extends IWotResponseWrapper<TData, IWotResponsePagedMetadata> {
}

export interface IWotResponse<TData> extends IWotResponseWrapper<TData, IWotResponseMetadata> {
}
