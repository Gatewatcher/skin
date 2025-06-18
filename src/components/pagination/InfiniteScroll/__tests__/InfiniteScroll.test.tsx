import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import type { InfiniteScrollProps } from '..';
import InfiniteScroll from '..';

describe('InfiniteScroll', () => {
  const TEST_ID: TestId = 'infinite-scroll';
  const defaultChildren = 'listing';

  const renderComponent = ({
    hasNextPage,
    isLoading,
    onLoadMore,
    ...props
  }: Partial<InfiniteScrollProps> = {}) =>
    render(
      <InfiniteScroll
        data-testid={TEST_ID}
        hasNextPage={hasNextPage ?? true}
        isLoading={isLoading ?? false}
        onLoadMore={onLoadMore || (() => {})}
        {...props}
      >
        {defaultChildren}
      </InfiniteScroll>,
    );

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should render children', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(defaultChildren, screen.findByText);
  });

  it('should render custom slot', async () => {
    renderComponent({ loader: <div>custom loader</div> });
    await expectToBeVisibleInTheDocument('custom loader', screen.findByText);
  });

  it('should not render if not loading and not have nexy page', async () => {
    renderComponent({ hasNextPage: false, isLoading: false });
    await expectNotToBeVisibleInTheDocument(TEST_ID);
  });

  it('should render if is loading', async () => {
    renderComponent({ isLoading: true, hasNextPage: true });
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should render if has next page', async () => {
    renderComponent({ hasNextPage: true, isLoading: false });
    await expectToBeVisibleInTheDocument(TEST_ID);
  });
});
