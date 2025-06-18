import { classNames } from '@gatewatcher/bistoury/utils-dom';
import {
  isDefined,
  isObject,
  isString,
} from '@gatewatcher/bistoury/utils-lang';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import { withStopPropagation } from 'hocs/withStopPropagation';
import type { ReactNode } from 'react';

import type { FloatingActionsProps } from '@/skin/actions';
import { FloatingActions } from '@/skin/actions';
import { Text } from '@/skin/typography';

import { useTableContext } from '../contexts';

import styles from '../styles.module.scss';

export type TableCellProps = DataTestId & {
  actions?: FloatingActionsProps['content'];
  children: ReactNode;
  fit?: boolean;
  isMuted?: boolean;
  maxWidth?: number;
  minWidth?: number;
  width?: number;
  withStopPropagation?: boolean;
  columnKey?: string;
};

const TableCell = ({
  actions,
  children,
  'data-testid': testId = 'table-cell',
  fit,
  isMuted,
  maxWidth,
  minWidth,
  width,
  withStopPropagation: withStopPropagationProps,
  columnKey,
}: TableCellProps) => {
  const { emptyCellFallback, getPinnedStyles, isPinned } = useTableContext();

  let content: ReactNode =
    !isObject(children) && isDefined(children) && typeof children !== 'boolean'
      ? String(children)
      : children;

  if (!content && emptyCellFallback?.current) {
    content = emptyCellFallback.current;
  }

  const cellComponent = (
    <td
      className={classNames(
        styles.Borders,
        styles.Cell,
        fit && styles.CellFit,
        isMuted && styles.CellMuted,
        styles.CellMinWidth,
        columnKey !== undefined && isPinned(columnKey)
          ? styles.pinnedCell
          : undefined,
      )}
      style={{
        maxWidth,
        minWidth,
        width,
        ...(columnKey !== undefined && getPinnedStyles(columnKey)),
      }}
      data-testid={testId}
    >
      {actions ? (
        <FloatingActions content={actions} placement="top-start">
          {content}
        </FloatingActions>
      ) : isString(content) ? (
        <Text>{content}</Text>
      ) : (
        content
      )}
    </td>
  );

  return withStopPropagationProps
    ? withStopPropagation(cellComponent)
    : cellComponent;
};

export default TableCell;
