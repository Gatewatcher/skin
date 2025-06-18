import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { isString } from '@gatewatcher/bistoury/utils-lang';
import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useReducer,
} from 'react';

import DrawerPanel from './components/DrawerPanel';
import LayoutProvider from './components/LayoutProvider';
import MainPanel from './components/MainPanel';
import Close from './compounds/Close';
import Maximize from './compounds/Maximize';
import { useOnResizeElement } from './hooks';
import { actions, drawerV2Reducer } from './reducer';

import styles from './styles.module.scss';

export type PanelLayoutProps = {
  containerClassName?: string;
  containerStyle?: CSSProperties;
  contentPanelMinWidth?: number;
  drawerContent?: ReactNode;
  drawerMaxWidth?: number | `${number}%`;
  drawerMinWidth?: number;
  initialDrawerWidth?: number;
  mainContent?: ReactNode;
  onCloseDrawer?: () => void;
  showDrawer?: boolean;
  onResize?: (width: number) => void;
};

const PanelLayout = ({
  containerClassName,
  containerStyle,
  contentPanelMinWidth = 0,
  drawerContent,
  drawerMaxWidth = Infinity,
  drawerMinWidth = 0,
  initialDrawerWidth = 0,
  mainContent,
  onCloseDrawer = () => {},
  showDrawer,
  onResize = () => {},
}: PanelLayoutProps) => {
  const [state, dispatch] = useReducer(drawerV2Reducer, {
    computedMaxWidth: 0,
    computedMinWidth: 0,
    containerWidth: 0,
    defaultDrawerWidth: 0,
    drawerMaxWidth,
    drawerMinWidth,
    drawerWidth: initialDrawerWidth,
    isMaximized: false,
  });

  useEffect(() => {
    if (showDrawer) {
      dispatch(actions.setDrawerWidth(initialDrawerWidth));
    }
  }, [showDrawer, initialDrawerWidth]);

  const container = useOnResizeElement(rect => {
    dispatch(
      actions.setContainerWidth(Math.min(rect?.width ?? initialDrawerWidth)),
    );
  });

  if (drawerMaxWidth !== state.drawerMaxWidth) {
    dispatch(actions.setDrawerMaxWidth(drawerMaxWidth));
  }
  if (drawerMinWidth !== state.drawerMinWidth) {
    dispatch(actions.setDrawerMinWidth(drawerMinWidth));
  }

  const drawerWidth = showDrawer ? state.drawerWidth : 0;
  const contentPanelWidth = Math.max(state.containerWidth - drawerWidth, 0);
  const drawerStickToContainerEdge =
    state.isMaximized && state.drawerWidth === state.containerWidth;

  const isContentPanelTooNarrow = contentPanelWidth < contentPanelMinWidth;
  const contentInnerWidth = isContentPanelTooNarrow
    ? contentPanelMinWidth
    : '100%';

  const onResizeHandler = (width: number) => {
    dispatch(actions.setDrawerWidth(width));
    onResize(width);
  };

  return (
    <LayoutProvider
      isMaximized={state.isMaximized}
      isMinimized={Math.round(state.drawerWidth) === 0}
      maximize={() => dispatch(actions.maximizeDrawer())}
      minimize={() => dispatch(actions.minimizeDrawer())}
      onClose={onCloseDrawer}
    >
      <div
        ref={container.setElement}
        className={classNames(styles.Container, containerClassName)}
        data-testid="container"
        style={containerStyle}
      >
        <MainPanel
          innerWidth={
            isString(contentInnerWidth)
              ? contentInnerWidth
              : Math.min(contentInnerWidth, state.containerWidth)
          }
        >
          {mainContent}
        </MainPanel>
        {showDrawer && !!state.containerWidth && (
          <DrawerPanel
            onResize={onResizeHandler}
            stickToContainerEdge={drawerStickToContainerEdge}
            widthPx={state.drawerWidth}
          >
            {drawerContent}
          </DrawerPanel>
        )}
      </div>
    </LayoutProvider>
  );
};

PanelLayout.Close = Close;
PanelLayout.Maximize = Maximize;

export default PanelLayout;
