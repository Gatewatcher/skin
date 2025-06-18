import type {
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
} from 'react';
import { createContext, useContext } from 'react';

import {
  DEFAULT_DRAWER_METHOD_REF,
  DEFAULT_WITH_ESCAPE,
  DRAWER_CLOSE_EVERYWHERE,
} from './constants';
import type { UseDrawerOptions } from './hooks/useDrawer';
import type { DrawerMatches } from './types';

export type DrawerContextType = {
  id: string | null;
  isOpened: boolean;
  offsetTop: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  open: (props?: any) => void;
  close: () => void;
  matches: MutableRefObject<DrawerMatches>;
  setOffsetTop: (offsetTop: number) => void;
  setContentRef: { current: Dispatch<SetStateAction<ReactNode>> };
  setMaxSizeRef: { current: Dispatch<SetStateAction<number | undefined>> };
  setMaximizeRef: { current: Dispatch<SetStateAction<boolean>> };
  setCurrentPropsRef: { current: Dispatch<SetStateAction<unknown>> };
  withEscape: MutableRefObject<boolean>;
  resizeRef: { current: ((percentage: number) => void) | undefined };
  persistence: UseDrawerOptions<unknown>;
  setId: (id: string) => void;
  setPersistence: (persistence: DrawerContextType['persistence']) => void;
  topNavHeight?: string;
  withTopNav?: boolean;
};

export const DrawerContext = createContext<DrawerContextType>({
  id: null,
  isOpened: false,
  offsetTop: 0,
  open: () => {},
  close: () => {},
  setOffsetTop: () => {},
  matches: { current: {} },
  setContentRef: { current: DEFAULT_DRAWER_METHOD_REF },
  setMaxSizeRef: { current: DEFAULT_DRAWER_METHOD_REF },
  setMaximizeRef: { current: DEFAULT_DRAWER_METHOD_REF },
  setCurrentPropsRef: { current: DEFAULT_DRAWER_METHOD_REF },
  withEscape: { current: DEFAULT_WITH_ESCAPE },
  resizeRef: { current: DEFAULT_DRAWER_METHOD_REF },
  persistence: {
    closeOn: DRAWER_CLOSE_EVERYWHERE,
  },
  setId: () => {},
  setPersistence: () => {},
});

export const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('Drawer component must be used inside DrawerProvider.');
  }
  return context;
};
