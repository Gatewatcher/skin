import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { MemoryRouterProps } from 'react-router-dom';

import { renderWithRouter } from '@/tests';

import type { NavigationItemProps } from '..';
import NavigationItem from '..';

describe('NavigationItem', () => {
  const renderComponent = (
    { children, ...props }: Partial<NavigationItemProps> = {},
    router: MemoryRouterProps = {},
  ) =>
    renderWithRouter(
      <NavigationItem
        content={
          <NavigationItem.Grid>
            <NavigationItem.Group>
              <NavigationItem.Header color="green" icon="Add">
                header
              </NavigationItem.Header>
              <NavigationItem.Links>
                <NavigationItem.Link to="/link1">Link 1</NavigationItem.Link>
                <NavigationItem.Link to="/link2">Link 2</NavigationItem.Link>
              </NavigationItem.Links>
            </NavigationItem.Group>
          </NavigationItem.Grid>
        }
        {...props}
      >
        {children || (
          <NavigationItem.Trigger icon="Add">trigger</NavigationItem.Trigger>
        )}
      </NavigationItem>,
      router,
    );

  const user = userEvent.setup();

  const trigger = async () => {
    const trigger = await screen.findByTestId('navigation-item-trigger');
    await user.click(trigger);
  };

  const getFloatingContent = async () =>
    screen.findByTestId('navigation-item-content');

  it('should render', async () => {
    renderComponent();
    await trigger();

    await expectToBeVisibleInTheDocument('navigation-item-content');
  });

  it('should have icon', async () => {
    renderComponent();
    await trigger();

    const floatingContent = await getFloatingContent();

    const icon = floatingContent.querySelector(
      '[data-testid="icon-contained"]',
    );

    await waitFor(() => {
      expect(icon).toBeVisible();
    });
  });

  it('should have header title', async () => {
    renderComponent();
    await trigger();

    await waitFor(async () => {
      await expectToBeVisibleInTheDocument('header', screen.findByText);
    });
  });

  it('should have links', async () => {
    renderComponent();
    await trigger();

    const links = await screen.findAllByRole('link');
    expect(links.length).toBe(2);
  });

  it('should close on link click', async () => {
    renderComponent();
    await trigger();

    const links = await screen.findAllByRole('link');

    await user.click(links[0]);

    await waitFor(async () => {
      await expectNotToBeVisibleInTheDocument('navigation-item-content');
    });
  });

  it('should have active link', async () => {
    renderComponent({}, { initialEntries: ['/link1'] });
    await trigger();
    const link = await screen.findByText('Link 1');
    expect(link).toHaveClass('LinkActive');
  });

  it('should have custom padding', async () => {
    renderComponent({ padding: 10 });
    await trigger();
    const dropdownContent = await screen.findByTestId(
      'navigation-item-content',
    );

    expect(dropdownContent).toHaveClass('NavigationItemResetPadding');
  });
});
