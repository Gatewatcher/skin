import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { CSSProperties, ReactNode } from 'react';

import { Stack } from '@/skin/layout';

import DropdownActions from './components/DropdownActions';
import Panel from './components/Panel';
import TabList from './components/TabList';
import Toolbar from './components/Toolbar';
import { AddTabButton } from './compounds/AddTabButton';
import { QuickActions } from './compounds/QuickActions';
import { Toolbar as ToolbarCompound } from './compounds/Toolbar';
import type { Tab } from './types';

import styles from './styles.module.scss';

export type TabsSetterFunction = (tabs: Tab[]) => Tab[];

export type MultiTabsProps = {
  children: (tab: Tab) => ReactNode;
  containerClassName?: string;
  containerStyle?: CSSProperties;
  currentTabId?: string;
  customDropdownActions?: ReactNode;
  dropdownEnabled?: boolean;
  keepAllPanelsMounted?: boolean;
  onSelectTab: (id?: string) => void;
  onTabsChange: (tabs: Tab[] | TabsSetterFunction) => void;
  panelClassName?: string;
  panelStyle?: CSSProperties;
  placeholder?: ReactNode;
  quickActions?: ReactNode;
  tabs: Tab[];
  toolbar?: ReactNode;
  withBorderBottom?: boolean;
};

const MultiTabs = ({
  children,
  containerClassName,
  containerStyle,
  currentTabId,
  customDropdownActions,
  dropdownEnabled,
  keepAllPanelsMounted,
  onSelectTab,
  onTabsChange,
  panelClassName,
  panelStyle,
  placeholder,
  quickActions,
  tabs,
  toolbar,
  withBorderBottom,
}: MultiTabsProps) => {
  const currentTab = tabs.find(tab => tab.id === currentTabId);

  const closeTab = (id: string) => {
    if (id === currentTabId) {
      const index = tabs.findIndex(tab => tab.id === currentTabId);
      const nextTab = tabs.at(index + 1) ?? tabs.at(index - 1);
      onSelectTab?.(nextTab?.id);
    }
    onTabsChange(tabs => tabs.filter(tab => tab.id !== id));
  };

  if (!tabs.length || !currentTab) {
    return placeholder;
  }

  const closeCurrentTab = () => {
    if (currentTab?.id) {
      closeTab(currentTab.id);
    }
  };

  const closeOtherTabs = () => {
    onTabsChange(tabs =>
      tabs.filter(
        tab => tab.id === currentTab?.id || !tab.isEditable || tab.isPinned,
      ),
    );
  };

  const closeAllTabs = () => {
    onTabsChange(tabs => tabs.filter(tab => !tab.isEditable));
    if (currentTab?.isEditable) {
      const frozenTabs = tabs.filter(tab => !tab.isEditable);
      const nextTab = frozenTabs.at(-1);
      onSelectTab?.(nextTab?.id);
    }
  };

  const unpinTab = (id: string) => {
    onTabsChange(
      tabs.map(tab => (tab.id === id ? { ...tab, isPinned: false } : tab)),
    );
  };

  const closeAllButPinned = () => {
    onTabsChange(tabs => tabs.filter(tab => tab.isPinned || !tab.isEditable));
    if (!currentTab?.isPinned) {
      const nextTab = tabs.findLast(tab => tab.isPinned);
      onSelectTab?.(nextTab?.id);
    }
  };

  const closeOrUnpinCurrentTab = () => {
    onTabsChange(tabs => {
      return tabs.map(tab => {
        if (tab.id === currentTab?.id) {
          return {
            ...tab,
            isPinned: !currentTab.isPinned,
          };
        }
        return tab;
      });
    });
  };

  const mountedTabs = keepAllPanelsMounted
    ? tabs
    : tabs.filter(tab => tab.id === currentTabId);

  return (
    <div
      className={classNames(styles.multiTabsContainer, containerClassName)}
      style={containerStyle}
    >
      <Stack
        className={classNames(
          styles.multiTabHeader,
          withBorderBottom && styles.withBorderBottom,
        )}
      >
        <TabList
          currentTab={currentTab}
          onTabChange={onSelectTab}
          onTabClose={closeTab}
          onTabUnpin={unpinTab}
          quickActions={quickActions}
          tabs={tabs}
        />
        <Toolbar
          dropdownActions={
            <DropdownActions
              currentTab={currentTab}
              onClose={closeCurrentTab}
              onCloseAll={closeAllTabs}
              onCloseAllButPinned={closeAllButPinned}
              onCloseOrUnpin={closeOrUnpinCurrentTab}
              onCloseOther={closeOtherTabs}
              tabs={tabs}
              userActions={customDropdownActions}
            />
          }
          dropdownEnabled={!!dropdownEnabled}
          toolbar={toolbar}
        />
      </Stack>
      {mountedTabs.map(tab => (
        <Panel
          key={tab.id}
          className={panelClassName}
          isActive={tab.id === currentTabId}
          style={panelStyle}
        >
          {children(tab)}
        </Panel>
      ))}
    </div>
  );
};

MultiTabs.QuickActions = QuickActions;
MultiTabs.AddTabButton = AddTabButton;
MultiTabs.Toolbar = ToolbarCompound;

export default MultiTabs;
