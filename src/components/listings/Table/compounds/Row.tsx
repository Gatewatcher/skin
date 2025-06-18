import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { isFunction } from '@gatewatcher/bistoury/utils-lang';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import { useSingleAndDoubleClick } from 'hooks/useSingleAndDoubleClick';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';

import {
  useListingBatchSelectionContext,
  useListingEditionContext,
} from '../../Listing/context';

import styles from '../styles.module.scss';

type RenderProps = {
  editing: boolean;
  selected: boolean;
  hovering: boolean;
};

export type TableRowProps = DataTestId & {
  children: ReactNode | ((props: RenderProps) => ReactNode);
  id: number | string;
  onClick?: () => void;
  onDoubleClick?: () => void;
};

const TableRow = ({
  children,
  'data-testid': testId = 'table-row',
  id,
  onClick,
  onDoubleClick,
}: TableRowProps) => {
  const { editingIds } = useListingEditionContext();
  const { selectedIds } = useListingBatchSelectionContext();

  const [isHovering, setIsHovering] = useState(false);

  const [handleSingleClick, handleDoubleClick] = useSingleAndDoubleClick({
    onClick,
    onDoubleClick,
  });

  const renderProps = useMemo<RenderProps>(
    () => ({
      editing: editingIds.includes(id.toString()),
      selected: selectedIds.includes(id.toString()),
      hovering: isHovering,
    }),
    [editingIds, selectedIds, id, isHovering],
  );

  return (
    <tr
      key={id}
      className={classNames(
        styles.Row,
        onClick && styles.RowClickable,
        renderProps.selected && styles.RowSelected,
      )}
      data-testid={testId}
      onClick={handleSingleClick}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isFunction(children) ? children(renderProps) : children}
    </tr>
  );
};

export default TableRow;
