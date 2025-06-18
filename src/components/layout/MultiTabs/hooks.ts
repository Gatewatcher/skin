import { isFunction } from '@gatewatcher/bistoury/utils-lang';
import { useState } from 'react';

import type { MultiTabsProps } from '.';
import type { Tab } from './types';

export type TabOrFactory = Tab | ((tabs: Tab[]) => Tab);

export type UseMultiTabsReturn = {
  add: (tab: TabOrFactory) => void;
  props: Pick<
    MultiTabsProps,
    'currentTabId' | 'onSelectTab' | 'onTabsChange' | 'tabs'
  >;
};

export type UseMultiTabsOptions = {
  newTabsPosition?: 'afterCurrent' | 'end';
  onSelectTab?: (id?: string) => void;
};

export const useMultiTabs = (
  initialTabs: Tab[],
  { newTabsPosition = 'end', onSelectTab }: UseMultiTabsOptions = {},
): UseMultiTabsReturn => {
  const [tabs, setTabs] = useState(initialTabs);
  const [currentTabId, setCurrentTabId] = useState(tabs.at(-1)?.id);

  const handleSelectTab = (id?: string) => {
    if (id !== currentTabId) {
      setCurrentTabId(id);
      onSelectTab?.(id);
    }
  };

  const createNewTab = (tab: TabOrFactory) => {
    const newTab = isFunction(tab) ? tab(tabs) : tab;
    setTabs(tabs => {
      const currentTabIndex = tabs.findIndex(tab => tab.id === currentTabId);
      const tabIsAlreadyOpened = tabs.find(tab => tab.id === newTab.id);

      if (tabIsAlreadyOpened) {
        return tabs;
      }
      if (newTabsPosition === 'afterCurrent') {
        return tabs.toSpliced(currentTabIndex + 1, 0, newTab);
      }
      if (newTabsPosition === 'end') {
        return [...tabs, newTab];
      }
      return tabs;
    });
    handleSelectTab(newTab.id);
  };

  return {
    add: createNewTab,
    props: {
      currentTabId,
      onSelectTab: handleSelectTab,
      onTabsChange: setTabs,
      tabs,
    },
  };
};
