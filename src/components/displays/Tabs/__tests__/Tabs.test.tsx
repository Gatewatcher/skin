import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef } from 'react';

import { renderWithRouter } from '@/tests';

import type { TabsProps } from '..';
import Tabs from '..';

describe('Tabs', () => {
  const TEST_ID: TestId = 'tabs';
  const TITLES_LIST_TEST_ID: TestId = 'tabs-title-list';

  const user = userEvent.setup();

  const renderComponent = ({ children, ...props }: Partial<TabsProps> = {}) =>
    renderWithRouter(
      <Tabs data-testid={TEST_ID} {...props}>
        {children || (
          <>
            <Tabs.TitleList data-testid={TITLES_LIST_TEST_ID}>
              <Tabs.Title icon="Add">Tab1</Tabs.Title>
              <Tabs.Title icon="BurgerMenu">Tab2</Tabs.Title>
            </Tabs.TitleList>

            <Tabs.PanelList>
              <Tabs.Panel>Content1</Tabs.Panel>
              <Tabs.Panel>Content2</Tabs.Panel>
            </Tabs.PanelList>
          </>
        )}
      </Tabs>,
    );

  const getTabs = async () => [
    ...(await screen.findAllByTestId('tabs-title')),
    await screen.findByTestId('tabs-title-active'),
  ];
  const getPanels = async () => await screen.findAllByTestId('tabs-panel');

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should render tabs in ul', async () => {
    renderComponent();
    const list = await screen.findByTestId(TITLES_LIST_TEST_ID);
    expect(list.tagName).toBe('UL');
  });

  it('should render two tabs as li element', async () => {
    renderComponent();
    const tabs = await getTabs();
    expect(tabs).toHaveLength(2);
    expect(tabs[0].parentElement?.tagName).toBe('LI');
  });

  it('should render only one tab panel', async () => {
    renderComponent();
    const panels = await getPanels();
    expect(panels).toHaveLength(1);
    await expectToBeVisibleInTheDocument('Content1', screen.findByText);
  });

  it('should have active className for current tab title', async () => {
    renderComponent();
    const activeTab = await screen.findByTestId('tabs-title-active');
    expect(activeTab).toHaveClass('active');
  });

  it('should have default tab', async () => {
    renderComponent({ defaultTab: 1 });
    await expectToBeVisibleInTheDocument('Content2', screen.findByText);
  });

  it('should have disabled tab', async () => {
    renderComponent({
      children: (
        <>
          <Tabs.TitleList data-testid={TITLES_LIST_TEST_ID}>
            <Tabs.Title icon="Add">Tab1</Tabs.Title>
            <Tabs.Title icon="BurgerMenu" disabled>
              Tab2
            </Tabs.Title>
          </Tabs.TitleList>

          <Tabs.PanelList>
            <Tabs.Panel>Content1</Tabs.Panel>
            <Tabs.Panel>Content2</Tabs.Panel>
          </Tabs.PanelList>
        </>
      ),
    });
    expect(await screen.findByTestId('tabs-title')).toHaveClass('disabled');
  });

  it('should switch tab', async () => {
    renderComponent();

    await expectToBeVisibleInTheDocument('Content1', screen.findByText);
    const otherTab = await screen.findByTestId('tabs-title');
    await user.click(otherTab);

    await expectNotToBeVisibleInTheDocument('Content1', screen.queryByText);
    await expectToBeVisibleInTheDocument('Content2', screen.findByText);
  });

  it('should call onTabChange', async () => {
    const onTabChange = vi.fn();
    renderComponent({ onTabChange });

    const otherTab = await screen.findByTestId('tabs-title');
    await user.click(otherTab);

    expect(onTabChange).toHaveBeenNthCalledWith(1, 1);
  });

  let idCounter = 1;

  const TestComponent = (props: Omit<TabsProps, 'children'>) => {
    const id = useRef(idCounter++);

    return (
      <>
        <Tabs {...props}>
          <Tabs.TitleList>
            <Tabs.Title icon="Add">Tab1</Tabs.Title>
            <Tabs.Title icon="BurgerMenu">Tab2</Tabs.Title>
          </Tabs.TitleList>
        </Tabs>
        <span data-testid="instance-id">{id.current}</span>
      </>
    );
  };

  it('should be controllable', async () => {
    const onTabChange = vi.fn();

    const { rerender } = render(
      <TestComponent currentTab={1} onTabChange={onTabChange} />,
    );

    let activeTabTitle = screen.getByTestId('tabs-title-active');
    let otherTab = screen.getByTestId('tabs-title');

    expect(activeTabTitle).toHaveTextContent('Tab2');

    await user.click(otherTab);

    expect(onTabChange).toHaveBeenNthCalledWith(1, 0);

    rerender(<TestComponent currentTab={0} onTabChange={onTabChange} />);

    activeTabTitle = screen.getByTestId('tabs-title-active');
    otherTab = screen.getByTestId('tabs-title');

    expect(activeTabTitle).toHaveTextContent('Tab1');

    await user.click(otherTab);

    expect(onTabChange).toHaveBeenNthCalledWith(2, 1);

    expect(screen.getByTestId('instance-id')).toHaveTextContent('1');
  });

  it('should have full className with secondary variant', async () => {
    renderComponent({
      children: (
        <>
          <Tabs.TitleList variant="secondary" full>
            <Tabs.Title icon="Add">title 1</Tabs.Title>
            <Tabs.Title icon="Add">title 2</Tabs.Title>
          </Tabs.TitleList>
        </>
      ),
    });

    const list = await screen.findByTestId('tabs-title-list');
    expect(list).toHaveClass('full');
  });
});
