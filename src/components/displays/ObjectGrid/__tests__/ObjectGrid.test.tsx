import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import { Chip } from '@/skin/displays';

import type { ObjectGridProps } from '..';
import ObjectGrid from '..';

describe('ObjectGrid', () => {
  const TEST_ID: TestId = 'object-grid';

  const renderComponent = ({
    data = {
      test1: { b: 2, c: 3, d: 4 },
      test2: { a: 1, d: 4 },
    },
    ...rest
  }: Partial<ObjectGridProps> = {}) => {
    return render(<ObjectGrid data={data} data-testid={TEST_ID} {...rest} />);
  };

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(`${TEST_ID}-container`);
  });

  it('should render elements', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument('test1', screen.findByText);
    await expectToBeVisibleInTheDocument('test2', screen.findByText);
    await expectToBeVisibleInTheDocument('a', screen.findByText);
    await expectToBeVisibleInTheDocument('1', screen.findByText);
  });
  it('should render react node', async () => {
    renderComponent({ data: { test: { a: <Chip type="low">a</Chip> } } });
    await expectToBeVisibleInTheDocument('chip');
  });
  it('should render fallback', async () => {
    renderComponent({
      data: { test: { a: '1' }, test2: { a: '1', b: '2' } },
      fallback: 'fallback',
    });
    await expectToBeVisibleInTheDocument('fallback', screen.findByText);
  });
});
