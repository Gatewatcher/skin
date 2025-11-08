import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from '@/tests';

import type { NavigatorProps } from '..';
import Navigator from '..';

describe('Navigator', () => {
  const TEST_ID: TestId = 'navigator';

  const user = userEvent.setup();

  const renderComponent = ({
    children,
    ...props
  }: Partial<NavigatorProps> = {}) =>
    renderWithRouter(
      <Navigator data-testid={TEST_ID} {...(props as NavigatorProps)}>
        {children || (
          <>
            <Navigator.SideNav>
              <Navigator.SideNavBody>
                <Navigator.Section>
                  <Navigator.NavItem>Item1</Navigator.NavItem>
                  <Navigator.NavItem>Item2</Navigator.NavItem>
                </Navigator.Section>
                <Navigator.Section>
                  <Navigator.NavItem>Item3</Navigator.NavItem>
                  <Navigator.NavItem>Item4</Navigator.NavItem>
                </Navigator.Section>
              </Navigator.SideNavBody>
            </Navigator.SideNav>

            <Navigator.PanelList>
              <Navigator.PanelGroup>
                <Navigator.Panel>Content1</Navigator.Panel>
                <Navigator.Panel>Content2</Navigator.Panel>
              </Navigator.PanelGroup>
              <Navigator.PanelGroup>
                <Navigator.Panel>Content3</Navigator.Panel>
                <Navigator.Panel>Content4</Navigator.Panel>
              </Navigator.PanelGroup>
            </Navigator.PanelList>
          </>
        )}
      </Navigator>,
    );

  const getNavItems = async () => [
    ...(await screen.findAllByTestId('nav-item')),
    await screen.findByTestId('nav-item-active'),
  ];
  const getPanels = async () => await screen.findAllByTestId('navigator-panel');

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should render four nav items', async () => {
    renderComponent();
    const navItems = await getNavItems();
    expect(navItems).toHaveLength(4);
  });

  it('should render only one panel', async () => {
    renderComponent();
    const panels = await getPanels();
    expect(panels).toHaveLength(1);
    await expectToBeVisibleInTheDocument('Content1', screen.findByText);
  });

  it('should have active className for current nav item', async () => {
    renderComponent();
    const activeTab = await screen.findByTestId('nav-item-active');
    expect(activeTab).toHaveClass('active');
  });

  it('should have default nav item', async () => {
    renderComponent({ defaultSection: 1, defaultNavItem: 1 });
    await expectToBeVisibleInTheDocument('Content4', screen.findByText);
  });

  it('should have disabled tab', async () => {
    renderComponent({
      children: (
        <Navigator.SideNav>
          <Navigator.SideNavBody>
            <Navigator.Section>
              <Navigator.NavItem>Item1</Navigator.NavItem>
              <Navigator.NavItem
                data-testid="nav-item-disabled"
                disabled={true}
              >
                Item2
              </Navigator.NavItem>
            </Navigator.Section>
          </Navigator.SideNavBody>
        </Navigator.SideNav>
      ),
    });
    expect(await screen.findByTestId('nav-item-disabled')).toHaveClass(
      'disabled',
    );
  });

  it('should switch nav item', async () => {
    renderComponent();

    await expectToBeVisibleInTheDocument('Content1', screen.findByText);
    const otherNavItem = await screen.findByText('Item2');
    await user.click(otherNavItem);

    await expectNotToBeVisibleInTheDocument('Content1', screen.queryByText);
    await expectToBeVisibleInTheDocument('Content2', screen.findByText);
  });

  it('should call onNavItemChange', async () => {
    const onNavItemChange = vi.fn();
    renderComponent({ onNavItemChange });

    const otherTab = await screen.findByText('Item4');
    await user.click(otherTab);

    expect(onNavItemChange).toHaveBeenNthCalledWith(1, {
      sectionId: 1,
      navItemId: 1,
    });
  });
});
