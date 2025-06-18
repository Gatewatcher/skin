import { clamp, isNumber } from '@gatewatcher/bistoury/utils-lang';

import { convertSizePxOrPercentToPx } from '../utils';
import type { DrawerV2Action, DrawerV2State } from './types';

export const drawerV2Reducer = (
  state: DrawerV2State,
  action: DrawerV2Action,
): DrawerV2State => {
  switch (action.type) {
    case 'setContainerWidth':
      // 1. set container width
      // 2. adjust drawer min and max width
      // 3. adjust drawer width

      if (action.payload !== state.containerWidth) {
        const computedMaxWidth = Math.min(
          action.payload,
          convertSizePxOrPercentToPx(state.drawerMaxWidth, action.payload),
        );
        const computedMinWidth = Math.min(
          state.drawerMinWidth,
          computedMaxWidth,
        );
        const drawerWidth = state.isMaximized
          ? computedMaxWidth
          : clamp(state.drawerWidth, computedMinWidth, computedMaxWidth);

        return {
          ...state,
          computedMaxWidth,
          computedMinWidth,
          containerWidth: action.payload,
          drawerWidth,
        };
      }
      break;

    case 'setDrawerMaxWidth':
      // 1. adjust computed max width
      // 2. adjust drawer width

      if (action.payload !== state.drawerMaxWidth) {
        const computedMaxWidth = Math.min(
          convertSizePxOrPercentToPx(action.payload, state.containerWidth),
          state.containerWidth,
        );
        const drawerWidth = clamp(
          state.drawerWidth,
          state.computedMinWidth,
          computedMaxWidth,
        );

        return {
          ...state,
          computedMaxWidth,
          drawerMaxWidth: action.payload,
          drawerWidth,
        };
      }
      break;

    case 'setDrawerMinWidth':
      // 1. adjust computed min width
      // 2. adjust drawer width

      if (action.payload !== state.drawerMinWidth) {
        const computedMinWidth = Math.min(
          action.payload,
          state.computedMaxWidth,
        );
        const drawerWidth = clamp(
          state.drawerWidth,
          computedMinWidth,
          state.computedMaxWidth,
        );

        return {
          ...state,
          computedMinWidth,
          drawerWidth,
          drawerMinWidth: action.payload,
        };
      }
      break;

    case 'setDrawerWidth':
      if (isNumber(action.payload)) {
        const computedWidth = clamp(
          action.payload,
          state.computedMinWidth,
          state.computedMaxWidth,
        );

        if (computedWidth !== state.drawerWidth) {
          return {
            ...state,
            drawerWidth: computedWidth,
            isMaximized: false,
          };
        }
      }
      break;

    case 'maximizeDrawer':
      if (!state.isMaximized) {
        return {
          ...state,
          drawerWidth: state.computedMaxWidth,
          defaultDrawerWidth: state.drawerWidth,
          isMaximized: true,
        };
      }
      break;

    case 'minimizeDrawer':
      if (state.drawerWidth > state.computedMinWidth) {
        const computedDefaultWidth = clamp(
          state.defaultDrawerWidth,
          state.computedMinWidth,
          state.computedMaxWidth,
        );

        return {
          ...state,
          isMaximized: false,
          drawerWidth: computedDefaultWidth,
        };
      }
      return {
        ...state,
        isMaximized: false,
      };
  }
  return state;
};
