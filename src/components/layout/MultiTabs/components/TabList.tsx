import { type ReactNode } from 'react';

import { Carousel } from '@/skin/displays';
import { Stack } from '@/skin/layout';
import GradientDivider from '@/skin/layout/MultiTabs/components/GradientDivider';
import styles from '@/skin/layout/MultiTabs/styles.module.scss';

import TabTitle from '../components/TabTitle';
import type { Tab } from '../types';

export type TabListProps = {
  currentTab: Tab;
  onTabChange: (id: string) => void;
  onTabClose: (id: string) => void;
  onTabUnpin: (id: string) => void;
  quickActions?: ReactNode;
  tabs: Tab[];
};

const TabList = ({
  currentTab,
  quickActions,
  onTabChange,
  onTabClose,
  onTabUnpin,
  tabs,
}: TabListProps) => {
  const sortedTabs = tabs
    .sort((a, b) => Number(b.isPinned ?? 0) - Number(a.isPinned ?? 0))
    .sort((a, b) => Number(a.isEditable ?? 0) - Number(b.isEditable ?? 0));

  const renderTab = (tab: Tab) => (
    <TabTitle
      key={tab.id}
      isActive={tab.id === currentTab.id}
      onClick={() => onTabChange(tab.id)}
      onClose={() => onTabClose(tab.id)}
      onUnpin={() => onTabUnpin(tab.id)}
      tab={tab}
    />
  );

  return (
    <Stack className={styles.tabList} flexGrow={1} role="tablist">
      <Stack.Item className={styles.carouselContainer}>
        {sortedTabs.length <= 1 && sortedTabs.map(renderTab)}
        {sortedTabs.length > 1 && (
          <Carousel
            gap={0}
            leftDivider={<GradientDivider toTheRight />}
            rightDivider={<GradientDivider toTheLeft />}
          >
            {sortedTabs.map(renderTab)}
          </Carousel>
        )}
      </Stack.Item>
      {quickActions}
    </Stack>
  );
};

export default TabList;
