import { isDefined, isObject } from '@gatewatcher/bistoury/utils-lang';
import {
  objectToURLSearchParams,
  urlSearchParamsToObject,
} from '@gatewatcher/bistoury/utils-url';
import { useSearchParams } from 'react-router-dom';

import { DEFAULT_URL_KEY } from '../../constants';

export type UseDrawerPersistenceReturn = {
  encode: (id: string, props?: unknown) => void;
  clean: () => void;
};

export const useDrawerPersistence = (): UseDrawerPersistenceReturn => {
  const [searchParams, setSearchParams] = useSearchParams();

  const encode = (id: string, props?: unknown) => {
    searchParams.set(DEFAULT_URL_KEY, id);

    const oldParams = urlSearchParamsToObject(searchParams);
    const newParams =
      isObject(props) &&
      Object.entries(props).reduce((acc, [propsKey, value]) => {
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
