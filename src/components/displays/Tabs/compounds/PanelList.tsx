import type { ReactElement } from 'react';

import { useTabContext } from '../context';
import type { TabsPanelProps } from './Panel';

export type TabsPanelListProps = {
  children: ReactElement<TabsPanelProps>[];
};

const TabsPanelList = ({ children }: TabsPanelListProps) => {
  const { currentTab } = useTabContext();

  return (
    <>
      {children.find(
        (item, index) => item.props.id === currentTab || currentTab === index,
      )}
    </>
  );
};

export default TabsPanelList;
