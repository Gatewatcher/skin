import type { SortValue } from '@/skin/listings';
import {
  convertOrderingToSortValues,
  convertSortValuesToOrdering,
} from '@/skin/listings';

import type {
  LoadMoreType,
  UseDecodeUrlOptions,
  UseEncodeUrlConfig,
  UseEncodeUrlOptions,
  UseUrlConfig,
} from './types';

export const LOAD_MORE_TYPES = ['pagination', 'infiniteScroll'] as const;

export const DEFAULT_INITIAL_PAGE = 1;
export const DEFAULT_INITIAL_PER_PAGE = 25;
export const DEFAULT_LOAD_MORE_TYPE: LoadMoreType = 'pagination';
export const DEFAULT_IS_LOADING = false;
export const DEFAULT_TOTAL_ITEMS_COUNT = 0;
export const DEFAULT_IS_ERROR = false;
export const DEFAULT_ERROR = null;
export const DEFAULT_WITH_CONTROLS = true;
export const DEFAULT_PAGE_RESET_TRIGGER = [];

export const DEFAULT_USE_ENCODE_URL_OPTIONS: UseEncodeUrlOptions = {
  offset: {
    enabled: false,
    format: value => (value as number).toString(),
    name: 'offset',
  },
  page: {
    enabled: true,
    format: value => (value as number).toString(),
    name: 'page',
  },
  perPage: {
    enabled: true,
    format: value => (value as number).toString(),
    name: 'page_size',
  },
  sort: {
    enabled: true,
    name: 'sort',
    format: value => convertSortValuesToOrdering(value as SortValue[]),
  },
  type: {
    enabled: false,
    name: 'type',
  },
};

export const DEFAULT_USE_DECODE_URL_OPTIONS: UseDecodeUrlOptions = {
  offset: { enabled: false, format: parseInt, name: 'offset' },
  page: { enabled: true, format: parseInt, name: 'page' },
  perPage: { enabled: true, format: parseInt, name: 'page_size' },
  sort: {
    enabled: true,
    name: 'sort',
    format: value => convertOrderingToSortValues(value),
  },
  type: { enabled: false, name: 'type' },
};

export const DEFAULT_USE_URL_CONFIG: Partial<UseUrlConfig> = {
  separator: '_',
};

export const DEFAULT_USE_ENCODE_URL_CONFIG: Partial<UseEncodeUrlConfig> = {
  navigateOptions: { replace: true },
  withSetSearchParams: true,
};
