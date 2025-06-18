import type { BreakpointProp } from '@/types';

import type {
  LAYOUT_ALIGN_ITEMS,
  LAYOUT_ALIGN_SELF,
  LAYOUT_JUSTIFY_CONTENT,
} from '../constants';
import type { GRID_REPEAT } from './constants';

export type GridAlignItems = typeof LAYOUT_ALIGN_ITEMS[number];
export type GridAlignSelf = typeof LAYOUT_ALIGN_SELF[number];
export type GridJustifyContent = typeof LAYOUT_JUSTIFY_CONTENT[number];

type NotAContainerProps = {
  alignItems?: never;
  columns?: never;
  columnsMaxSize?: never;
  columnsMinSize?: never;
  gap?: never;
  isContainer?: boolean;
  justifyContent?: never;
  repeatAuto?: never;
  rows?: never;
  withEqualWidthColumns?: never;
};
type IsAContainerProps = {
  alignItems?: GridAlignItems;
  columns?: BreakpointProp;
  columnsMaxSize?: string;
  columnsMinSize?: string;
  gap?: Gap;
  isContainer: true;
  justifyContent?: GridJustifyContent;
  repeatAuto?: GridRepeatAuto;
  rows?: BreakpointProp;
  withEqualWidthColumns?: boolean;
};
export type ContainerProps = NotAContainerProps | IsAContainerProps;

type NotAnItemProps = {
  alignSelf?: never;
  colSpan?: never;
  column?: never;
  fill?: never;
  isItem?: boolean;
  row?: never;
  rowSpan?: never;
};
type IsAnItemProps = {
  alignSelf?: GridAlignSelf;
  colSpan?: BreakpointProp;
  column?: BreakpointProp<string>;
  fill?: boolean;
  isItem: true;
  row?: BreakpointProp<string>;
  rowSpan?: BreakpointProp;
};
export type ItemProps = NotAnItemProps | IsAnItemProps;

export type GridRepeatAuto = typeof GRID_REPEAT[number];

export type GapXY = { x?: BreakpointProp; y?: BreakpointProp };
export type Gap = BreakpointProp | GapXY;

export type BuildCssVariablesOptions = Omit<IsAnItemProps, 'isItem'> &
  Omit<IsAContainerProps, 'isContainer'> & {
    isContainer?: boolean;
    isItem?: boolean;
  };
