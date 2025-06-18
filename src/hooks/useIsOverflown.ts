import {
  useOnElementResize,
  useOnWindowResize,
} from '@gatewatcher/bistoury/hooks';
import type { RefObject } from 'react';
import { useEffect, useState } from 'react';

export type UseIsOverflownOptions = {
  direction?: 'horizontal' | 'vertical';
  withWatchScreenResize?: boolean;
};

const DEFAULT_OPTIONS: UseIsOverflownOptions = {
  direction: 'horizontal',
  withWatchScreenResize: true,
};

export const useIsOverflown = (
  ref: RefObject<HTMLElement>,
  options?: UseIsOverflownOptions,
) => {
  const [isOverflown, setIsOverflown] = useState(false);
  const { direction, withWatchScreenResize } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  useOnElementResize(ref, () => {
    const element = ref.current;
    if (element && direction === 'horizontal') {
      setIsOverflown(element?.scrollWidth > element?.clientWidth);
    }
  });

  useOnWindowResize(() => {
    const element = ref.current;
    if (withWatchScreenResize && element && direction === 'horizontal') {
      setIsOverflown(element?.scrollWidth > element?.clientWidth);
    }

    if (withWatchScreenResize && element && direction === 'vertical') {
      setIsOverflown(element.scrollHeight > element.clientHeight);
    }
  });

  useEffect(() => {
    const element = ref.current;
    if (element && direction === 'horizontal') {
      setIsOverflown(element?.scrollWidth > element?.clientWidth);
    }

    if (element && direction === 'vertical') {
      setIsOverflown(element.scrollHeight > element.clientHeight);
    }
  }, [ref, direction]);

  return isOverflown;
};
