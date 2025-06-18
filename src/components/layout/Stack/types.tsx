import type { BreakpointProp } from '@/types';

import type { Gap } from '../Grid/types';
import type {
  STACK_ALIGN_ITEMS,
  STACK_ALIGN_SELF,
  STACK_DIRECTIONS,
  STACK_JUSTIFY_CONTENT,
  STACK_WRAP,
} from './constants';

export type StackDirection = typeof STACK_DIRECTIONS[number];
export type StackAlignItems = typeof STACK_ALIGN_ITEMS[number];
export type StackJustifyContent = typeof STACK_JUSTIFY_CONTENT[number];
export type StackWrap = typeof STACK_WRAP[number];
export type StackAlignSelf = typeof STACK_ALIGN_SELF[number];

export type StackContainerProperties = {
  alignContent?: BreakpointProp<StackAlignItems>;
  alignItems?: BreakpointProp<StackAlignItems>;
  direction?: BreakpointProp<StackDirection>;
  flexGrow?: BreakpointProp;
  gap?: Gap;
  justifyContent?: BreakpointProp<StackJustifyContent>;
  wrap?: BreakpointProp<StackWrap>;
};

export type StackItemProperties = {
  alignSelf?: BreakpointProp<StackAlignSelf>;
  flex?: BreakpointProp<string>;
  flexBasis?: BreakpointProp<string>;
  flexGrow?: BreakpointProp;
  flexShrink?: BreakpointProp;
  order?: BreakpointProp;
};

export type CssVariables = StackContainerProperties & StackItemProperties;
