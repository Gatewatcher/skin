import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { MultiSelectProps } from '..';
import MultiSelect from '..';
import {
  ALL_VALUE,
  DEFAULT_SELECT_ALL_LABEL,
  DEFAULT_UNSELECT_ALL_LABEL,
} from '../constants';

describe('MultiSelect', () => {
  const OPTIONS = [
    { label: 'Goldfish', value: 'goldfish' },
    { label: 'Starfish', value: 'starfish' },
    { label: 'Shark', value: 'shark' },
  ];
  const LABEL = 'label';

  const renderComponent = ({
    label = LABEL,
    options = OPTIONS,
    ...props
  }: Partial<MultiSelectProps> = {}) =>
    render(<MultiSelect label={label} options={options} {...props} />);

  const user = userEvent.setup();

  const getSelect = async () =>
    await screen.findByRole('combobox', { name: LABEL });

  const selectAll = async (label = DEFAULT_SELECT_ALL_LABEL) => {
    await user.click(await screen.findByText(label));
  };
  const unselectAll = async () =>
    await user.click(await screen.findByText(DEFAULT_UNSELECT_ALL_LABEL));

  it('should not have select all option', async () => {
    renderComponent({ withSelectAll: false, menuIsOpen: true });
    await expectNotToBeVisibleInTheDocument(DEFAULT_SELECT_ALL_LABEL);
  });

  it('should display a custom label for items overflow', async () => {
    renderComponent({
      withSelectAll: false,
      displayMaxItems: 0,
      getOverflowLabel: selectedCount => `${selectedCount} item(s) selected`,
    });

    const select = await getSelect();
    await user.click(select);
    await user.keyboard('{Enter}');

    const overflowLabel = screen.getByText(`1 item(s) selected`);
    expect(overflowLabel).toBeVisible();
  });

  it('should do not have select all option', async () => {
    renderComponent({
      withSelectAll: false,
      menuIsOpen: true,
    });

    await expectNotToBeVisibleInTheDocument('Select all', screen.queryByText);
  });

  it('should have custom select all and unselect all label', async () => {
    renderComponent({
      selectAllLabel: 'get all',
      unselectAllLabel: 'remove all',
      menuIsOpen: true,
    });

    await expectToBeVisibleInTheDocument('get all', screen.findByText);
    await selectAll('get all');
    await expectToBeVisibleInTheDocument('remove all', screen.findByText);
  });

  it('should call onChange with select all', async () => {
    const onChange = vi.fn();

    renderComponent({
      onChange,
      name: 'test',
      menuIsOpen: true,
    });

    const select = await getSelect();
    await user.click(select);

    await selectAll();
    expect(onChange).toHaveBeenNthCalledWith(1, OPTIONS, {
      action: 'select-option',
      name: 'test',
      option: {
        label: 'Select all',
        value: ALL_VALUE,
      },
    });

    await unselectAll();
    expect(onChange).toHaveBeenNthCalledWith(2, [], {
      action: 'select-option',
      name: 'test',
      option: {
        label: 'Unselect all',
        value: ALL_VALUE,
      },
    });
  });

  it('should render multivalue as', async () => {
    renderComponent({
      renderMultivalueLabelAs: ({ label, value }) => (
        <div data-testid={value}>{label}</div>
      ),
      withSelectAll: false,
    });

    await user.click(await getSelect());
    await user.keyboard('{Enter}');
    await expectToBeVisibleInTheDocument('goldfish');
    await expectToBeVisibleInTheDocument('Goldfish', screen.findByText);
  });

  it('should render value with strings as values', async () => {
    renderComponent({
      value: ['goldfish', 'shark'],
    });

    await expectToBeVisibleInTheDocument('Goldfish', screen.findByText);
    await expectToBeVisibleInTheDocument('Shark', screen.findByText);
  });

  it('should render readonly mode', async () => {
    renderComponent({
      value: ['goldfish', 'shark'],
      readonlyMode: {
        enabled: true,
      },
    });

    await expectToBeVisibleInTheDocument('goldfish, shark', screen.findByText);
  });
});
