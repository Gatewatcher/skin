import { screen } from '@testing-library/react';

import { INITIAL_TABS, renderComponent } from './utils';

describe('MultiTabs', () => {
  it('should contain initial tabs', async () => {
    const { expectToHaveNTabs } = renderComponent();
    expectToHaveNTabs(INITIAL_TABS.length);
  });

  it('should select the last tab by default', async () => {
    const { expectActiveTabToHaveTitle } = renderComponent();
    expectActiveTabToHaveTitle(INITIAL_TABS.at(-1)?.title ?? '');
  });

  it('should create a new tab and automatically select it', async () => {
    const { addTab, expectToHaveNTabs, expectActiveTabToHaveTitle } =
      renderComponent();
    await addTab();
    expectToHaveNTabs(INITIAL_TABS.length + 1);
    expectActiveTabToHaveTitle('Playbook 4');
  });

  it('should close a tab', async () => {
    const { closeTab, expectToHaveNTabs, expectActiveTabToHaveTitle } =
      renderComponent();
    await closeTab('Playbook 3 with long name');
    expectToHaveNTabs(INITIAL_TABS.length - 1);
    expectActiveTabToHaveTitle('Playbook 2');
  });

  it('should close a tab using the dropdown menu', async () => {
    const { expectToHaveNTabs, expectActiveTabToHaveTitle, triggerAction } =
      renderComponent({ dropdownEnabled: true });
    await triggerAction('Close');
    expectToHaveNTabs(INITIAL_TABS.length - 1);
    expectActiveTabToHaveTitle('Playbook 2');
  });

  it('should other tabs using the dropdown menu', async () => {
    const { expectToHaveNTabs, expectActiveTabToHaveTitle, triggerAction } =
      renderComponent({ dropdownEnabled: true });
    await triggerAction('Close other tabs');
    expectToHaveNTabs(3);
    expectActiveTabToHaveTitle('Playbook 3 with long name');
  });

  it('should close all but pinned tabs using the dropdown menu', async () => {
    const { expectToHaveNTabs, expectActiveTabToHaveTitle, triggerAction } =
      renderComponent({ dropdownEnabled: true });
    await triggerAction('Close all but pinned');
    expectToHaveNTabs(2);
    expectActiveTabToHaveTitle('Playbook 1');
  });

  it('should close all tabs using the dropdown menu', async () => {
    const { expectToHaveNTabs, expectActivePanelToHaveTitle, triggerAction } =
      renderComponent({ dropdownEnabled: true });
    await triggerAction('Close all');
    expectToHaveNTabs(1);
    expectActivePanelToHaveTitle('Default title');
  });

  it('should hidde inactive panels', async () => {
    const { expectToHaveNPanels, getAllPanels } = renderComponent({
      keepAllPanelsMounted: true,
    });
    expectToHaveNPanels(4);
    expect(getAllPanels().filter(panel => panel.hidden)).toHaveLength(3);
  });

  it('should unmount inactive panels by default', async () => {
    const { expectToHaveNPanels } = renderComponent();
    expectToHaveNPanels(1);
  });

  it('should display a status message', async () => {
    renderComponent({ toolbar: 'Hello MultiTabs!' });
    expect(screen.getByText('Hello MultiTabs!')).toBeVisible();
  });
});
