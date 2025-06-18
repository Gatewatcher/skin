import {
  camelcase,
  deepMerge,
  insertIf,
} from '@gatewatcher/bistoury/utils-lang';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { LoadMoreProps } from '.';
import {
  DEFAULT_INITIAL_PAGE,
  DEFAULT_INITIAL_PER_PAGE,
  DEFAULT_LOAD_MORE_TYPE,
  DEFAULT_USE_DECODE_URL_OPTIONS,
  DEFAULT_USE_ENCODE_URL_CONFIG,
  DEFAULT_USE_ENCODE_URL_OPTIONS,
  DEFAULT_USE_URL_CONFIG,
} from './constants';
import type {
  LoadMoreParams,
  UseDecodeUrlConfig,
  UseDecodeUrlOptions,
  UseEncodeUrlConfig,
  UseEncodeUrlOptions,
} from './types';

export function usePagination<T = unknown>(
  data: T[],
  params: Partial<LoadMoreParams> = {},
): T[] {
  const defaultParams = {
    offset: 0,
    page: DEFAULT_INITIAL_PAGE,
    perPage: DEFAULT_INITIAL_PER_PAGE,
    type: DEFAULT_LOAD_MORE_TYPE,
  };
  const { page, perPage, type } = { ...defaultParams, ...params };

  return useMemo(() => {
    if (type === 'pagination') {
      return data.slice((page - 1) * perPage, page * perPage);
    }

    if (type === 'infiniteScroll') {
      return data.slice(0, page * perPage);
    }

    return [];
  }, [data, page, perPage, type]);
}

export const useEncodeUrl = (
  options?: Partial<UseEncodeUrlOptions>,
  config?: Partial<UseEncodeUrlConfig>,
): LoadMoreProps<unknown>['encode'] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const allOptions = deepMerge(
    DEFAULT_USE_ENCODE_URL_OPTIONS,
    options || {},
  ) as UseEncodeUrlOptions;
  const {
    afterEncode,
    navigateOptions,
    prefix,
    separator,
    suffix,
    withSetSearchParams,
  } = deepMerge<Partial<UseEncodeUrlConfig>>({
    ...DEFAULT_USE_URL_CONFIG,
    ...DEFAULT_USE_ENCODE_URL_CONFIG,
    ...config,
  });

  return (params: LoadMoreParams) => {
    for (const [key, value] of Object.entries(params)) {
      const { enabled, encode, format, name } =
        allOptions[key as keyof LoadMoreParams];
      const paramName = [
        ...insertIf(!!prefix, prefix),
        name || key,
        ...insertIf(!!suffix, suffix),
      ].join(separator);

      if (!enabled) continue;

      if (paramName !== key || encode) {
        searchParams.delete(key);
      }

      encode?.(value, params);

      if (!value || (Array.isArray(value) && !value.length)) {
        searchParams.delete(paramName);
      } else {
        searchParams.set(paramName, format ? format(value) : value.toString());
      }
    }

    afterEncode?.(searchParams);

    withSetSearchParams && setSearchParams(searchParams, navigateOptions);
  };
};

export const useDecodeUrl = (
  options?: Partial<UseDecodeUrlOptions>,
  config?: Partial<UseDecodeUrlConfig>,
): (() => Partial<
  Pick<LoadMoreProps<unknown>, 'initialPage' | 'initialPerPage' | 'initialSort'>
>) => {
  const [searchParams] = useSearchParams();
  const allOptions = deepMerge(
    DEFAULT_USE_DECODE_URL_OPTIONS,
    options || {},
  ) as UseDecodeUrlOptions;

  const { prefix, separator, suffix } = {
    ...DEFAULT_USE_URL_CONFIG,
    ...config,
  };

  return () =>
    Object.entries(allOptions).reduce((acc, [key, value]) => {
      const { enabled, decode, format, name } = value;
      const paramKey = camelcase(`initial ${key}`);
      const paramName = [
        ...insertIf(!!prefix, prefix),
        name || key,
        ...insertIf(!!suffix, suffix),
      ].join(separator);

      if (!enabled) return acc;

      const searchParamsValue = searchParams.get(paramName);

      if (decode) {
        return {
          ...acc,
          [paramKey]: decode(searchParamsValue, searchParams),
        };
      }

      return {
        ...acc,
        ...(searchParamsValue && {
          [paramKey]: format ? format(searchParamsValue) : searchParamsValue,
        }),
      };
    }, {});
};
