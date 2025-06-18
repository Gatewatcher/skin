import { isDefined } from '@gatewatcher/bistoury/utils-lang';
import type { SearchParamsObject } from '@gatewatcher/bistoury/utils-url';
import {
  objectToURLSearchParams,
  urlSearchParamsToObject,
} from '@gatewatcher/bistoury/utils-url';
import { useSearchParams } from 'react-router-dom';

import { DEFAULT_URL_KEY } from '../constants';

export type UseDrawerPersistenceReturn = {
  encode: (id: string, props?: SearchParamsObject) => void;
  clean: () => void;
};

/**
 * @deprecated This function has moved into the DrawerV2 folder.
 *
 * Will be removed 01/05/2025.
 */
export const useDrawerPersistence = (): UseDrawerPersistenceReturn => {
  const [searchParams, setSearchParams] = useSearchParams();

  const encode = (id: string, props: SearchParamsObject = {}) => {
    searchParams.set(DEFAULT_URL_KEY, id);

    const oldParams = urlSearchParamsToObject(searchParams);
    const newParams = Object.entries(props).reduce((acc, [propsKey, value]) => {
      if (isDefined(value)) {
        acc[`${DEFAULT_URL_KEY}_${propsKey}`] = value.toString();
      }

      return acc;
    }, {} as Record<string, string>);

    setSearchParams(
      objectToURLSearchParams({
        ...oldParams,
        ...newParams,
      }),
      { replace: true },
    );
  };

  const clean = () => {
    const keys = [...searchParams.keys()];
    for (const key of keys) {
      key.startsWith(DEFAULT_URL_KEY) && searchParams.delete(key);
    }
    searchParams.delete(DEFAULT_URL_KEY);

    setSearchParams(searchParams, { replace: true });
  };

  return { encode, clean };
};
