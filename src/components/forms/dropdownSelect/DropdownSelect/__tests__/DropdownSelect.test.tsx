import { range } from '@gatewatcher/bistoury/utils-lang';
import {
  expectToBeVisibleInTheDocument,
  suffixTestId,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '@/skin/actions';
import type { SelectOption } from '@/skin/forms';

import type { DropdownSelectProps } from '..';
import DropdownSelect from '..';

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
  }: Partial<DropdownSelectProps<number>> = {}) =>
    render(
      <DropdownSelect data-testid={TEST_ID} options={options} {...props}>
        {children || <Button>trigger element</Button>}
      </DropdownSelect>,
    );

  const user = userEvent.setup();

  const open = async () => {
    const triggerElement = await screen.findByTestId(
      suffixTestId(TEST_ID, 'trigger'),
    );
    await user.click(triggerElement);
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

  it('should select and unselect options', async () => {
    const onChange = vi.fn();
    renderComponent({
      onChange,
    });

    await open();
    await selectItem(1);
    expect(onChange).toHaveBeenNthCalledWith(1, 1);
    await selectItem(3);
    expect(onChange).toHaveBeenNthCalledWith(2, 3);
    await selectItem(3);
    expect(onChange).toHaveBeenNthCalledWith(3, undefined);
  });
});
