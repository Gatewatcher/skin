import type { XOR } from '@gatewatcher/bistoury/utils-types';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { useCallback, useState } from 'react';

import { DRAWER_CLOSE_EVERYWHERE } from '@/skin/displays/Drawer/constants';

import { useDrawerContext } from '../context';
import { getContent } from '../utils';

export type UseDrawerOptions<T> = XOR<
  { keepOn: RegExp },
  { closeOn: RegExp }
> & {
  encode?: (id: string, props: T) => void;
  clean?: () => void;
};

export type UseDrawerReturn<T> = {
  close: () => void;
  data?: T;
  isOpened: boolean;
  open: (props: T) => void;
};

/**
 * @deprecated Prefer using `useDrawerV2` and `useCurrentDrawer`.
 *
 * Will be removed 01/05/2025.
 */
export function useDrawer<T = void>(
  id: string,
  options: UseDrawerOptions<T> = { closeOn: DRAWER_CLOSE_EVERYWHERE },
): UseDrawerReturn<T> {
  const { encode, clean, ...persistence } = options;
  const {
    id: contextId,
    open: openDrawer,
    close,
    isOpened,
    matches,
    setContentRef,
    setCurrentPropsRef,
    setId,
    setPersistence,
  } = useDrawerContext();

  const [currentProps, setCurrentProps] = useState<T>();

  setCurrentPropsRef.current = setCurrentProps as Dispatch<
    SetStateAction<unknown>
  >;

  const setContent = useCallback(
    (content: ReactNode) => {
      setContentRef.current(content);
    },
    [setContentRef],
  );

  const open = (props: T) => {
    const content = getContent(matches.current, id, props);

    setCurrentProps(props);
    setContent(content);
    setPersistence({
      clean,
      encode: encode as UseDrawerOptions<unknown>['encode'],
      ...persistence,
    });
    openDrawer(props);
    setId(id);
    encode?.(id, props);
  };

  return {
    close,
    data: currentProps,
    open,
    isOpened: isOpened && contextId === id,
  };
}
