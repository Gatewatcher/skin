export type DrawerV2State = {
  computedMaxWidth: number;
  computedMinWidth: number;
  containerWidth: number;
  defaultDrawerWidth: number;
  drawerMaxWidth: number | `${number}%`;
  drawerMinWidth: number;
  drawerWidth: number;
  isMaximized: boolean;
};

export type DrawerV2Action =
  | {
      type: 'setContainerWidth' | 'setDrawerWidth' | 'setDrawerMinWidth';
      payload: number;
    }
  | {
      type: 'setDrawerMaxWidth';
      payload: number | `${number}%`;
    }
  | {
      type: 'maximizeDrawer' | 'minimizeDrawer';
    };
