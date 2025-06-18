import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type {
  DataTestId,
  RequiredAtLeastOne,
} from '@gatewatcher/bistoury/utils-types';
import type { CSSProperties, ElementType, ReactNode } from 'react';

import type { Spacings } from '@/hocs';
import { withSpacing } from '@/hocs';

import {
  DEFAULT_AS,
  DEFAULT_COLUMNS_MAX_SIZE,
  DEFAULT_GAP,
  DEFAULT_REPEAT_AUTO,
} from './constants';
import type { ContainerProps, GridRepeatAuto, ItemProps } from './types';
import { buildCssVariables } from './utils';

import styles from './styles.module.scss';

export type GridProps = DataTestId &
  Spacings &
  ContainerProps &
  ItemProps &
  RequiredAtLeastOne<ItemProps & ContainerProps, 'isContainer' | 'isItem'> & {
    as?: ElementType;
    children: ReactNode;
    className?: string;
    columnsMaxSize?: string;
    columnsMinSize?: string;
    repeatAuto?: GridRepeatAuto;
    style?: CSSProperties;
  };

const Grid = ({
  alignSelf,
  alignItems,
  as: Component = DEFAULT_AS,
  children,
  className,
  column,
  columns,
  columnsMaxSize = DEFAULT_COLUMNS_MAX_SIZE,
  columnsMinSize,
  colSpan,
  'data-testid': testId = 'grid',
  fill,
  gap = DEFAULT_GAP,
  isContainer,
  isItem,
  justifyContent,
  repeatAuto = DEFAULT_REPEAT_AUTO,
  rows,
  row,
  rowSpan,
  style,
  withEqualWidthColumns,
  ...spacings
}: GridProps) => {
  const cssVariables = buildCssVariables({
    alignSelf,
    alignItems,
    colSpan,
    column,
    columns,
    columnsMinSize,
    columnsMaxSize,
    gap,
    isContainer,
    isItem,
    justifyContent,
    repeatAuto,
    rows,
    row,
    rowSpan,
  });

  return withSpacing(
    <Component
      className={classNames(
        isContainer && {
          [styles.Grid]: true,
          [styles.columns]: columns,
          [styles.rows]: rows,
          [styles.gap]: gap,
          [styles.minmax]: columnsMinSize,
          [styles.alignItems]: alignItems,
          [styles.justifyContent]: justifyContent,
          [styles.columnsEqualWidth]: withEqualWidthColumns,
        },
        isItem && {
          [styles.alignSelf]: alignSelf,
          [styles.column]: column,
          [styles.colSpan]: colSpan,
          [styles.fill]: fill,
          [styles.row]: row,
          [styles.rowSpan]: rowSpan,
        },
        className,
      )}
      data-testid={suffixTestId(testId, isContainer ? 'container' : 'item')}
      style={{ ...style, ...cssVariables }}
    >
      {children}
    </Component>,
    spacings,
  );
};

export default Grid;
