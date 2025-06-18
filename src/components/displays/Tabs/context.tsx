import type { Dispatch, SetStateAction } from 'react';
import { createContext, useContext } from 'react';

import type { TabId } from './types';

export type TabTitleRects = Record<number, DOMRect> | null;

export type TabsContextType = {
  currentTab: number;
  tabTitleRects: TabTitleRects;
  onTabChange: (id: TabId) => void;
  setCurrentTab: (tab: TabId) => void;
  setTabTitleRects: Dispatch<SetStateAction<TabTitleRects>>;
};

export const TabsContext = createContext<TabsContextType>({
  currentTab: 0,
  tabTitleRects: null,
  onTabChange: () => {},
  setCurrentTab: () => {},
  setTabTitleRects: () => {},
});

export const useTabContext = () => useContext(TabsContext);
