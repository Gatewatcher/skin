import { createContext, useContext } from 'react';

import {
  DEFAULT_INITIAL_PAGE,
  DEFAULT_IS_LOADING,
  DEFAULT_LOAD_MORE_TYPE,
  DEFAULT_TOTAL_ITEMS_COUNT,
} from './constants';
import type { LoadMoreType } from './types';

export type LoadMoreContextType<T> = {
  data?: T[];
  error: string | string[] | null;
  firstLoadingDone: boolean;
  isError: boolean;
  isLoading: boolean;
  page: number;
  previousData?: T[];
  totalItemsCount: number;
  totalPages: number;
  type: LoadMoreType;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LoadMoreContext = createContext<LoadMoreContextType<any>>({
  firstLoadingDone: DEFAULT_IS_LOADING,
  error: null,
  isError: false,
  isLoading: false,
  page: DEFAULT_INITIAL_PAGE,
  totalItemsCount: DEFAULT_TOTAL_ITEMS_COUNT,
  totalPages: 0,
  type: DEFAULT_LOAD_MORE_TYPE,
});

export const useLoadMoreContext = () => useContext(LoadMoreContext);
