import { useSearchParams } from 'react-router-dom';

import { DEFAULT_URL_KEY } from '../../constants';

export type UseDrawerSearchParamsReturn = {
  getId: () => string | null;
  getProps: () => Record<string, string>;
};

export const useDrawerSearchParams = (): UseDrawerSearchParamsReturn => {
  const [searchParams] = useSearchParams();

  return {
    getId: () => searchParams.get(DEFAULT_URL_KEY),
    getProps: () => {
      return Object.fromEntries(
        [...searchParams].reduce((acc, param) => {
          const [prefix, keyName] = param[0].split('_');
          if (keyName && prefix === DEFAULT_URL_KEY) {
            acc.push([keyName, param[1]]);
          }
          return acc;
        }, [] as [string, string][]),
      );
    },
  };
};
