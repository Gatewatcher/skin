import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { DropdownProps } from '..';
import Dropdown from '..';

describe('Dropdown', () => {
  const renderComponent = ({
    children = <div>children</div>,
    ...props
  }: Partial<DropdownProps> = {}) =>
    render(
      <Dropdown content="content" {...props}>
        {children}
      </Dropdown>,
    );

  const user = userEvent.setup();

  const trigger = async () => {
    const trigger = await screen.findByTestId('floating-trigger');
    await user.click(trigger);
  };

  const getFloating = async () => await screen.findByTestId('floating-content');

  it('should render', async () => {
    renderComponent();
    await trigger();

    await waitFor(async () => {
      await expectToBeVisibleInTheDocument('floating-content');
    });
  });

  it('should have extra className', async () => {
    renderComponent({ className: 'extra' });
    await trigger();

    await waitFor(async () => {
      expect(await getFloating()).toHaveClass('extra');
    });
  });

  it('should not close dropdown after action click', async () => {
    renderComponent({
      children: (
        <Dropdown.Button data-testid="item" withCloseOnAction={false}>
          Item
        </Dropdown.Button>
      ),
    });

    await trigger();
    await waitFor(async () => {
      const item = await screen.findByTestId('item');
      await user.click(item);
      await expectToBeVisibleInTheDocument('floating-content');
    });
  });

  it('should render link', async () => {
    renderComponent({
      content: (
        <Dropdown.Link data-testid="item" to="https://www.google.com">
          item
        </Dropdown.Link>
      ),
    });

    await trigger();

    await waitFor(async () => {
      const item = await screen.findByTestId('item');
      expect(item.tagName).toBe('A');
      expect(item).toHaveAttribute('href', 'https://www.google.com');
    });
  });

  it('should have elevation', async () => {
    renderComponent({ elevation: 3 });
    await trigger();

    expect(await getFloating()).toHaveClass('Elevation3');
    expect(await getFloating()).not.toHaveClass('DropdownBordered');
  });

  it('should have elevation and border', async () => {
    renderComponent({ elevation: 3, withBorder: true });

    await trigger();

    expect(await getFloating()).toHaveClass('Elevation3');
    expect(await getFloating()).toHaveClass('DropdownBordered');
  });

  describe('group', () => {
    it('should render item in group', async () => {
      renderComponent({
        content: (
          <Dropdown.Group data-testid="group">
            <Dropdown.Button>Item 1</Dropdown.Button>
          </Dropdown.Group>
        ),
      });

      await trigger();

      await waitFor(async () => {
        await expectToBeVisibleInTheDocument('group');
        const group = await screen.findByTestId('group');
        expect(group.tagName).toBe('DIV');
        expect(group.childElementCount).toBe(1);
      });
    });
  });
});
