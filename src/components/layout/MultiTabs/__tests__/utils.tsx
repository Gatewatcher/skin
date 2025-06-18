import { generateUniqId } from '@gatewatcher/bistoury/utils-lang';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MultiTabs, { type MultiTabsProps } from '..';
import { useMultiTabs } from '../hooks';
import type { Tab } from '../types';

export const renderComponent = (props?: Partial<MultiTabsProps>) => {
  const renderResult = render(<Example {...props} />);
  const user = userEvent.setup();

  const getAllTabs = () => screen.getAllByRole('tab');
  const getActiveTab = () => screen.getByRole('tab', { selected: true });
  const getAllPanels = () => screen.getAllByTestId('tabpanel');
  const getActivePanel = () => screen.getByRole('tabpanel', { hidden: false });

  const addTab = () =>
    user.click(screen.getByRole('button', { name: 'add tab' }));

  const closeTab = (title: string) => {
    const tab = screen.getByRole('tab', { name: title });
    const closeButton = within(tab).getByRole('button', { name: 'close' });
    return user.click(closeButton);
  };

  const triggerAction = async (name: string) => {
    const openMenuButton = screen.getByRole('button', { name: 'open menu' });
    await user.click(openMenuButton);
    const dropdown = screen.getByRole('tooltip');
    const actionButton = within(dropdown).getByRole('button', { name });
    return await user.click(actionButton);
  };

  const expectToHaveNTabs = (n: number) => expect(getAllTabs().length).toBe(n);
  const expectActivePanelToHaveTitle = (expectedTitle: string) => {
    expect(getActivePanel()).toHaveTextContent(expectedTitle);
  };
  const expectActiveTabToHaveTitle = (expectedTitle: string) => {
    const title = getActiveTab()?.textContent ?? '';
    expect(getActivePanel()).toHaveTextContent(title);
    expect(title).toBe(expectedTitle);
  };

  const expectToHaveNPanels = (n: number) => {
    expect(getAllPanels()).toHaveLength(n);
  };

  return {
    ...renderResult,
    addTab,
    closeTab,
    triggerAction,
    getAllTabs,
    getActiveTab,
    getAllPanels,
    getActivePanel,
    expectToHaveNTabs,
    expectActivePanelToHaveTitle,
    expectActiveTabToHaveTitle,
    expectToHaveNPanels,
  };
};

const Example = (props?: Partial<MultiTabsProps>) => {
  const multiTabs = useMultiTabs(INITIAL_TABS);

  return (
    <MultiTabs
      quickActions={
        <MultiTabs.QuickActions>
          <MultiTabs.AddTabButton
            onClick={() => multiTabs.add(generateNewTab())}
          />
        </MultiTabs.QuickActions>
      }
      {...multiTabs.props}
      {...props}
    >
      {({ title = 'Default title' }) => <div>{title}</div>}
    </MultiTabs>
  );
};

export const INITIAL_TABS: Tab[] = [
  {
    id: '0',
    iconColor: 'blue',
    iconName: 'GridMenu',
    isEditable: false,
  },
  {
    id: '1',
    title: 'Playbook 1',
    iconName: 'ParentChildAlt',
    isEditable: true,
    isPinned: true,
  },
  {
    id: '2',
    title: 'Playbook 2',
    iconName: 'ParentChildAlt',
    iconColor: 'yellow',
    isEditable: true,
  },
  {
    id: '3',
    title: 'Playbook 3 with long name',
    iconName: 'ParentChildAlt',
    iconColor: 'yellow',
    isEditable: true,
  },
];

const generateNewTab = (): Tab => {
  return {
    id: generateUniqId(),
    title: 'Playbook 4',
    iconName: 'Template',
    iconColor: 'green',
    isEditable: true,
  };
};
