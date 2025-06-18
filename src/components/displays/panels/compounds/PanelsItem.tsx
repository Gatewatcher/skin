// Forked from https://github.com/bvaughn/react-resizable-panels
import { useIsomorphicEffect, useUniqueId } from '@gatewatcher/bistoury/hooks';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type {
  CSSProperties,
  ElementType,
  ForwardedRef,
  ReactNode,
} from 'react';
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

import { PanelsGroupContext } from '../PanelsGroupContext';
import type { PanelOnCollapse, PanelOnResize } from '../types';

export type PanelsItemProps = DataTestId & {
  children?: ReactNode;
  className?: string;
  collapsible?: boolean;
  defaultSize?: number | null;
  id?: string | null;
  maxSize?: number;
  minSize?: number;
  onCollapse?: PanelOnCollapse | null;
  onResize?: PanelOnResize | null;
  order?: number | null;
  style?: CSSProperties;
  as?: ElementType;
};

export type ImperativePanelHandle = {
  collapse: () => void;
  expand: () => void;
  getCollapsed(): boolean;
  getSize(): number;
  resize: (percentage: number) => void;
};

const PanelsItemWithForwardedRef = ({
  children = null,
  className: classNameFromProps = '',
  collapsible = false,
  defaultSize = null,
  forwardedRef,
  id: idFromProps = null,
  maxSize = 100,
  minSize = 10,
  onCollapse = null,
  onResize = null,
  order = null,
  style: styleFromProps = {},
  as: Component = 'div',
  'data-testid': testId = 'panels-item',
}: PanelsItemProps & {
  forwardedRef: ForwardedRef<ImperativePanelHandle>;
}) => {
  const context = useContext(PanelsGroupContext);
  if (context === null) {
    throw Error(
      `Panel components must be rendered within a PanelGroup container`,
    );
  }

  const panelId = useUniqueId(idFromProps);

  const {
    collapsePanel,
    expandPanel,
    getPanelStyle,
    registerPanel,
    resizePanel,
    unregisterPanel,
  } = context;

  // Use a ref to guard against users passing inline props
  const callbacksRef = useRef<{
    onCollapse: PanelOnCollapse | null;
    onResize: PanelOnResize | null;
  }>({ onCollapse, onResize });
  useEffect(() => {
    callbacksRef.current.onCollapse = onCollapse;
    callbacksRef.current.onResize = onResize;
  });

  // Basic props validation
  if (minSize < 0 || minSize > 100) {
    throw Error(`Panel minSize must be between 0 and 100, but was ${minSize}`);
  } else if (maxSize < 0 || maxSize > 100) {
    throw Error(`Panel maxSize must be between 0 and 100, but was ${maxSize}`);
  } else {
    if (defaultSize !== null) {
      if (defaultSize < 0 || defaultSize > 100) {
        throw Error(
          `Panel defaultSize must be between 0 and 100, but was ${defaultSize}`,
        );
      } else if (minSize > defaultSize && !collapsible) {
        console.error(
          `Panel minSize ${minSize} cannot be greater than defaultSize ${defaultSize}`,
        );

        defaultSize = minSize;
      }
    }
  }

  useIsomorphicEffect(() => {
    const panel = {
      callbacksRef,
      collapsible,
      defaultSize,
      id: panelId,
      maxSize,
      minSize,
      order,
    };

    registerPanel(panelId, panel);

    return () => {
      unregisterPanel(panelId);
    };
  }, [
    collapsible,
    defaultSize,
    panelId,
    maxSize,
    minSize,
    order,
    registerPanel,
    unregisterPanel,
  ]);

  const style = getPanelStyle(panelId);

  const committedValuesRef = useRef<{
    size: number;
  }>({
    size: parseSizeFromStyle(style),
  });
  useIsomorphicEffect(() => {
    committedValuesRef.current.size = parseSizeFromStyle(style);
  });

  useImperativeHandle(
    forwardedRef,
    () => ({
      collapse: () => collapsePanel(panelId),
      expand: () => expandPanel(panelId),
      getCollapsed() {
        return committedValuesRef.current.size === 0;
      },
      getSize() {
        return committedValuesRef.current.size;
      },
      resize: (percentage: number) => resizePanel(panelId, percentage),
    }),
    [collapsePanel, expandPanel, panelId, resizePanel],
  );

  return (
    <Component
      style={{
        ...style,
        ...styleFromProps,
      }}
      className={classNameFromProps}
      data-panel=""
      data-panel-collapsible={collapsible}
      data-panel-id={panelId}
      data-panel-size={parseFloat('' + style.flexGrow).toFixed(1)}
      data-testid={testId}
      id={`data-panel-id-${panelId}`}
    >
      {children}
    </Component>
  );
};

const PanelsItem = forwardRef<ImperativePanelHandle, PanelsItemProps>(
  (props: PanelsItemProps, ref: ForwardedRef<ImperativePanelHandle>) => (
    <PanelsItemWithForwardedRef {...props} forwardedRef={ref} />
  ),
);

function parseSizeFromStyle(style: CSSProperties): number {
  const { flexGrow } = style;
  if (typeof flexGrow === 'string') {
    return parseFloat(flexGrow);
  } else {
    return flexGrow || 0;
  }
}

export default PanelsItem;
