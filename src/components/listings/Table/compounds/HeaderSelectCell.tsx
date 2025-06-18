import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';

import { Input } from '@/skin/forms';
import { useLoadMoreContext } from '@/skin/pagination/LoadMore/context';

import type { IdExtractor } from '../../Listing/compounds/BatchSelect/types';
import { useListingBatchSelectionContext } from '../../Listing/context';
import { useBatchSelection } from '../../Listing/hooks';
import { DEFAULT_BATCH_SELECT_ID_EXTRACTOR } from '../constants';
import type { Settings } from '../types';
import TableHeaderCell from './HeaderCell';

export type TableHeaderSelectCellProps = DataTestId & {
  idExtractor?: IdExtractor;
  settings?: Settings;
};

const TableHeaderSelectCell = ({
  'data-testid': testId = 'table-header-select-cell',
  idExtractor = DEFAULT_BATCH_SELECT_ID_EXTRACTOR,
  settings,
}: TableHeaderSelectCellProps) => {
  const { hasSelection, selectedIds, allSelected, unselectedIds } =
    useListingBatchSelectionContext();
  const { data = [], isLoading } = useLoadMoreContext();
  const { addAll, removeAll, addAllUnselected, removeAllUnselected } =
    useBatchSelection();
  const { isError } = useLoadMoreContext();

  const [checked, setChecked] = useState(false);

  const ids = data.map(idExtractor) as string[];
  const pageSelected = ids.every(id => selectedIds.includes(id.toString()));

  const indeterminate =
    !checked &&
    (ids.some(id => selectedIds.includes(id.toString())) ||
      (allSelected && !ids.every(id => unselectedIds.includes(id.toString()))));

  useEffect(() => {
    if (!hasSelection) {
      setChecked(false);
    }

    setChecked(
      (!!selectedIds.length && pageSelected) ||
        (allSelected && !unselectedIds.length),
    );
  }, [hasSelection, selectedIds, pageSelected, allSelected, unselectedIds]);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setChecked(ev.target.checked);

    if (allSelected) {
      const unselectMethod = checked ? addAllUnselected : removeAllUnselected;
      unselectMethod(idExtractor);
    } else {
      const method = ev.target.checked ? addAll : removeAll;
      method(idExtractor);
    }
  };

  const isEmpty = !data.length;
  const hiddenCheckbox = (isEmpty && !isLoading) || isError;

  return (
    <TableHeaderCell
      settings={{
        isResizable: false,
        ...settings,
      }}
      data-testid={testId}
    >
      {!hiddenCheckbox && (
        <Input.Checkbox
          checked={checked}
          disabled={isLoading}
          indeterminate={indeterminate}
          onChange={handleChange}
        />
      )}
    </TableHeaderCell>
  );
};

export default TableHeaderSelectCell;
