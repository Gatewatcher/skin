import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';
import { Children, useMemo } from 'react';
import { getThemeSpacing } from 'utils/theme';

import { ButtonIcon } from '@/skin/actions';
import type { DropdownProps } from '@/skin/displays';
import { Dropdown } from '@/skin/displays';

import { TableActionsContext } from '../contexts';
import TableCell from './Cell';

import styles from '../styles.module.scss';

export type TableActions = DataTestId &
  Pick<DropdownProps, 'onClose' | 'onOpen'> & {
    children: ReactNode;
    asDropdown?: boolean;
    columnKey?: string;
  };

const TableActions = ({
  children,
  'data-testid': testId = 'table-actions',
  asDropdown,
  onClose,
  onOpen,
  columnKey,
}: TableActions) => {
  const items = Children.toArray(children);

  const contextValue = useMemo(
    () => ({
      hasOnlyOneAction: items.length === 1 && !asDropdown,
    }),
    [items.length, asDropdown],
  );

  if (!items.length) return null;

  return (
    <TableActionsContext.Provider value={contextValue}>
      <TableCell
        columnKey={columnKey}
        data-testid={testId}
        fit
        withStopPropagation
      >
        {items.length > 1 || asDropdown ? (
          <Dropdown
            className={styles.ActionsCellDropdown}
            content={items}
            data-testid={suffixTestId(testId, 'dropdown')}
            offset={parseInt(getThemeSpacing(4, 'px'), 10)}
            onClose={onClose}
            onOpen={onOpen}
            placement="bottom-end"
            triggerOn="click"
            withStopPropagation
          >
            <ButtonIcon
              icon="OverflowMenuHorizontal"
              type="neutral"
              variant="ghosted"
            />
          </Dropdown>
        ) : (
          items
        )}
      </TableCell>
    </TableActionsContext.Provider>
  );
};

export default TableActions;
