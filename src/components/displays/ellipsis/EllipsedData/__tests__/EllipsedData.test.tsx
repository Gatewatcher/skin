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

import type { EllipsedDataProps } from '..';
import EllipsedData from '..';
import Popover from '../../../floating/Popover';

describe('EllipsedData', () => {
  const TEST_ID: TestId = 'ellipsed-data';
  const DEFAULT_DATA: User[] = range({ stop: 10 }).map(id => ({
    age: faker.number.int(),
    avatar: faker.internet.avatar(),
    email: faker.internet.email(),
    firstname: faker.person.firstName(),
    id,
    lastname: faker.person.lastName(),
  }));

  const renderComponent = ({
    children,
    data = DEFAULT_DATA,
    ...props
  }: Partial<EllipsedDataProps<User>> = {}) =>
    render(
      <EllipsedData data={data} data-testid={TEST_ID} {...props}>
        {children ||
          (item => (
            <div key={item.id} data-testid="item">
              {item.firstname}
            </div>
          ))}
      </EllipsedData>,
    );

  const user = userEvent.setup();

  const getElements = async () =>
    await within(await screen.findByTestId(TEST_ID)).findAllByTestId('item');

  const getEllipsisElements = async (testId: TestId = 'item') =>
    await within(
      await screen.findByTestId(suffixTestId(TEST_ID, 'ellipsis-content')),
    ).findAllByTestId(testId);

  const openEllipsedContent = async (
    testId: TestId = suffixTestId(TEST_ID, 'ellipsis-trigger'),
  ) => {
    const triggerElement = await screen.findByTestId(testId);
    await user.click(triggerElement);
  };

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
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

  it('should open ellipsed content with 7 items', async () => {
    renderComponent();
    await openEllipsedContent();
    expect(await getEllipsisElements()).toHaveLength(10);
  });

  it('should not have ellipsis', async () => {
    renderComponent({ limit: 10 });
    expect(await getElements()).toHaveLength(10);
    await expectNotToBeVisibleInTheDocument('+', screen.queryByText);
    await expectNotToBeVisibleInTheDocument('floating-trigger');
  });

  it('should have custom moreText', async () => {
    renderComponent({
      moreText: (count: number) => {
        const text = `${count} items`;
        return (
          <div>
            <div data-testid="custom">{text}</div>;
          </div>
        );
      },
    });
    await expectToBeVisibleInTheDocument('custom');
    await expectToBeVisibleInTheDocument('7 items', screen.findByText);
  });

  it('should render with container args', async () => {
    renderComponent({ containerProps: { gap: 10 } });
    expect(await screen.findByTestId(TEST_ID)).toHaveStyle({
      '--stack-gap-x-xs': 'var(--spacing-10)',
      '--stack-gap-y-xs': 'var(--spacing-10)',
    });
  });

  it('should have limit of 5', async () => {
    renderComponent({ limit: 5 });
    expect(await getElements()).toHaveLength(5);
    await openEllipsedContent();
    expect(await getEllipsisElements()).toHaveLength(10);
  });

  it('should have custom ellipsed children', async () => {
    renderComponent({
      ellipsisChildren: item => (
        <div key={item.id} data-testid="custom-item">
          {item.id}
        </div>
      ),
    });

    await openEllipsedContent();
    expect(await getEllipsisElements('custom-item')).toHaveLength(10);
  });

  it('should have custom ellipsis component', async () => {
    renderComponent({
      ellipsis: () => (
        <Popover content={<div data-testid="content">content</div>}>
          {<>trigger</>}
        </Popover>
      ),
    });

    await openEllipsedContent('floating-trigger');
    await expectToBeVisibleInTheDocument('content', screen.findByText);
  });

  it('should have ellipsedDirection column', async () => {
    renderComponent({ ellipsisDirection: 'column' });

    await openEllipsedContent();
    const stack = (await getEllipsisElements()).at(0)?.parentElement;
    expect(stack).toHaveStyle({
      '--stack-flex-direction-xs': 'column',
    });
  });

  it('should have ellipsedDirection row', async () => {
    renderComponent({ ellipsisDirection: 'row' });

    await openEllipsedContent();
    const stack = (await getEllipsisElements()).at(0)?.parentElement;
    expect(stack).toHaveStyle({
      '--stack-flex-direction-xs': 'row',
    });
  });

  it('should have ellipsis title', async () => {
    renderComponent({ ellipsisTitle: 'title' });

    await openEllipsedContent();
    await expectToBeVisibleInTheDocument('title', screen.findByText);
  });
});
