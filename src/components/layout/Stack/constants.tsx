import type { BreakpointProp, HTMLTagName } from '@/types';

import { LAYOUT_ALIGN_ITEMS, LAYOUT_JUSTIFY_CONTENT } from '../constants';

export const STACK_DIRECTIONS = [
  'row',
  'row-reverse',
  'column',
  'column-reverse',
] as const;
export const STACK_ALIGN_ITEMS = LAYOUT_ALIGN_ITEMS;
export const STACK_JUSTIFY_CONTENT = LAYOUT_JUSTIFY_CONTENT;
export const STACK_WRAP = ['wrap', 'nowrap', 'wrap-reverse'] as const;
export const STACK_ALIGN_SELF = [
  'auto',
  'flex-start',
  'flex-end',
  'center',
  'baseline',
  'stretch',
] as const;

export const DEFAULT_GAP: BreakpointProp = 0;
export const DEFAULT_AS: HTMLTagName = 'div';
