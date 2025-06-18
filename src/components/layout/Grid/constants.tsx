import type { HTMLTagName } from '@/types';

import {
  LAYOUT_ALIGN_ITEMS,
  LAYOUT_ALIGN_SELF,
  LAYOUT_JUSTIFY_CONTENT,
} from '../constants';
import type { Gap, GridRepeatAuto } from './types';

export const GRID_REPEAT = ['fill', 'fit'] as const;

export const DEFAULT_GAP: Gap = 6;
export const DEFAULT_REPEAT_AUTO: GridRepeatAuto = 'fit';
export const DEFAULT_COLUMNS_MAX_SIZE = '1fr';
export const DEFAULT_AS: HTMLTagName = 'div';
export const GRID_ALIGN_ITEMS = LAYOUT_ALIGN_ITEMS;
export const GRID_ALIGN_SELF = LAYOUT_ALIGN_SELF;
export const GRID_JUSTIFY_CONTENT = LAYOUT_JUSTIFY_CONTENT;
