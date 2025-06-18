import { useTimeout } from '@gatewatcher/bistoury/hooks';
import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import { type ReactNode, useEffect, useState } from 'react';

import { withElevation } from '@/hocs';
import { Button } from '@/skin/actions';
import { Stack } from '@/skin/layout';
import { useLoadMoreContext } from '@/skin/pagination/LoadMore/context';

import type {
  ListingBatchActions,
  ListingBatchSelectionState,
} from '../../Listing/context';
import { useListingBatchSelectionContext } from '../../Listing/context';
import { useBatchSelection } from '../../Listing/hooks';
import { DEFAULT_BATCH_OPTIONS } from '../constants';
import BatchAction from './batch/Action';
import BatchActions from './batch/Actions';
import BatchAsideActions from './batch/AsideActions';
import { BatchDropdownAction } from './batch/DropdownAction';
import BatchMainActions from './batch/MainActions';
import { BatchMoreActions } from './batch/MoreActions';

import styles from '../styles.module.scss';

export type TableBatchActionsProps = DataTestId & {
  actions: (
    params: ListingBatchSelectionState,
    actions: ListingBatchActions,
  ) => ReactNode;
  clearText?: ReactNode;
  selectAllText?: (options: {
    onClick: () => void;
    selectedCount: number;
    totalItemsCount: number;
  }) => ReactNode;
  selectionText?: (options: {
    selectedCount: number;
    totalItemsCount: number;
  }) => ReactNode;
};

const TableBatchActions = ({
  actions,
  clearText = DEFAULT_BATCH_OPTIONS.clearText,
  'data-testid': testId = DEFAULT_BATCH_OPTIONS['data-testid'],
  selectAllText = DEFAULT_BATCH_OPTIONS.selectAllText,
  selectionText = DEFAULT_BATCH_OPTIONS.selectionText,
}: TableBatchActionsProps) => {
  const { itemsCount, allSelected, unselectedIds, hasSelection, selectedIds } =
    useListingBatchSelectionContext();
  const { clear, selectAll } = useBatchSelection();
  const { totalItemsCount } = useLoadMoreContext();

  const [isMountedLongEnough, setIsMountedLongEnough] = useState(false);
  const [setTimeout] = useTimeout();

  useEffect(() => {
    setTimeout(() => {
      setIsMountedLongEnough(true);
    }, 3000);
  }, [setTimeout]);

  return withElevation(
    <Stack
      className={classNames(
        styles.BatchActions,
        isMountedLongEnough && styles.BatchActionsDelayedOpacity,
      )}
      data-testid={testId}
      direction="column"
    >
      <Stack
        className={styles.BatchActionsBorder}
        gap={4}
        justifyContent="space-between"
        padding={{ y: 5, x: 7 }}
      >
        <Stack alignItems="center" gap={4}>
          {selectionText({
            totalItemsCount,
            selectedCount: itemsCount,
          })}

          {(!allSelected || !!unselectedIds.length) &&
            totalItemsCount !== selectedIds.length &&
            selectAllText({
              totalItemsCount,
              selectedCount: itemsCount,
              onClick: selectAll,
            })}
        </Stack>
        <Button
          onClick={clear}
          size="small"
          startIcon="Update"
          variant="transparent"
        >
          {clearText}
        </Button>
      </Stack>

      <Stack gap={4} justifyContent="space-between" padding={{ y: 5, x: 7 }}>
        {actions(
          {
            allSelected,
            hasSelection,
            itemsCount,
            selectedIds,
            unselectedIds,
          },
          { clear, selectAll },
        )}
      </Stack>
    </Stack>,
    3,
  );
};
TableBatchActions.Action = BatchAction;
TableBatchActions.Actions = BatchActions;
TableBatchActions.AsideActions = BatchAsideActions;
TableBatchActions.DropdownAction = BatchDropdownAction;
TableBatchActions.MainActions = BatchMainActions;
TableBatchActions.MoreActions = BatchMoreActions;

export default TableBatchActions;
