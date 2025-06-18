import { consoleWarn } from '@gatewatcher/bistoury/utils-log';
import type { CSSProperties } from 'react';

import type { BreakpointProp } from '@/types';
import {
  buildCssBreakpointVariables,
  buildCssVariable,
  buildGapStyles,
  validateBreakpointProp,
} from '@/utils';

import type { BuildCssVariablesOptions } from './types';

const clampToGreaterThan1 = (value: number) => Math.max(value, 1).toString();
const breakpointValueGreaterThan0 = (prop?: BreakpointProp) =>
  validateBreakpointProp(prop, value => parseInt(value.toString(), 10) > 0);

export const buildCssVariables = ({
  alignSelf,
  alignItems,
  colSpan,
  column,
  columns,
  columnsMaxSize,
  columnsMinSize,
  gap,
  isContainer,
  isItem,
  justifyContent,
  repeatAuto,
  row,
  rows,
  rowSpan,
}: BuildCssVariablesOptions): CSSProperties => {
  if (
    !breakpointValueGreaterThan0(colSpan) ||
    !breakpointValueGreaterThan0(columns) ||
    !breakpointValueGreaterThan0(rowSpan)
  ) {
    consoleWarn('invalid breakpoint prop');
  }

  return {
    ...(isContainer &&
      columns &&
      buildCssBreakpointVariables(
        'grid-columns',
        columns,
        clampToGreaterThan1,
      )),
    ...(isContainer &&
      rows &&
      buildCssBreakpointVariables('grid-rows', rows, clampToGreaterThan1)),
    ...(isContainer &&
      alignItems &&
      buildCssBreakpointVariables('grid-align-items', alignItems)),
    ...(isContainer &&
      justifyContent &&
      buildCssBreakpointVariables('grid-justify-content', justifyContent)),
    ...(isItem && column && buildCssBreakpointVariables('grid-column', column)),
    ...(isItem && row && buildCssBreakpointVariables('grid-row', row)),
    ...(isItem &&
      alignSelf &&
      buildCssBreakpointVariables('grid-align-self', alignSelf)),
    ...(isItem &&
      colSpan &&
      buildCssBreakpointVariables(
        'grid-col-span',
        colSpan,
        clampToGreaterThan1,
      )),
    ...(isItem &&
      rowSpan &&
      buildCssBreakpointVariables(
        'grid-row-span',
        rowSpan,
        clampToGreaterThan1,
      )),
    ...(isContainer &&
      columnsMinSize && {
        ...buildCssVariable('grid-columns-min-size', columnsMinSize),
        ...buildCssVariable('grid-columns-max-size', columnsMaxSize),
        ...buildCssVariable(
          'grid-repeat',
          repeatAuto,
          value => `auto-${value}`,
        ),
      }),
    ...(gap && buildGapStyles('grid-gap', gap)),
  };
};
