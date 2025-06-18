import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { SelectableTreeProps } from '..';
import SelectableTree from '..';
import type { SelectableTreeNodeProps } from '../compounds/SelectableTreeNode';

describe('SelectableTree', () => {
  const renderComponent = ({
    resetOnFold,
    onChange,
    value,
  }: Partial<SelectableTreeProps> &
    Partial<SelectableTreeNodeProps> & {
      selectFirstId?: boolean;
      selectAllIds?: boolean;
    } = {}) => {
    const user = userEvent.setup();
    return {
      user,
      ...render(
        <SelectableTree
          onChange={onChange}
          resetOnFold={resetOnFold}
          value={value}
        >
          <SelectableTree.Node id={0} label="All data elements" defaultExpanded>
            <SelectableTree.Node
              id={1}
              label="Elasticsearchdata"
              defaultExpanded
            >
              <SelectableTree.Node id={2} label="Sigflow" />
              <SelectableTree.Node id={3} label="Malcore" />
              <SelectableTree.Node id={4} label="Codebreaker" />
            </SelectableTree.Node>
            <SelectableTree.Node id={5} label="Processed data" defaultExpanded>
              <SelectableTree.Node id={6} label="Risk and alerts board" />
              <SelectableTree.Node id={7} label="Assets and users" />
            </SelectableTree.Node>
          </SelectableTree.Node>
        </SelectableTree>,
      ),
    };
  };

  const getItemByName = (name: string) => {
    return screen.getByRole('checkbox', { name });
  };

  it('selects the item 1 by selecting all its children', async () => {
    const onChangeMock = vi.fn();

    const { user } = renderComponent({
      onChange: onChangeMock,
    });

    await user.click(getItemByName('Sigflow'));
    await user.click(getItemByName('Malcore'));
    await user.click(getItemByName('Codebreaker'));

    expect(onChangeMock).toHaveBeenCalledTimes(3);

    if (!onChangeMock.mock.lastCall) {
      throw new Error('error');
    }

    const value = onChangeMock.mock.lastCall[0];

    expect(value.includes(1)).toBeFalsy();
    expect(value.includes(2)).toBeTruthy();
    expect(value.includes(3)).toBeTruthy();
    expect(value.includes(4)).toBeTruthy();
    expect(value.includes(5)).toBeFalsy();
    expect(value.includes(6)).toBeFalsy();
    expect(value.includes(7)).toBeFalsy();

    expect(getItemByName('All data elements')).not.toBeChecked();

    expect(getItemByName('Elasticsearchdata')).toBeChecked();
    expect(getItemByName('Sigflow')).toBeChecked();
    expect(getItemByName('Malcore')).toBeChecked();
    expect(getItemByName('Codebreaker')).toBeChecked();

    expect(getItemByName('Processed data')).not.toBeChecked();
    expect(getItemByName('Risk and alerts board')).not.toBeChecked();
    expect(getItemByName('Assets and users')).not.toBeChecked();
  });

  it('selects item 5 and its two children', async () => {
    const onChangeMock = vi.fn();

    const { user } = renderComponent({
      onChange: onChangeMock,
    });

    await user.click(getItemByName('Processed data'));

    expect(onChangeMock).toHaveBeenCalledTimes(1);

    if (!onChangeMock.mock.lastCall) {
      throw new Error('error');
    }

    const value = onChangeMock.mock.lastCall[0];

    expect(value.includes(1)).toBeFalsy();
    expect(value.includes(2)).toBeFalsy();
    expect(value.includes(3)).toBeFalsy();
    expect(value.includes(4)).toBeFalsy();
    expect(value.includes(5)).toBeFalsy();
    expect(value.includes(6)).toBeTruthy();
    expect(value.includes(7)).toBeTruthy();

    expect(getItemByName('All data elements')).not.toBeChecked();

    expect(getItemByName('Elasticsearchdata')).not.toBeChecked();
    expect(getItemByName('Sigflow')).not.toBeChecked();
    expect(getItemByName('Malcore')).not.toBeChecked();
    expect(getItemByName('Codebreaker')).not.toBeChecked();

    expect(getItemByName('Processed data')).toBeChecked();
    expect(getItemByName('Risk and alerts board')).toBeChecked();
    expect(getItemByName('Assets and users')).toBeChecked();
  });

  it('selects all the items', async () => {
    const onChangeMock = vi.fn();

    const { user } = renderComponent({ onChange: onChangeMock });

    await user.click(getItemByName('All data elements'));

    expect(onChangeMock).toHaveBeenCalledTimes(1);

    if (!onChangeMock.mock.lastCall) {
      throw new Error('error');
    }

    const value = onChangeMock.mock.lastCall[0];

    expect(value.includes(1)).toBeFalsy();
    expect(value.includes(2)).toBeTruthy();
    expect(value.includes(3)).toBeTruthy();
    expect(value.includes(4)).toBeTruthy();
    expect(value.includes(5)).toBeFalsy();
    expect(value.includes(6)).toBeTruthy();
    expect(value.includes(7)).toBeTruthy();

    expect(getItemByName('All data elements')).toBeChecked();

    expect(getItemByName('Elasticsearchdata')).toBeChecked();
    expect(getItemByName('Sigflow')).toBeChecked();
    expect(getItemByName('Malcore')).toBeChecked();
    expect(getItemByName('Codebreaker')).toBeChecked();

    expect(getItemByName('Processed data')).toBeChecked();
    expect(getItemByName('Risk and alerts board')).toBeChecked();
    expect(getItemByName('Assets and users')).toBeChecked();
  });

  it('unselects all the items', async () => {
    const onChangeMock = vi.fn();

    const { user } = renderComponent({
      onChange: onChangeMock,
      value: [0],
    });

    await user.click(getItemByName('All data elements'));

    expect(onChangeMock).toHaveBeenCalledTimes(2);

    if (!onChangeMock.mock.lastCall) {
      throw new Error('error');
    }

    const value = onChangeMock.mock.lastCall[0];

    expect(value.includes(1)).toBeFalsy();
    expect(value.includes(2)).toBeFalsy();
    expect(value.includes(3)).toBeFalsy();
    expect(value.includes(4)).toBeFalsy();
    expect(value.includes(5)).toBeFalsy();
    expect(value.includes(6)).toBeFalsy();
    expect(value.includes(7)).toBeFalsy();

    expect(getItemByName('All data elements')).not.toBeChecked();

    expect(getItemByName('Elasticsearchdata')).not.toBeChecked();
    expect(getItemByName('Sigflow')).not.toBeChecked();
    expect(getItemByName('Malcore')).not.toBeChecked();
    expect(getItemByName('Codebreaker')).not.toBeChecked();

    expect(getItemByName('Processed data')).not.toBeChecked();
    expect(getItemByName('Risk and alerts board')).not.toBeChecked();
    expect(getItemByName('Assets and users')).not.toBeChecked();
  });

  it('initially selects a node and all its children', async () => {
    renderComponent({ value: [1] });

    expect(getItemByName('All data elements')).not.toBeChecked();

    expect(getItemByName('Elasticsearchdata')).toBeChecked();
    expect(getItemByName('Sigflow')).toBeChecked();
    expect(getItemByName('Malcore')).toBeChecked();
    expect(getItemByName('Codebreaker')).toBeChecked();

    expect(getItemByName('Processed data')).not.toBeChecked();
    expect(getItemByName('Risk and alerts board')).not.toBeChecked();
    expect(getItemByName('Assets and users')).not.toBeChecked();
  });
});
