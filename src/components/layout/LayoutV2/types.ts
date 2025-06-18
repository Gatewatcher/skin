import type { DrawerMatches } from '@/skin/displays/panels/DrawerV2';

export type DrawerConfig = {
  initialWidth?: number;
  mainContentMinWidth?: number;
  matches?: DrawerMatches;
  minWidth?: number;
};

export type SidePanelConfig = {
  width?: number;
};
