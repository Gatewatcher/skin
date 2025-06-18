import {
  expectToBeVisibleInTheDocument,
  suffixTestId,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { screen } from '@testing-library/react';

import type { User } from '@/mocks/types';
import { renderWithRouter } from '@/tests';

import type { ListProps } from '..';
import List from '..';
import { generateUsers } from '../../Listing/__tests__/utils';

describe('List', () => {
  const TEST_ID: TestId = 'list';

  const renderComponent = ({
    children,
    ...props
  }: Partial<ListProps<User>> = {}) =>
    renderWithRouter(
      <List data-testid={TEST_ID} {...props}>
        {children || (row => <div>{row.firstname}</div>)}
      </List>,
    );

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(suffixTestId(TEST_ID, 'container'));
  });

  it('should render listing as grid', async () => {
    renderComponent();
    expect(
      await screen.findByTestId(suffixTestId(TEST_ID, 'container')),
    ).toHaveClass('Grid');

    expect(
      await (
        await screen.findByTestId(suffixTestId(TEST_ID, 'container'))
      ).tagName,
    ).toBe('UL');
  });

  it('should render border', async () => {
    renderComponent({
      data: generateUsers(10),
      children: row => (
        <List.Item key={row.id} data-testid="list-item">
          <div>{row.firstname}</div>
        </List.Item>
      ),
    });

    const items = await screen.findAllByTestId('list-item');
    expect(items).toHaveLength(10);
    expect(items[0]).toHaveClass('Item');
  });
});
