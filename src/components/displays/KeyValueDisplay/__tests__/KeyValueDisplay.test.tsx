import { first } from '@gatewatcher/bistoury/utils-lang';
import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import { Icon } from '@/skin/displays';
import type { KeyValueFormat } from '@/skin/displays/KeyValueDisplay/types';

import type { KeyValueDisplayProps } from '..';
import KeyValueDisplay from '..';

describe('KeyValueDisplay', () => {
  const TEST_ID: TestId = 'key-value-display';
  const objectTest: KeyValueFormat = { 'test key object': 'test value object' };
  const mapTest: KeyValueFormat = new Map([['test key map', 'test value map']]);
  const arrayTest: KeyValueFormat = [{ label: 'Test', value: 1 }];
  const reactNodeValueTest: KeyValueFormat = [
    { label: 'Test', value: <Icon name="CircleInfo" /> },
  ];

  const renderComponent = ({
    data = objectTest,
    ...rest
  }: Partial<KeyValueDisplayProps> = {}) =>
    render(<KeyValueDisplay data={data} data-testid={TEST_ID} {...rest} />);

  it('should render with object', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument('key-value-display');
  });

  it('should render with map', async () => {
    renderComponent({ data: mapTest });
    await expectToBeVisibleInTheDocument('key-value-display');
  });

  it('should render with array', async () => {
    renderComponent({ data: arrayTest });
    await expectToBeVisibleInTheDocument('key-value-display');
  });

  it('should have a title', async () => {
    renderComponent({ title: 'test title' });
    await expectToBeVisibleInTheDocument('title');
    await expectToBeVisibleInTheDocument('test title', screen.findByText);
  });

  it('should have key', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument('text');
    await expectToBeVisibleInTheDocument('test key object', screen.findByText);
  });

  it('should have value', async () => {
    renderComponent();
    expect(screen.getAllByTestId('grid-item')[1]).toHaveTextContent(
      'test value object',
    );
  });

  it('should have ReactNode value', async () => {
    renderComponent({ data: reactNodeValueTest });
    await expectToBeVisibleInTheDocument('icon');
  });

  it('should have table variant', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument('key-value-display-grid-container');
  });

  it('should have list variant', async () => {
    renderComponent({ variant: 'list' });
    await expectToBeVisibleInTheDocument('key-value-display-list');
  });

  it('should have inline variant', async () => {
    renderComponent({ variant: 'inline' });
    await expectToBeVisibleInTheDocument('key-value-display-inline');
  });

  it('should not have empty element', async () => {
    renderComponent({
      data: [
        { label: 'Firstname', value: 'John' },
        { label: 'Lastname', value: undefined },
        { label: 'Number', value: 0 },
        { label: 'Number undefined', value: undefined },
      ],
      withEmptyElements: false,
    });
    await expectToBeVisibleInTheDocument('Firstname', screen.findByText);
    await expectNotToBeVisibleInTheDocument('Lastname', screen.queryByText);
  });

  it('should render custom empty element', async () => {
    renderComponent({
      data: [
        { label: 'Firstname', value: 'John' },
        { label: 'Lastname', value: undefined },
        { label: 'Number', value: 0 },
        { label: 'Number undefined', value: undefined },
      ],
      emptyElement: <div data-testid="empty">-</div>,
    });

    expect(await screen.findAllByTestId('empty')).toHaveLength(2);
    expect(first(await screen.findAllByText('-'))).toHaveTextContent('-');
  });

  it('should render custom columns size', async () => {
    renderComponent({
      columns: { key: 2, value: 10 },
    });

    const items = await screen.findAllByTestId('grid-item');

    expect(items[0]).toHaveStyle({
      '--grid-col-span-xs': '2',
    });
    expect(items[1]).toHaveStyle({
      '--grid-col-span-xs': '10',
    });
  });
});
