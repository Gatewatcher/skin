import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';
import { useState } from 'react';

import { useListingEditionContext } from '@/skin/listings/Listing/context';
import { useEdition } from '@/skin/listings/Listing/hooks';

import TableActionButton from '../ActionButton';

export type TableActionCellEditProps = DataTestId & {
  children?: ReactNode;
  id: string | number;
};

const TableActionEdit = ({
  children = 'Edit',
  'data-testid': testId = 'table-action-cell-edit',
  id,
  ...rest
}: TableActionCellEditProps) => {
  const { editingIds } = useListingEditionContext();

  const [isEditing, setIsEditing] = useState(
    editingIds.includes(id.toString()),
  );
  const { addItem, removeItem } = useEdition();

  const toggleMode = () => {
    const method = isEditing ? removeItem : addItem;
    method(id.toString());
    setIsEditing(prev => !prev);
  };

  return (
    <TableActionButton
      data-testid={testId}
      icon={isEditing ? 'Check' : 'Edit'}
      onClick={toggleMode}
      {...(isEditing && { type: 'info' })}
      {...rest}
    >
      {children}
    </TableActionButton>
  );
};

export default TableActionEdit;
