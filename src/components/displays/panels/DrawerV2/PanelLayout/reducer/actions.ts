import type { DrawerV2Action } from './types';

export const setContainerWidth = (width: number): DrawerV2Action => ({
  type: 'setContainerWidth',
  payload: width,
});

export const setDrawerWidth = (width: number): DrawerV2Action => ({
  type: 'setDrawerWidth',
  payload: width,
});

export const setDrawerMaxWidth = (
  maxWidth: number | `${number}%`,
): DrawerV2Action => ({
  type: 'setDrawerMaxWidth',
  payload: maxWidth,
});

export const setDrawerMinWidth = (minWidth: number): DrawerV2Action => ({
  type: 'setDrawerMinWidth',
  payload: minWidth,
});

export const maximizeDrawer = (): DrawerV2Action => ({
  type: 'maximizeDrawer',
});

export const minimizeDrawer = (): DrawerV2Action => ({
  type: 'minimizeDrawer',
});
