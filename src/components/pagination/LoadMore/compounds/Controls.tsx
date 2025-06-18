import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import { Grid } from '@/skin/layout';

import GoToPage from '../../GoToPage';
import type { ItemsPerPageProps } from '../../ItemsPerPage';
import ItemsPerPage from '../../ItemsPerPage';
import type { PaginationProps } from '../../Pagination';
import Pagination from '../../Pagination';
import type { LoadMoreContextType } from '../context';

import styles from '../styles.module.scss';

export type LoadMoreControlsProps = DataTestId &
  Pick<
    LoadMoreContextType<unknown>,
    'page' | 'totalItemsCount' | 'totalPages' | 'type'
  > & {
    onPageChange: PaginationProps['onChange'];
    withRange?: PaginationProps['withRange'];
    onPerPageChange: ItemsPerPageProps['onChange'];
    perPage: number;
    showGoToPage: boolean;
    showItemsPerPage: boolean;
    showPagination: boolean;
  };

const LoadMoreControls = ({
  'data-testid': testId,
  onPageChange,
  onPerPageChange,
  page,
  perPage,
  totalPages,
  showGoToPage,
  showItemsPerPage,
  showPagination,
  withRange,
}: LoadMoreControlsProps) => {
  const enabled = showGoToPage || showPagination || showItemsPerPage;

  if (!enabled) {
    return null;
  }

  return (
    <Grid
      className={styles.Controls}
      columns={3}
      data-testid={testId}
      isContainer
    >
      <Grid className={styles.ControlsGoToPageContainer} column="1" isItem>
        {showGoToPage && (
          <GoToPage
            onChange={onPageChange}
            totalPages={totalPages}
            value={page}
          />
        )}
      </Grid>
      <Grid column="2" isItem>
        {showPagination && (
          <Pagination
            currentPage={page}
            onChange={onPageChange}
            pages={totalPages}
            withRange={withRange}
          />
        )}
      </Grid>
      <Grid className={styles.ControlsPerPageContainer} column="3" isItem>
        {showItemsPerPage && (
          <ItemsPerPage onChange={onPerPageChange} value={perPage} />
        )}
      </Grid>
    </Grid>
  );
};

export default LoadMoreControls;
