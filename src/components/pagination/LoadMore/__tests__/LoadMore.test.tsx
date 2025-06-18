import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import selectEvent from 'react-select-event';

import type { User } from '@/mocks/types';
import Listing from '@/skin/listings/Listing';
import { renderWithRouter } from '@/tests';

import type { LoadMoreInternalProps, LoadMoreProps } from '..';
import LoadMore from '..';
import { DEFAULT_INITIAL_PER_PAGE } from '../constants';
import { calcOffset } from '../utils';
import { generateUsers } from './utils';

describe('LoadMore', () => {
  const TEST_ID: TestId = 'load-more';
  const LISTING_TEST_ID: TestId = 'listing';
  const USERS_COUNT = 30;

  const user = userEvent.setup();

  const getPagination = async () => await screen.findByTestId('pagination');
  const getListing = async () => await screen.findByTestId(LISTING_TEST_ID);

  const renderComponent = ({
    data,
    totalItemsCount,
    ...props
  }: Partial<LoadMoreProps<User> & LoadMoreInternalProps> = {}) =>
    renderWithRouter(
      <LoadMore
        {...props}
        data={data || generateUsers(USERS_COUNT)}
        data-testid={TEST_ID}
        totalItemsCount={totalItemsCount || USERS_COUNT}
      >
        <Listing<User>
          data-testid={LISTING_TEST_ID}
          renderRoot={children => <ul data-testid="root">{children}</ul>}
          renderRowComponent={children => <li>{children}</li>}
        >
          {row => <div key={Math.random()}>{row.firstname}</div>}
        </Listing>
      </LoadMore>,
    );

  const renderComponentWithEntries = ({
    data,
    totalItemsCount,
    ...props
  }: Partial<LoadMoreProps<User> & LoadMoreInternalProps> = {}) =>
    renderWithRouter(
      <LoadMore
        {...props}
        data={data || generateUsers(USERS_COUNT)}
        data-testid={TEST_ID}
        totalItemsCount={totalItemsCount || USERS_COUNT}
      >
        <Listing<User>
          data-testid={LISTING_TEST_ID}
          renderRoot={children => <ul data-testid="root">{children}</ul>}
          renderRowComponent={children => <li>{children}</li>}
        >
          {row => <div key={Math.random()}>{row.firstname}</div>}
        </Listing>
      </LoadMore>,
      { initialEntries: ['/?page=3'] },
    );

  describe('general', () => {
    it('should render root component', async () => {
      renderComponent();
      await expectToBeVisibleInTheDocument(TEST_ID);
    });

    it('should render page 3', async () => {
      renderComponent({
        initialPage: 3,
        data: generateUsers(100),
        totalItemsCount: 100,
      });

      const page3 = await screen.findByTestId('pagination-3');
      expect(page3).toHaveClass('PaginationItemActive');
    });

    it('should call onReady', () => {
      const onReady = vi.fn();

      renderComponent({ onReady });
      expect(onReady).toHaveBeenNthCalledWith(1, {
        offset: 0,
        page: 1,
        perPage: 25,
        sort: [],
        type: 'pagination',
      });
    });

    it('should call onReady with initial params', async () => {
      const onReady = vi.fn();

      renderComponent({
        initialPage: 3,
        initialPerPage: 10,
        initialSort: [{ id: 'id', order: 'desc' }],
        onReady,
      });
      expect(onReady).toHaveBeenNthCalledWith(1, {
        offset: calcOffset({ page: 3, perPage: 10 }),
        page: 3,
        perPage: 10,
        sort: [{ id: 'id', order: 'desc' }],
        type: 'pagination',
      });
    });

    it('should not call onParamsChange on mount', async () => {
      const onParamsChange = vi.fn();
      renderComponent({ onParamsChange });
      expect(onParamsChange).not.toHaveBeenCalled();
    });
  });

  describe('without pagination', () => {
    it('should render all data', async () => {
      renderComponent({ initialPerPage: 0 });
      const listing = await getListing();
      expect(listing.childElementCount).toBe(USERS_COUNT);
    });

    it('should not have pagination', async () => {
      renderComponent({ initialPerPage: 0 });
      await expectNotToBeVisibleInTheDocument('pagination');
    });
  });

  describe('with pagination', () => {
    it('should have pagination', async () => {
      renderComponent({
        data: generateUsers(40),
        totalItemsCount: 40,
      });
      await expectToBeVisibleInTheDocument('pagination');

      const pagination = await getPagination();
      expect(pagination.childElementCount).toBe(4);
    });

    it('should have infinite scroll', async () => {
      renderComponent({ type: 'infiniteScroll' });
      await expectToBeVisibleInTheDocument('infinite-scroll');
    });

    it('should call onParamsChange', async () => {
      const onParamsChange = vi.fn();

      renderComponent({
        initialPerPage: 10,
        data: generateUsers(30),
        onParamsChange,
      });

      const page2 = await screen.findByTestId('pagination-2');
      await user.click(page2);

      expect(onParamsChange).toHaveBeenNthCalledWith(1, {
        offset: calcOffset({ page: 2, perPage: 10 }),
        page: 2,
        perPage: 10,
        type: 'pagination',
        sort: [],
      });
    });
  });

  describe('items per page', () => {
    const changeValue = async (value: number) => {
      const elm = await screen.findByRole('combobox', {
        name: 'Items',
      });
      await selectEvent.openMenu(elm);
      await selectEvent.select(elm, value.toString());
    };

    it('should have items per page', async () => {
      renderComponent({ data: generateUsers(200), totalItemsCount: 200 });
      await expectToBeVisibleInTheDocument('items-per-page');
    });

    it('should have items per page if only one page', async () => {
      renderComponent({
        data: generateUsers(45),
        totalItemsCount: 45,
        initialPerPage: 50,
      });

      await expectToBeVisibleInTheDocument('items-per-page');
    });

    it('should not have items per page', async () => {
      renderComponent({ type: 'infiniteScroll' });
      await expectNotToBeVisibleInTheDocument('items-per-page');
    });

    it('should call onParamsChange', async () => {
      const onParamsChange = vi.fn();

      renderComponent({
        data: generateUsers(200),
        onParamsChange,
        totalItemsCount: 200,
      });

      await changeValue(50);
      expect(onParamsChange).toHaveBeenNthCalledWith(1, {
        offset: 0,
        page: 1,
        perPage: 50,
        type: 'pagination',
        sort: [],
      });
    });

    it('should not render items per page', async () => {
      renderComponent({
        data: generateUsers(100),
        totalItemsCount: 100,
        initialPerPage: 0,
      });

      await expectNotToBeVisibleInTheDocument('items-per-page');
      await expectNotToBeVisibleInTheDocument('pagination');
    });

    it('should reset page to first', async () => {
      renderComponent({
        data: generateUsers(200),
        initialPage: 2,
        totalItemsCount: 200,
      });
      await changeValue(50);

      expect(await screen.findByTestId('pagination-1')).toHaveClass(
        'PaginationItemActive',
      );
    });

    it('should have 25 (default) items per page', async () => {
      const onReady = vi.fn();
      renderComponent({ onReady });
      expect(onReady).toHaveBeenCalledWith({
        page: 1,
        perPage: DEFAULT_INITIAL_PER_PAGE,
        offset: 0,
        sort: [],
        type: 'pagination',
      });
    });
  });

  describe('go to page', () => {
    it('should render goToPage', async () => {
      renderComponent();
      await expectToBeVisibleInTheDocument('go-to-page');
    });

    it('should not render goToPage', async () => {
      renderComponent({ totalItemsCount: 20, initialPerPage: 25 });
      await expectNotToBeVisibleInTheDocument('go-to-page');
    });

    it('should call onParamsChange on change', async () => {
      const onParamsChange = vi.fn();
      renderComponent({ onParamsChange });
      const input = await screen.findByRole('spinbutton', {
        name: 'Page',
      });
      fireEvent.change(input, { target: { value: 2 } });

      await waitFor(() => {
        expect(onParamsChange).toHaveBeenCalledWith({
          offset: 25,
          page: 2,
          perPage: 25,
          sort: [],
          type: 'pagination',
        });
      });
    });
  });

  describe('controls', () => {
    it('should render controls', async () => {
      renderComponent({
        data: generateUsers(20),
        totalItemsCount: 20,
        initialPerPage: 10,
      });
      await expectToBeVisibleInTheDocument(
        'load-more-controls-bottom-container',
      );
    });

    it('should render controls', async () => {
      renderComponent({
        data: generateUsers(20),
        totalItemsCount: 20,
        initialPerPage: 10,
      });
      await expectToBeVisibleInTheDocument(
        'load-more-controls-bottom-container',
      );
    });

    it('should not render controls if disabled', async () => {
      renderComponent({
        data: generateUsers(2),
        totalItemsCount: 2,
        initialPerPage: 0,
      });
      await expectNotToBeVisibleInTheDocument(
        'load-more-controls-bottom-container',
      );
    });

    it('should render controls on top', async () => {
      renderComponent({
        data: generateUsers(200),
        totalItemsCount: 200,
        controlsTop: () => <div>controls top</div>,
      });
      await expectToBeVisibleInTheDocument('controls top', screen.findByText);
    });

    it('should render controls on bottom', async () => {
      renderComponent({
        data: generateUsers(200),
        totalItemsCount: 200,
        controlsTop: () => <div>controls bottom</div>,
      });
      await expectToBeVisibleInTheDocument(
        'controls bottom',
        screen.findByText,
      );
    });

    it('should not render controls if no data', async () => {
      renderComponent({ data: [] });
      await expectNotToBeVisibleInTheDocument(
        'load-more-controls-bottom-container',
      );
    });
  });

  describe('url', () => {
    it('should encode', async () => {
      const encode = vi.fn();

      renderComponentWithEntries({
        data: generateUsers(200),
        totalItemsCount: 200,
        encode,
      });

      const page1 = await screen.findByTestId('pagination-1');
      await user.click(page1);
      await user.click(await screen.findByTestId('pagination-2'));

      expect(encode).toHaveBeenCalledWith({
        offset: calcOffset({ page: 2, perPage: 25 }),
        page: 2,
        perPage: 25,
        sort: [],
        type: 'pagination',
      });
    });
  });
});
