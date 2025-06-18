import type { Ref } from 'react';
import { useEffect, useRef } from 'react';

import type { UseOnScreenOptions } from './useOnScreen';
import { useOnScreen } from './useOnScreen';

export type UseInfiniteScroll = Omit<
  UseOnScreenOptions,
  'root' | 'selector'
> & {
  hasNextPage: boolean;
  isLoading?: boolean;
  onLoadMore: () => void;
  delay?: number;
};

export type UseInfiniteScrollReturn = [Ref<HTMLElement>];

const DEFAULT_DELAY = 100;

export const useInfiniteScroll = ({
  hasNextPage,
  isLoading,
  onLoadMore,
  delay = DEFAULT_DELAY,
  ...intersectionObserverOptions
}: UseInfiniteScroll): UseInfiniteScrollReturn => {
  const ref = useRef(null);

  const isOnScreen = useOnScreen(ref, intersectionObserverOptions);

  const shouldLoadMore = hasNextPage && !isLoading && isOnScreen;

  useEffect(() => {
    if (shouldLoadMore) {
      const chrono = setTimeout(onLoadMore, delay);
      return () => clearTimeout(chrono);
    }
  }, [shouldLoadMore, onLoadMore, delay]);

  return [ref];
};
