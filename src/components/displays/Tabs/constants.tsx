import type { TabId } from './types';

export const DEFAULT_TAB: TabId = 0;
export const DEFAULT_ON_TAB_CHANGE = () => {};
export const TITLE_LIST_VARIANTS = [
  'primary',
  'secondary',
  'main',
  'pills',
] as const;
