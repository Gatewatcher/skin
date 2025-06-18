import type { DrawerMatches } from './types';

export const DEFAULT_DRAWER_METHOD_REF = () => {};
export const IS_INITIAL_OPENED = false;
export const MAX_SIZE = 99;
export const MIN_SIZE_PERCENTAGE = 30;
export const SPACING_OFFSET = 0;
export const STORAGE_KEY = 'skin-drawer-isOpened';
export const DEFAULT_MATCHES: DrawerMatches = {};
export const DEFAULT_WITH_ESCAPE = true;
export const DEFAULT_URL_KEY = 'drawer';

export const DRAWER_CLOSE_EVERYWHERE = /.*/;
export const DRAWER_KEEP_EVERYWHERE = /.*/;

export const MAXIMIZE_SIZES = ['full', 'large', 'medium', 'small'] as const;
