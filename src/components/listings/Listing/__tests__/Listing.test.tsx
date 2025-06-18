import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import type { User } from '@/mocks/types';
import type { LoadMoreContextType } from '@/skin/pagination/LoadMore/context';
import { LoadMoreContext } from '@/skin/pagination/LoadMore/context';

import type { ListingInternalProps, ListingProps } from '..';
import Listing from '..';
import { generateUsers } from './utils';

describe('Listing', () => {
  const TEST_ID: TestId = 'listing';
  const USERS_COUNT = 10;

  const renderComponent = ({
    data,
    error = null,
    firstLoadingDone = true,
    isError = false,
    isLoading = false,
    page = 1,
    totalItemsCount = 100,
    totalPages = 10,
    type = 'pagination',
    ...props
  }: Partial<ListingProps<User>> &
    Partial<LoadMoreContextType<User>> &
    Partial<ListingInternalProps> = {}) => {
    const mockContextValue: LoadMoreContextType<User> = {
      page,
      data: data || generateUsers(USERS_COUNT),
      error,
      firstLoadingDone,
      isError,
      isLoading,
      previousData: [],
      totalItemsCount,
      totalPages,
      type,
    };

    return render(
      <LoadMoreContext.Provider value={mockContextValue}>
        <Listing<User>
          data-testid={TEST_ID}
          renderRoot={children => <div data-testid="root">{children}</div>}
          renderRowComponent={children => <li>{children}</li>}
          {...props}
        >
          {row => <div key={row.email}>{row.firstname}</div>}
        </Listing>
      </LoadMoreContext.Provider>,
    );
  };

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should render first loader', async () => {
    renderComponent({
      firstLoadingDone: false,
      isLoading: true,
    });
    await expectToBeVisibleInTheDocument('listing-loader');
  });

  it('should not render first loader', async () => {
    renderComponent({
      firstLoadingDone: true,
      isLoading: true,
    });
    await expectNotToBeVisibleInTheDocument('listing-loader');
  });

  it('should render empty data', async () => {
    renderComponent({ data: [], emptyMessage: 'no data' });
    await expectToBeVisibleInTheDocument('no data', screen.findByText);
  });

  it('should render custom empty data slot', async () => {
    renderComponent({
      data: [],
      emptyElement: <div data-testid="no-data">no data</div>,
    });
    await expectToBeVisibleInTheDocument('no-data');
    await expectToBeVisibleInTheDocument('no data', screen.findByText);
  });

  it('should render data', async () => {
    renderComponent();
    const listing = await screen.findByTestId(TEST_ID);
    expect(await listing.childNodes).toHaveLength(USERS_COUNT);
  });

  it('should render data with firstLoadignDone', async () => {
    renderComponent({ firstLoadingDone: true });
    const listing = await screen.findByTestId(TEST_ID);
    expect(await listing.childNodes).toHaveLength(USERS_COUNT);
  });

  it('should render error', async () => {
    renderComponent({
      isError: true,
      firstLoadingDone: true,
      error: 'some error',
    });
    await expectToBeVisibleInTheDocument('some error', screen.findByText);
  });

  it('should render custom error', async () => {
    renderComponent({
      firstLoadingDone: true,
      isError: true,
      errorElement: <div data-testid="error">error message</div>,
    });

    await expectToBeVisibleInTheDocument('error');
    await expectToBeVisibleInTheDocument('error message', screen.findByText);
  });

  it('should render startElement and endElement if first loading done', async () => {
    renderComponent({
      isLoading: false,
      firstLoadingDone: true,
      startElement: <div>start element</div>,
      endElement: <div>end element</div>,
    });

    await expectToBeVisibleInTheDocument('start element', screen.findByText);
    await expectToBeVisibleInTheDocument('end element', screen.findByText);
  });

  it('should not render start end end element is first loading process', async () => {
    renderComponent({
      isLoading: true,
      firstLoadingDone: false,
      startElement: <div>start element</div>,
      endElement: <div>end element</div>,
    });

    await expectNotToBeVisibleInTheDocument(
      'start element',
      screen.queryByText,
    );
    await expectNotToBeVisibleInTheDocument('end element', screen.queryByText);
  });

  it('should render first loader', async () => {
    renderComponent({
      firstLoadingDone: false,
      isLoading: true,
      firstLoader: <div data-testid="first-loader">first loader</div>,
    });

    await expectToBeVisibleInTheDocument('first-loader');
    await expectToBeVisibleInTheDocument('first loader', screen.findByText);
  });

  describe('placeholder size', () => {
    it('should render small error placeholder', async () => {
      renderComponent({
        firstLoadingDone: true,
        isLoading: false,
        placeholderSize: 'small',
        isError: true,
        error: 'error',
      });

      const container = await screen.findByTestId('stack');
      expect(container).toHaveClass('ContainerSmall');
    });

    it('should render small empty placeholder', async () => {
      renderComponent({
        placeholderSize: 'small',
        data: [],
      });

      const container = await screen.findByTestId('stack');
      expect(container).toHaveClass('ContainerSmall');
    });

    it('should render small first loader', async () => {
      renderComponent({
        placeholderSize: 'small',
        isLoading: true,
        firstLoadingDone: false,
      });

      const container = await screen.findByTestId('listing-loader');
      expect(container).toHaveClass('ContainerSmall');
    });
  });
});
