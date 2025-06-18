import {
  expectToBeVisibleInTheDocument,
  suffixTestId,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { User } from '@/mocks/types';
import { Card } from '@/skin/displays';

import type { SwitchListingProps } from '..';
import SwitchListing from '..';
import { generateUsers } from '../../Listing/__tests__/utils';
import Table from '../../Table';
import { DEFAULT_SWITCH_LISTING_INITIAL_VIEW } from '../constants';
import type { SwitchListingContextType } from '../context';

describe('SwitchListing', () => {
  const TEST_ID: TestId = 'switch-listing';
  const TEST_ID_ACTIONS: TestId = 'switch-listing-actions';

  const renderComponent = ({
    initialView = DEFAULT_SWITCH_LISTING_INITIAL_VIEW,
    ...props
  }: Partial<SwitchListingProps<User> & SwitchListingContextType> = {}) =>
    render(
      <SwitchListing.Provider initialView={initialView}>
        <SwitchListing.Actions data-testid={TEST_ID_ACTIONS} />
        <SwitchListing
          renderListItem={data => (
            <Card key={data.id} data-testid="card">
              {data.firstname}
            </Card>
          )}
          renderTableRow={data => (
            <Table.Row key={data.id} data-testid="table-row" id={data.id}>
              <Table.Cell>{data.firstname}</Table.Cell>
            </Table.Row>
          )}
          data-testid={TEST_ID}
          persistenceKey="table"
          {...props}
        />
        ,
      </SwitchListing.Provider>,
    );

  const user = userEvent.setup();

  it('should render table view', async () => {
    renderComponent({
      data: generateUsers(1),
    });

    await expectToBeVisibleInTheDocument(suffixTestId(TEST_ID, 'table'));
    await expectToBeVisibleInTheDocument('table-row');
  });

  it('should render table view', async () => {
    renderComponent({
      initialView: 'list',
      data: generateUsers(1),
    });

    await expectToBeVisibleInTheDocument(
      suffixTestId(TEST_ID, 'list-container'),
    );
    await expectToBeVisibleInTheDocument('card');
  });

  it('should switch listing', async () => {
    renderComponent({
      data: generateUsers(1),
    });

    await expectToBeVisibleInTheDocument(suffixTestId(TEST_ID, 'table'));
    await user.click(
      await screen.findByTestId(suffixTestId(TEST_ID_ACTIONS, 'list')),
    );
    await expectToBeVisibleInTheDocument(
      suffixTestId(TEST_ID, 'list-container'),
    );
  });

  it('should call onSwitch', async () => {
    const onSwitch = vi.fn();
    renderComponent({
      data: generateUsers(1),
      onSwitch,
    });

    await expectToBeVisibleInTheDocument(suffixTestId(TEST_ID, 'table'));
    await user.click(
      await screen.findByTestId(suffixTestId(TEST_ID_ACTIONS, 'list')),
    );
    expect(onSwitch).toHaveBeenNthCalledWith(1, 'list');
  });

  it('should paginate and switch to same page', async () => {
    renderComponent({
      data: generateUsers(100),
      totalItemsCount: 100,
    });

    const page2 = await screen.findByTestId('pagination-2');
    await user.click(page2);

    expect(page2).toHaveClass('PaginationItemActive');
    await expectToBeVisibleInTheDocument(suffixTestId(TEST_ID, 'table'));

    await user.click(
      await screen.findByTestId(suffixTestId(TEST_ID_ACTIONS, 'list')),
    );
    expect(page2).toHaveClass('PaginationItemActive');

    await user.click(
      await screen.findByTestId(suffixTestId(TEST_ID_ACTIONS, 'table')),
    );
  });
});
