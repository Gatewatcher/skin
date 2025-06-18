import { Children, type ReactNode, isValidElement } from 'react';

import { Divider, Dropdown } from '@/skin/displays';

import type { Tab } from '../types';
import { interleaveArrayElements } from '../utils';

export type DropdownActionsProps = {
  currentTab: Tab;
  onClose: () => void;
  onCloseAll: () => void;
  onCloseAllButPinned: () => void;
  onCloseOrUnpin: () => void;
  onCloseOther: () => void;
  tabs: Tab[];
  userActions: ReactNode;
};

const DropdownActions = ({
  currentTab,
  onClose,
  onCloseAll,
  onCloseAllButPinned,
  onCloseOrUnpin,
  onCloseOther,
  tabs,
  userActions,
}: DropdownActionsProps) => {
  const thereIsOtherCloseableTabs = tabs.some(
    tab => tab.id !== currentTab.id && tab.isEditable && !tab.isPinned,
  );

  const closeActions: ReactNode = [
    currentTab?.isEditable && (
      <Dropdown.Button key="close" icon="Close" onClick={onClose} size="small">
        Close
      </Dropdown.Button>
    ),
    thereIsOtherCloseableTabs && (
      <Dropdown.Button
        key="closeOther"
        icon="Close"
        onClick={onCloseOther}
        size="small"
      >
        Close other tabs
      </Dropdown.Button>
    ),
    tabs.some(tab => tab.isEditable) && (
      <Dropdown.Button
        key="closeAll"
        icon="Close"
        onClick={onCloseAll}
        size="small"
      >
        Close all
      </Dropdown.Button>
    ),
    tabs.some(tab => tab.isEditable && !tab.isPinned) &&
      tabs.some(tab => tab.isEditable && tab.isPinned) && (
        <Dropdown.Button
          key="closeUnpined"
          icon="Close"
          onClick={onCloseAllButPinned}
          size="small"
        >
          Close all but pinned
        </Dropdown.Button>
      ),
  ].filter(isValidElement);

  const pinAction = !!currentTab?.isEditable && (
    <Dropdown.Button
      key="pin"
      icon={currentTab.isPinned ? 'Unpin' : 'Pin'}
      onClick={onCloseOrUnpin}
      size="small"
    >
      {currentTab.isPinned ? 'Unpin' : 'Pin'} current tab
    </Dropdown.Button>
  );

  const customActions = Array.isArray(userActions)
    ? interleaveArrayElements(userActions, index => (
        <Divider key={`0-${index}`} />
      ))
    : Children.toArray(userActions);

  const actions = [closeActions, pinAction, customActions].filter(
    isValidActionGroup,
  );

  return (
    <>
      {interleaveArrayElements(actions, index => (
        <Divider key={index} />
      ))}
    </>
  );
};

const isValidActionGroup = (item: ReactNode) => {
  return isValidElement(item) || (Array.isArray(item) && item.length > 0);
};

export default DropdownActions;
