import { range } from '@gatewatcher/bistoury/utils-lang';
import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
  suffixTestId,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '@/skin/actions';
import type { SelectOption } from '@/skin/forms';

import type { DropdownMultiSelectProps } from '..';
import DropdownMultiSelect from '..';

describe('DropdownSelect', () => {
  const TEST_ID: TestId = 'dropdown-select';
  const DEFAULT_OPTIONS: SelectOption<number>[] = range({ stop: 4 }).map(
    item => ({
      label: `label ${item}`,
      value: item,
    }),
  );

  const renderComponent = ({
    children,
    options = DEFAULT_OPTIONS,
    ...props
  }: Partial<DropdownMultiSelectProps<number>> = {}) =>
    render(
      <DropdownMultiSelect data-testid={TEST_ID} options={options} {...props}>
        {children || <Button>trigger element</Button>}
      </DropdownMultiSelect>,
    );

  const user = userEvent.setup();

  const open = async () => {
    const triggerElement = await screen.findByTestId(
      suffixTestId(TEST_ID, 'trigger'),
    );
    await user.click(triggerElement);
  };

  const selectAll = async (label = 'Select all') => {
    const item = await screen.findByText(label);
    await user.click(item);
  };

  const selectItem = async (value: number) => {
    const item = await screen.findByText(`label ${value}`);
    await user.click(item);
  };

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument('dropdown-select-trigger');
  });

  it('should have options', async () => {
    renderComponent();

    await open();
    const options = await screen.findAllByText(/label/);
    expect(options).toHaveLength(4);
  });

  it('should have select all options', async () => {
    renderComponent();

    await open();
    await expectToBeVisibleInTheDocument('Select all', screen.findByText);
  });

  it('should not have select all options', async () => {
    renderComponent({
      withSelectAll: false,
    });

    await open();
    await expectNotToBeVisibleInTheDocument('Select all', screen.queryByText);
  });

  it('should select and unselect options', async () => {
    const onChange = vi.fn();
    renderComponent({
      onChange,
    });

    await open();
    await selectItem(1);
    expect(onChange).toHaveBeenNthCalledWith(1, [1]);
    await selectItem(3);
    expect(onChange).toHaveBeenNthCalledWith(2, [1, 3]);
    await selectItem(1);
    expect(onChange).toHaveBeenNthCalledWith(3, [3]);
  });

  it('should have custom select all label', async () => {
    const onChange = vi.fn();
    renderComponent({
      selectAllLabel: 'all',
      unselectAllLabel: 'nothing',
      onChange,
    });

    await open();
    await expectToBeVisibleInTheDocument('all', screen.findByText);
    await selectItem(0);
    await selectItem(1);
    await selectItem(2);
    await selectItem(3);
    await expectToBeVisibleInTheDocument('nothing', screen.findByText);
  });

  it('should select all if not all items selected', async () => {
    const onChange = vi.fn();
    renderComponent({
      onChange,
    });

    await open();
    await selectAll();
    expect(onChange).toHaveBeenNthCalledWith(1, [0, 1, 2, 3]);
  });

  it('should unselect all if all items selected', async () => {
    const onChange = vi.fn();
    renderComponent({
      onChange,
    });

    await open();
    await selectAll();
    expect(onChange).toHaveBeenNthCalledWith(1, [0, 1, 2, 3]);
    await open();
    await selectAll('Unselect all');
    expect(onChange).toHaveBeenNthCalledWith(2, []);
  });
});
