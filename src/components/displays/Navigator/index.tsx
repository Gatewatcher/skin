import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';
import { useState } from 'react';

import { Stack } from '@/skin/layout';

import NavItem from './compounds/NavItem';
import NavigatorOutlet from './compounds/Outlet';
import NavigatorPanel from './compounds/Panel';
import NavigatorPanelGroup from './compounds/PanelGroup';
import NavigatorPanelList from './compounds/PanelList';
import Section from './compounds/Section';
import SideNav from './compounds/SideNav';
import SideNavBody from './compounds/SideNavBody';
import SideNavFooter from './compounds/SideNavFooter';
import {
  DEFAULT_NAV_ITEM,
  DEFAULT_ON_NAV_ITEM_CHANGE,
  DEFAULT_SECTION,
} from './constants';
import type { NavigatorContextType } from './context';
import { NavigatorContext } from './context';
import type { CurrentActiveItem, DefaultActiveItem, NavId } from './types';

import styles from './styles.module.scss';

export type NavigatorProps = DataTestId &
  DefaultActiveItem &
  CurrentActiveItem & {
    children: ReactNode;
    onNavItemChange?: NavigatorContextType['onNavItemChange'];
  };

const Navigator = ({
  children,
  'data-testid': testId = 'tabs',
  defaultSection = DEFAULT_SECTION,
  defaultNavItem = DEFAULT_NAV_ITEM,
  onNavItemChange = DEFAULT_ON_NAV_ITEM_CHANGE,
  ...props
}: NavigatorProps) => {
  const [currentSection, setCurrentSection] = useState<NavId>(defaultSection);
  const [currentNavItem, setCurrentNavItem] = useState<NavId>(defaultNavItem);

  const contextValue: NavigatorContextType = {
    currentSection: props.currentSection ?? currentSection,
    currentNavItem: props.currentNavItem ?? currentNavItem,
    onNavItemChange,
    setCurrentSection,
    setCurrentNavItem,
  };

  return (
    <NavigatorContext.Provider value={contextValue}>
      <Stack className={styles.ContextNav} data-testid={testId}>
        {children}
      </Stack>
    </NavigatorContext.Provider>
  );
};

Navigator.SideNav = SideNav;
Navigator.SideNavBody = SideNavBody;
Navigator.SideNavFooter = SideNavFooter;
Navigator.Section = Section;
Navigator.NavItem = NavItem;

Navigator.PanelList = NavigatorPanelList;
Navigator.PanelGroup = NavigatorPanelGroup;
Navigator.Panel = NavigatorPanel;

Navigator.Outlet = NavigatorOutlet;

export default Navigator;
