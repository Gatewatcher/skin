import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { range } from '@gatewatcher/bistoury/utils-lang';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import { useMemo } from 'react';

import { Icon } from '@/skin/displays';
import { Stack } from '@/skin/layout';

import styles from './styles.module.scss';

export type EllipsisProps = Required<DataTestId>;

const Ellipsis = ({ 'data-testid': testId }: EllipsisProps) => (
  <div
    className={styles.Ellipsis}
    data-testid={suffixTestId(testId, 'ellipsis')}
  >
    ...
  </div>
);

export type PaginationProps = DataTestId & {
  currentPage?: number;
  onChange: (page: number) => void;
  pages: number;
  withRange?: boolean;
};

const Pagination = ({
  currentPage = 1,
  'data-testid': testId = 'pagination',
  onChange,
  pages,
  withRange = true,
}: PaginationProps) => {
  const firstPage = 1;
  const lastPage = pages;

  const isFirstPage = useMemo(() => currentPage === firstPage, [currentPage]);
  const isLastPage = useMemo(
    () => currentPage === lastPage,
    [currentPage, lastPage],
  );

  if (!pages) return null;

  const handlePagination = (page: number) => {
    onChange(page);
  };

  const generatePages = (start: number, end: number) =>
    range({ start, stop: end + 1 }).map(page => (
      <li key={page}>
        <button
          className={classNames(
            styles.PaginationItem,
            page === currentPage && styles.PaginationItemActive,
          )}
          data-testid={suffixTestId(testId, page.toString())}
          onClick={() => handlePagination(page)}
          type="button"
        >
          {page}
        </button>
      </li>
    ));

  const currentPagesRange = range({
    start: isLastPage
      ? Math.max(firstPage, lastPage - 3)
      : Math.max(currentPage - 1, 2),
    stop: isFirstPage
      ? Math.min(4, lastPage) + 1
      : Math.min(currentPage + 1, lastPage - 1) + 1,
  });

  const getLastItemInCurrentRange = (ranges?: number[]): number =>
    (ranges || currentPagesRange).at(-1) as number;

  const filteredPagesRange = currentPagesRange.filter(
    page => page !== firstPage && page !== lastPage,
  );

  const generateCurrentPages = () => {
    if (currentPagesRange[0] - 1 === firstPage + 1) {
      currentPagesRange.unshift(firstPage + 1);
    }

    if (getLastItemInCurrentRange() + 1 === lastPage - 1) {
      currentPagesRange.push(getLastItemInCurrentRange() + 1);
    }

    if (currentPage === firstPage + 1 && firstPage + 1 < pages) {
      currentPagesRange.push(getLastItemInCurrentRange() + 1);
    }

    if (currentPage === lastPage - 1 && lastPage - 1 > 1) {
      currentPagesRange.unshift(currentPagesRange[0] - 1);
    }

    return generatePages(
      filteredPagesRange[0],
      getLastItemInCurrentRange(filteredPagesRange),
    );
  };

  const noRangeNode = filteredPagesRange.length ? (
    currentPage !== firstPage && currentPage !== lastPage ? (
      generatePages(currentPage, currentPage)
    ) : (
      <Ellipsis data-testid={testId} />
    )
  ) : null;

  return (
    <Stack
      alignItems="center"
      as="ul"
      className={styles.Pagination}
      data-testid={testId}
      gap={5}
      margin={0}
      padding={0}
    >
      <button
        className={styles.PaginationItem}
        data-testid={suffixTestId(testId, 'prev')}
        disabled={isFirstPage}
        onClick={() => handlePagination(currentPage - 1)}
      >
        <Icon name="ChevronLeft" currentColor />
      </button>

      {generatePages(firstPage, firstPage)}

      {withRange ? (
        <>
          {!isFirstPage &&
            !!filteredPagesRange.length &&
            filteredPagesRange[0] !== 2 && <Ellipsis data-testid={testId} />}

          {generateCurrentPages()}

          {!isLastPage &&
            !!filteredPagesRange.length &&
            getLastItemInCurrentRange(filteredPagesRange) !== lastPage - 1 && (
              <Ellipsis data-testid={testId} />
            )}
        </>
      ) : (
        noRangeNode
      )}

      {generatePages(lastPage, lastPage)}

      <button
        className={styles.PaginationItem}
        data-testid={suffixTestId(testId, 'next')}
        disabled={isLastPage}
        onClick={() => handlePagination(currentPage + 1)}
      >
        <Icon name="ChevronRight" currentColor />
      </button>
    </Stack>
  );
};

export default Pagination;
