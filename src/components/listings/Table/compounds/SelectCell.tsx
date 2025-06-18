import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ChangeEvent } from 'react';

import { Form, Input } from '@/skin/forms';
import type { FieldProps } from '@/skin/forms/Form/compounds/Field';

import { useListingBatchSelectionContext } from '../../Listing/context';
import { useBatchSelection } from '../../Listing/hooks';
import TableCell from './Cell';

export type TableSelectCellProps = DataTestId & {
  field?:
    | boolean
    | (Omit<FieldProps, 'type'> & { type?: 'checkbox' | 'radio' });
  id: string | number;
  columnKey?: string;
};

const TableSelectCell = ({
  'data-testid': testId = 'table-select-cell',
  field,
  id,
  columnKey,
}: TableSelectCellProps) => {
  const { allSelected, selectedIds, unselectedIds } =
    useListingBatchSelectionContext();
  const { addItem, removeItem, addUnselectedItem, removeUnselectedItem } =
    useBatchSelection();

  const checked = allSelected
    ? !unselectedIds.includes(id.toString())
    : selectedIds.includes(id.toString());

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (allSelected) {
      const unselectedMethod = checked
        ? addUnselectedItem
        : removeUnselectedItem;
      unselectedMethod(id.toString());
    } else {
      const method = e.target.checked ? addItem : removeItem;
      method(id.toString());
    }
  };

  const content = (
    <Input.Checkbox
      checked={checked}
      onChange={handleChange}
      value={id.toString()}
    />
  );

  return (
    <TableCell
      columnKey={columnKey}
      data-testid={testId}
      fit
      withStopPropagation
    >
      {field ? (
        <Form.Field {...(field === true ? { name: id } : field)} type="checked">
          {content}
        </Form.Field>
      ) : (
        content
      )}
    </TableCell>
  );
};

export default TableSelectCell;
