export interface IApiStatus {
  code: number;
  success: boolean;
  message: string;
}

export interface IApiRequestInfo {
  id?: string;
  timestamp?: string;
  method?: string;
  path?: string;
  query?: Record<string, unknown>;
}

export interface IApiSuccessEnvelope<T> {
  status: IApiStatus;
  request?: IApiRequestInfo;
  meta?: Record<string, any>;
  data: T;
}

export interface IApiErrorEnvelope {
  status: IApiStatus;
  request?: IApiRequestInfo;
  meta?: Record<string, any>;
  data: null;
  error?: any;
}

export type IApiResponse<T> = IApiSuccessEnvelope<T> | IApiErrorEnvelope;
