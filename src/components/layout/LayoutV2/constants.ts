import type { DrawerConfig, SidePanelConfig } from './types';

export const DEFAULT_DRAWER_CONFIG: Required<DrawerConfig> = {
  initialWidth: 600,
  mainContentMinWidth: 1920,
  matches: {},
  minWidth: 600,
};

export const DEFAULT_SIDE_PANEL_CONFIG: Required<SidePanelConfig> = {
  width: 500,
};

export const LAYOUT_COLUMNS = { xs: 6, xl: 8 };

export const LAYOUT_GAPS = {
  xs: 7, // expect 16px
  xl: 9, // expect 24px
};

export const LAYOUT_CONTENT_GRID_PADDINGS = {
  xs: 9, // expect 24px
  xxl: 13, // expect 40px/80px
};
