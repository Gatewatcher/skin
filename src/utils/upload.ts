import type { HTTPVerb } from '@/mocks/types';

export type UploadProgress = {
  loaded: number;
  total: number;
  percentage?: number;
};

export type OnFulfilledParams = {
  id?: string;
  body: XMLHttpRequestBodyInit;
  reject: (reason?: unknown) => void;
  resolve: (value?: unknown) => void;
  xhr: XMLHttpRequest;
};

export type BodyType = 'formData' | 'raw';

export type UploadOptions = {
  body: XMLHttpRequestBodyInit;
  bodyType?: BodyType;
  id?: string;
  endpoint: string;
  headers?: Record<string, string>;
  method?: HTTPVerb;
  onAbort?: () => void;
  onError?: (error: unknown) => void;
  onFulfilled?: (params: OnFulfilledParams) => void;
  onLoadStart?: (xhr: XMLHttpRequest) => void;
  onSuccess?: (params: OnFulfilledParams) => void;
  onProgress?: (progress: UploadProgress) => void;
  withCredentials?: boolean;
};

export const upload = (options: UploadOptions) => {
  const {
    endpoint,
    body,
    id,
    onProgress = () => {},
    method = 'POST',
    headers = {},
    onLoadStart = () => {},
    onFulfilled = () => {},
    onError = () => {},
    onAbort = () => {},
    withCredentials,
  } = options;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    const progress: UploadProgress = {
      loaded: 0,
      total: 0,
      percentage: 0,
    };

    xhr.upload.onloadstart = () => {
      onLoadStart(xhr);
    };

    xhr.upload.onerror = error => {
      console.error('Upload failed');
      onError(error);
    };

    xhr.upload.onabort = () => {
      console.warn('Upload cancelled');
      onAbort();
    };

    xhr.upload.onprogress = (event: ProgressEvent<EventTarget>) => {
      progress.total = event.total;
      progress.loaded = event.loaded;
      progress.percentage = (event.loaded / event.total) * 100;
      onProgress(progress);
    };

    xhr.onloadend = () => {
      onFulfilled({ xhr, reject, resolve, body, id });
    };

    xhr.open(method, endpoint);
    if (withCredentials) {
      xhr.withCredentials = true;
    }
    Object.entries(headers).forEach(([key, value]) =>
      xhr.setRequestHeader(key, value),
    );
    xhr.send(body);
  });
};
