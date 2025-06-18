import { get } from '@gatewatcher/bistoury/utils-web-storage';
import type { ReactNode } from 'react';
import { useMemo, useRef, useState } from 'react';

import {
  DEFAULT_DRAWER_METHOD_REF,
  DEFAULT_WITH_ESCAPE,
  DRAWER_CLOSE_EVERYWHERE,
  IS_INITIAL_OPENED,
  STORAGE_KEY,
} from './constants';
import type { DrawerContextType } from './context';
import { DrawerContext } from './context';
import type { DrawerMatches } from './types';

export type DrawerProviderProps = {
  children: ReactNode;
  topNavHeight?: string;
  withTopNav?: boolean;
};

const DrawerProvider = ({
  children,
  topNavHeight = 'var(--navbar-height)',
  withTopNav = true,
}: DrawerProviderProps) => {
  const [isOpened, setIsOpened] = useState(
    get(STORAGE_KEY) ?? IS_INITIAL_OPENED,
  );
  const [offsetTop, setOffsetTop] = useState(0);
  const [persistence, setPersistence] = useState<
    DrawerContextType['persistence']
  >({
    closeOn: DRAWER_CLOSE_EVERYWHERE,
  });
  const setContentRef = useRef(DEFAULT_DRAWER_METHOD_REF);
  const setMaxSizeRef = useRef(DEFAULT_DRAWER_METHOD_REF);
  const setMaximizeRef = useRef(DEFAULT_DRAWER_METHOD_REF);
  const setCurrentPropsRef = useRef(DEFAULT_DRAWER_METHOD_REF);
  const resizeRef = useRef(DEFAULT_DRAWER_METHOD_REF);
  const withEscape = useRef(DEFAULT_WITH_ESCAPE);

  const [id, setId] = useState<string | null>(null);

  const matchesRef = useRef<DrawerMatches>({});

  const value: DrawerContextType = useMemo(
    () => ({
      id,
      isOpened,
      open: () => setIsOpened(true),
      close: () => setIsOpened(false),
      offsetTop,
      matches: matchesRef,
      setContentRef,
      setMaxSizeRef,
      setMaximizeRef,
      setOffsetTop,
      resizeRef,
      withEscape,
      persistence,
      setId,
      setPersistence,
      setCurrentPropsRef,
      topNavHeight,
      withTopNav,
    }),
    [isOpened, offsetTop, persistence, id, setId, topNavHeight, withTopNav],
  );

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
};

export default DrawerProvider;
