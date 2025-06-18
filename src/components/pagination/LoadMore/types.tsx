import type { ValueOf } from '@gatewatcher/bistoury/utils-types';
import type { NavigateOptions } from 'react-router-dom';
import type { URLSearchParams } from 'url';

import type { SortValue } from '@/skin/listings';

import type { LOAD_MORE_TYPES } from './constants';

export type LoadMoreType = typeof LOAD_MORE_TYPES[number];

export type LoadMoreParams<Sort = string> = {
  offset: number;
  page: number;
  perPage: number;
  sort: SortValue<Sort>[];
  type: LoadMoreType;
};

export type UseEncodeUrlOption = {
  enabled?: boolean;
  encode?: (value: ValueOf<LoadMoreParams>, params: LoadMoreParams) => void;
  format?: (value: ValueOf<LoadMoreParams>) => string;
  name?: string;
};

export type UseDecodeUrlOption = {
  enabled?: boolean;
  decode?: (value: string | null, url: URLSearchParams) => unknown;
  format?: (value: string) => unknown;
  name?: string;
};

export type UseEncodeUrlOptions = Record<
  keyof LoadMoreParams,
  UseEncodeUrlOption
>;

export type UseDecodeUrlOptions = Record<
  keyof LoadMoreParams,
  UseDecodeUrlOption
>;

export type UseUrlConfig = {
  prefix: string;
  separator: string;
  suffix: string;
};

export type UseDecodeUrlConfig = UseUrlConfig;
export type UseEncodeUrlConfig = UseUrlConfig & {
  afterEncode: (params: URLSearchParams) => void;
  navigateOptions: NavigateOptions;
  withSetSearchParams: boolean;
};

export type State = Omit<LoadMoreParams, 'offset' | 'type'>;
export enum Actions {
  SET_PAGE = 'SET_PAGE',
  SET_PER_PAGE = 'SET_PER_PAGE',
  SORT = 'SORT',
  RESET_PAGE = 'RESET_PAGE',
}

export type SetPageAction = {
  type: Actions.SET_PAGE;
  payload: { page: number };
};

export type SetPerPageAction = {
  type: Actions.SET_PER_PAGE;
  payload: { perPage: number };
};

export type SortAction = {
  type: Actions.SORT;
  payload: { sort: SortValue[] };
};

export type ResetPageAction = {
  type: Actions.RESET_PAGE;
};

export type Action =
  | SetPageAction
  | SetPerPageAction
  | SortAction
  | ResetPageAction;
