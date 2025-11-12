import type { CSSProperties } from 'react';

import type { DrawerMatches } from '@/skin/displays/drawerPanels/DrawerV2';

export type DrawerConfig = {
  initialWidth?: number;
  mainContentMinWidth?: number;
  matches?: DrawerMatches;
  minWidth?: number;
};

export type SidePanelConfig = {
  width?: number;
};

export type MainContentConfig = {
  height?: CSSProperties['height'];
};
