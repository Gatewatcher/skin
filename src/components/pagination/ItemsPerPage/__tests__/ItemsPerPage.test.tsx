import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';
import selectEvent from 'react-select-event';

import type { ItemsPerPageProps } from '..';
import ItemsPerPage from '..';
import { DEFAULT_INITIAL_PER_PAGE } from '../../LoadMore/constants';

describe('ItemsPerPage', () => {
  const TEST_ID: TestId = 'items-per-page';

  const getSelect = async () =>
    await screen.findByRole('combobox', { name: 'Items' });

  const renderComponent = ({
    onChange = () => {},
    value = DEFAULT_INITIAL_PER_PAGE,
    ...props
  }: Partial<ItemsPerPageProps> = {}) =>
    render(
      <ItemsPerPage
        data-testid={TEST_ID}
        onChange={onChange}
        value={value}
        {...props}
      />,
    );

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should not render if no options', async () => {
    renderComponent({ options: [] });
    await expectNotToBeVisibleInTheDocument(TEST_ID);
  });

  it('should have options', async () => {
    renderComponent();
    await selectEvent.openMenu(await getSelect());
    expect(await screen.findByText(/10$/)).toBeInTheDocument();
    expect(await screen.findByText(/100$/)).toBeInTheDocument();
  });

  it('should call onChange', async () => {
    const onChange = vi.fn();
    renderComponent({ onChange });
    await selectEvent.openMenu(await getSelect());
    await selectEvent.select(await getSelect(), '50');

    expect(onChange).toHaveBeenNthCalledWith(1, 50);
  });

  it('should not call onChange if same value selected', async () => {
    const onChange = vi.fn();
    renderComponent({ onChange, value: 10 });
    await selectEvent.openMenu(await getSelect());
    await selectEvent.select(await getSelect(), '10');

    expect(onChange).not.toHaveBeenCalled();
  });
});
