import {
  expectToBeVisibleInTheDocument,
  suffixTestId,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { PaginationProps } from '..';
import Pagination from '..';

describe('Pagination', () => {
  const TEST_ID: TestId = 'pagination';

  const user = userEvent.setup();

  const renderComponent = ({
    pages = 10,
    onChange = () => {},
    ...props
  }: Partial<PaginationProps> = {}) =>
    render(
      <Pagination
        data-testid={TEST_ID}
        onChange={onChange}
        pages={pages}
        {...props}
      />,
    );

  const goTo = async (page: number) => {
    const elm = await screen.findByTestId(
      suffixTestId(TEST_ID, page.toString()),
    );

    await user.click(elm);
  };

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should have pages', async () => {
    renderComponent({ pages: 10 });
    const pages = await (await screen.findByTestId(TEST_ID)).children;
    expect(pages).toHaveLength(8);
  });

  it('should render next and prev icon', async () => {
    renderComponent({ pages: 5 });
    await expectToBeVisibleInTheDocument(suffixTestId(TEST_ID, 'prev'));
    await expectToBeVisibleInTheDocument(suffixTestId(TEST_ID, 'next'));
  });

  it('should have prev button disabled if first page', async () => {
    renderComponent({ pages: 5 });
    const prev = await screen.findByTestId(suffixTestId(TEST_ID, 'prev'));
    expect(prev).toBeDisabled();
  });

  it('should have next button disabled if last page', async () => {
    renderComponent({ pages: 3, currentPage: 3 });

    const next = await screen.findByTestId(suffixTestId(TEST_ID, 'next'));
    expect(next).toBeDisabled();
  });

  it('should paginate on page click', async () => {
    const onChange = vi.fn();
    renderComponent({ pages: 5, onChange });
    await goTo(4);
  });

  it('should go to prev page', async () => {
    const onChange = vi.fn();
    renderComponent({ pages: 5, onChange, currentPage: 4 });
    await user.click(await screen.findByTestId(suffixTestId(TEST_ID, 'prev')));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('should render ellipsis', async () => {
    renderComponent({ pages: 10, currentPage: 5 });

    await waitFor(async () => {
      const ellipsis = await screen.findAllByTestId(
        suffixTestId(TEST_ID, 'ellipsis'),
      );
      expect(ellipsis).toHaveLength(2);
    });
  });

  it('should render page 1 2 3 4 on page 3', async () => {
    renderComponent({ pages: 10, currentPage: 3 });

    await expectToBeVisibleInTheDocument(suffixTestId(TEST_ID, '1'));
    await expectToBeVisibleInTheDocument(suffixTestId(TEST_ID, '2'));
    await expectToBeVisibleInTheDocument(suffixTestId(TEST_ID, '3'));
    await expectToBeVisibleInTheDocument(suffixTestId(TEST_ID, '4'));
  });
});
