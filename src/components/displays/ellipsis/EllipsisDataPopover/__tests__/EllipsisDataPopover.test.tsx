import { faker } from '@faker-js/faker';
import { range } from '@gatewatcher/bistoury/utils-lang';
import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
  suffixTestId,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { User } from '@/mocks/types';

import type { EllipsisDataPopoverProps } from '..';
import EllipsisDataPopover from '..';

describe('EllipsisDataPopover', () => {
  const TEST_ID: TestId = 'ellipsis-data-popover';

  const DEFAULT_DATA: User[] = range({ stop: 10 }).map(id => ({
    age: faker.number.int(),
    avatar: faker.internet.avatar(),
    email: faker.internet.email(),
    firstname: faker.person.firstName(),
    id,
    lastname: faker.person.lastName(),
  }));

  const renderComponent = ({
    children = item => (
      <div key={item.id} data-testid="item">
        {item.firstname}
      </div>
    ),
    data = DEFAULT_DATA,
    ...props
  }: Partial<EllipsisDataPopoverProps<User>> = {}) =>
    render(
      <EllipsisDataPopover data={data} data-testid={TEST_ID} {...props}>
        {children}
      </EllipsisDataPopover>,
    );

  const user = userEvent.setup();

  const getElements = async () =>
    await within(await screen.findByTestId(TEST_ID)).findAllByTestId('item');

  const getEllipsisElements = async (testId: TestId = 'item') =>
    await within(
      await screen.findByTestId(suffixTestId(TEST_ID, 'content')),
    ).findAllByTestId(testId);

  const openEllipsedContent = async (
    testId: TestId = suffixTestId(TEST_ID, 'trigger'),
  ) => {
    const triggerElement = await screen.findByTestId(testId);
    await user.click(triggerElement);
  };

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument('ellipsis-data-popover');
  });

  it('should have 3 items', async () => {
    renderComponent();
    const elements = await getElements();
    expect(elements).toHaveLength(3);
  });

  it('should have more text with +7', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument('+7', screen.findByText);
  });

  it('should have badge count', async () => {
    renderComponent({
      moreText: count => <EllipsisDataPopover.BadgeCount count={count} />,
    });
    await expectToBeVisibleInTheDocument('ellipsis-data-badge-count');
  });

  it('should open ellipsed content with 7 items', async () => {
    renderComponent();
    await openEllipsedContent();
    expect(await getEllipsisElements()).toHaveLength(7);
  });

  it('should not have ellipsis', async () => {
    renderComponent({ limit: 10 });
    expect(await getElements()).toHaveLength(10);
    await expectNotToBeVisibleInTheDocument('+', screen.queryByText);
  });

  it('should have limit of 5', async () => {
    renderComponent({ limit: 5 });
    expect(await getElements()).toHaveLength(5);
    await openEllipsedContent();
    expect(await getEllipsisElements()).toHaveLength(5);
  });

  it('should have custom ellipsed children', async () => {
    renderComponent({
      ellipsis: {
        children: item => (
          <div key={item.id} data-testid="custom-item">
            {item.id}
          </div>
        ),
      },
    });

    await openEllipsedContent();
    expect(await getEllipsisElements('custom-item')).toHaveLength(7);
  });

  it('should have custom ellipsis component', async () => {
    renderComponent({
      ellipsis: () => 'content',
    });

    await openEllipsedContent();
    await expectToBeVisibleInTheDocument('content', screen.findByText);
  });

  it('should have ellipsedDirection column', async () => {
    renderComponent({
      ellipsis: {
        direction: 'column',
      },
    });

    await openEllipsedContent();
    const stack = (await getEllipsisElements()).at(0)?.parentElement;
    expect(stack).toHaveStyle({
      '--stack-flex-direction-xs': 'column',
    });
  });

  it('should render children as node', async () => {
    renderComponent({
      children: 'trigger item',
      ellipsis: {
        direction: 'column',
        children: item => (
          <div key={item.id} data-testid="custom-item">
            {item.id}
          </div>
        ),
      },
    });

    await expectToBeVisibleInTheDocument('trigger item', screen.findByText);
    await openEllipsedContent();
    expect(await getEllipsisElements('custom-item')).toHaveLength(7);
  });
});
