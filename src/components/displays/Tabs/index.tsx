import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';
import { useState } from 'react';

import TabsOutlet from './compounds/Outlet';
import TabsPanel from './compounds/Panel';
import TabsPanelList from './compounds/PanelList';
import TabsTitle from './compounds/Title';
import TabsTitleList from './compounds/TitleList';
import { DEFAULT_ON_TAB_CHANGE, DEFAULT_TAB } from './constants';
import type { TabTitleRects, TabsContextType } from './context';
import { TabsContext } from './context';
import type { TabId } from './types';

import styles from './styles.module.scss';

export type TabsProps = DataTestId & {
  children: ReactNode;
  currentTab?: TabId;
  defaultTab?: TabId;
  onTabChange?: TabsContextType['onTabChange'];
};

const Tabs = ({
  children,
  'data-testid': testId = 'tabs',
  defaultTab = DEFAULT_TAB,
  onTabChange = DEFAULT_ON_TAB_CHANGE,
  ...props
}: TabsProps) => {
  const [currentTab, setCurrentTab] = useState<TabId>(defaultTab);
  const [tabTitleRects, setTabTitleRects] = useState<TabTitleRects>(null);

  const contextValue: TabsContextType = {
    currentTab: props.currentTab ?? currentTab,
    tabTitleRects,
    onTabChange,
    setCurrentTab,
    setTabTitleRects,
  };

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={styles.tabs} data-testid={testId}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

Tabs.Outlet = TabsOutlet;
Tabs.Panel = TabsPanel;
Tabs.PanelList = TabsPanelList;
Tabs.Title = TabsTitle;
Tabs.TitleList = TabsTitleList;

export default Tabs;
