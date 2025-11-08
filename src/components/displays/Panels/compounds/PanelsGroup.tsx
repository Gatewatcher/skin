import { useIsomorphicEffect, useUniqueId } from '@gatewatcher/bistoury/hooks';
import { useAsyncDebounce } from '@gatewatcher/bistoury/hooks';
import { areEqual } from '@gatewatcher/bistoury/utils-lang';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import { get, isSupported, set } from '@gatewatcher/bistoury/utils-web-storage';
import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { PanelsGroupContext } from '../PanelsGroupContext';
import { useWindowSplitterPanelGroupBehavior } from '../hooks/useWindowSplitterBehavior';
import type {
  CommittedValues,
  Direction,
  InitialDragState,
  PanelData,
  PanelDataMap,
  PanelGroupOnLayout,
  PanelGroupPersistence,
  ResizeEvent,
} from '../types';
import {
  getDragOffset,
  getMovement,
  isMouseEvent,
  isTouchEvent,
} from '../utils/coordinates';
import { resetGlobalCursorStyle, setGlobalCursorStyle } from '../utils/cursor';
import {
  adjustByDelta,
  callPanelCallbacks,
  getBeforeAndAfterIds,
  getFlexGrow,
  getPanelGroup,
  getResizeHandle,
  getResizeHandlePanelIds,
  panelsMapToSortedArray,
} from '../utils/group';
import { loadPanelLayout, savePanelGroupLayout } from '../utils/serialization';

function throwPersistenceError() {
  throw new Error(
    'PanelGroup "persistence" prop required for server rendering.',
  );
}

const defaultPersistence: PanelGroupPersistence = {
  getItem: isSupported() ? (name: string) => get(name) : throwPersistenceError,
  setItem: isSupported()
    ? (name: string, value: string) => set(name, value)
    : throwPersistenceError,
};

export type PanelsGroupProps = DataTestId & {
  autoSaveId?: string;
  children?: ReactNode;
  className?: string;
  direction: Direction;
  disablePointerEventsDuringResize?: boolean;
  id?: string | null;
  onLayout?: PanelGroupOnLayout;
  persistence?: PanelGroupPersistence;
  style?: CSSProperties;
  as?: ElementType;
};

const PanelsGroup = ({
  autoSaveId,
  children = null,
  className: classNameFromProps = '',
  direction,
  disablePointerEventsDuringResize = false,
  id: idFromProps = null,
  onLayout = () => {},
  persistence = defaultPersistence,
  style: styleFromProps = {},
  as: Component = 'div',
  'data-testid': testId = 'panels-group',
}: PanelsGroupProps) => {
  const groupId = useUniqueId(idFromProps);
  // Limit the frequency of localStorage updates.
  const savePanelGroupLayoutDebounced = useAsyncDebounce(
    savePanelGroupLayout,
    100,
  );

  const [activeHandleId, setActiveHandleId] = useState<string | null>(null);
  const [panels, setPanels] = useState<PanelDataMap>(new Map());

  // When resizing is done via mouse/touch event–
  // We store the initial Panel sizes in this ref, and apply move deltas to them instead of to the current sizes.
  // This has the benefit of causing force-collapsed panels to spring back open if drag is reversed.
  const initialDragStateRef = useRef<InitialDragState | null>(null);

  // Use a ref to guard against users passing inline props
  const callbacksRef = useRef<{
    onLayout: PanelGroupOnLayout | null;
  }>({ onLayout });
  useEffect(() => {
    callbacksRef.current.onLayout = onLayout;
  });

  // 0-1 values representing the relative size of each panel.
  const [sizes, setSizes] = useState<number[]>([]);

  // Used to support imperative collapse/expand API.
  const panelSizeBeforeCollapse = useRef<Map<string, number>>(new Map());

  const prevDeltaRef = useRef<number>(0);

  // Store committed values to avoid unnecessarily re-running memoization/effects functions.
  const committedValuesRef = useRef<CommittedValues>({
    direction,
    panels,
    sizes,
  });

  useIsomorphicEffect(() => {
    committedValuesRef.current.direction = direction;
    committedValuesRef.current.panels = panels;
    committedValuesRef.current.sizes = sizes;
  });

  useWindowSplitterPanelGroupBehavior({
    committedValuesRef,
    groupId,
    panels,
    setSizes,
    sizes,
    panelSizeBeforeCollapse,
  });

  // Notify external code when sizes have changed.
  useEffect(() => {
    const { onLayout } = callbacksRef.current;
    if (onLayout) {
      const { sizes } = committedValuesRef.current;

      // Don't commit layout until all panels have registered and re-rendered with their actual sizes.
      if (sizes.length > 0) {
        onLayout(sizes);
      }
    }
  }, [sizes]);

  // Notify Panel listeners about their initial sizes and collapsed state after mount.
  // Subsequent changes will be called by the resizeHandler.
  const didNotifyCallbacksAfterMountRef = useRef(false);
  useIsomorphicEffect(() => {
    if (didNotifyCallbacksAfterMountRef.current) {
      return;
    }

    const { panels, sizes } = committedValuesRef.current;
    if (sizes.length > 0) {
      didNotifyCallbacksAfterMountRef.current = true;

      const panelsArray = panelsMapToSortedArray(panels);
      callPanelCallbacks(panelsArray, [], sizes);
    }
  }, [sizes]);

  // Once all panels have registered themselves,
  // Compute the initial sizes based on default weights.
  // This assumes that panels register during initial mount (no conditional rendering)!
  useIsomorphicEffect(() => {
    const sizes = committedValuesRef.current.sizes;
    if (sizes.length === panels.size) {
      // Only compute (or restore) default sizes once per panel configuration.
      return;
    }

    // If this panel has been configured to persist sizing information,
    // default size should be restored from local storage if possible.
    let defaultSizes: number[] | undefined = undefined;
    if (autoSaveId) {
      const panelsArray = panelsMapToSortedArray(panels);
      defaultSizes =
        loadPanelLayout(autoSaveId, panelsArray, persistence) || [];
    }
    if (defaultSizes?.length) {
      setSizes(defaultSizes);
    } else {
      const panelsArray = panelsMapToSortedArray(panels);

      let panelsWithNullDefaultSize = 0;
      let totalDefaultSize = 0;
      let totalMinSize = 0;

      // TODO
      // Implicit default size calculations below do not account for inferred min/max size values.
      // e.g. if Panel A has a maxSize of 40 then Panels A and B can't both have an implicit default size of 50.
      // For now, these logic edge cases are left to the user to handle via props.

      panelsArray.forEach(panel => {
        totalMinSize += panel.minSize;

        if (panel.defaultSize === null) {
          panelsWithNullDefaultSize++;
        } else {
          totalDefaultSize += panel.defaultSize;
        }
      });

      if (totalDefaultSize > 100) {
        throw new Error(
          `The sum of the defaultSize of all panels in a group cannot exceed 100.`,
        );
      } else if (totalMinSize > 100) {
        throw new Error(
          `The sum of the minSize of all panels in a group cannot exceed 100.`,
        );
      }

      setSizes(
        panelsArray.map(panel => {
          if (panel.defaultSize === null) {
            return (100 - totalDefaultSize) / panelsWithNullDefaultSize;
          }

          return panel.defaultSize;
        }),
      );
    }
  }, [autoSaveId, panels]);

  useEffect(() => {
    // If this panel has been configured to persist sizing information, save sizes to local persistence.
    if (autoSaveId) {
      if (sizes.length === 0 || sizes.length !== panels.size) {
        return;
      }

      const panelsArray = panelsMapToSortedArray(panels);
      savePanelGroupLayoutDebounced(
        autoSaveId,
        panelsArray,
        sizes,
        persistence,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoSaveId, panels, sizes]);

  const getPanelStyle = useCallback(
    (id: string): CSSProperties => {
      const { panels } = committedValuesRef.current;

      // Before mounting, Panels will not yet have registered themselves.
      // This includes server rendering.
      // At this point the best we can do is render everything with the same size.
      if (panels.size === 0) {
        return {
          flexBasis: 'auto',
          flexGrow: 1,
          flexShrink: 1,
        };
      }

      const flexGrow = getFlexGrow(panels, id, sizes);

      return {
        flexBasis: 0,
        flexGrow,
        flexShrink: 1,

        // Disable pointer events inside of a panel during resize.
        // This avoid edge cases like nested iframes.
        pointerEvents:
          disablePointerEventsDuringResize && activeHandleId !== null
            ? 'none'
            : undefined,
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeHandleId, direction, sizes],
  );

  const registerPanel = useCallback((id: string, panel: PanelData) => {
    setPanels(prevPanels => {
      if (prevPanels.has(id)) {
        return prevPanels;
      }

      const nextPanels = new Map(prevPanels);
      nextPanels.set(id, panel);

      return nextPanels;
    });
  }, []);

  const registerResizeHandle = useCallback(
    (handleId: string) => {
      const resizeHandler = (event: ResizeEvent) => {
        event.preventDefault();

        const {
          direction,
          panels,
          sizes: prevSizes,
        } = committedValuesRef.current;

        const panelsArray = panelsMapToSortedArray(panels);

        const [idBefore, idAfter] = getResizeHandlePanelIds(
          groupId,
          handleId,
          panelsArray,
        );
        if (idBefore == null || idAfter == null) {
          return;
        }

        const movement = getMovement(
          event,
          groupId,
          handleId,
          panelsArray,
          direction,
          prevSizes,
          initialDragStateRef.current,
        );
        if (movement === 0) {
          return;
        }

        const groupElement = getPanelGroup(groupId);
        if (!groupElement) {
          return;
        }
        const rect = groupElement.getBoundingClientRect();
        const isHorizontal = direction === 'horizontal';
        const size = isHorizontal ? rect.width : rect.height;
        const delta = (movement / size) * 100;

        const nextSizes = adjustByDelta(
          event,
          panels,
          idBefore,
          idAfter,
          delta,
          prevSizes,
          panelSizeBeforeCollapse.current,
          initialDragStateRef.current,
        );

        const sizesChanged = !areEqual(prevSizes, nextSizes);

        // Don't update cursor for resizes triggered by keyboard interactions.
        if (isMouseEvent(event) || isTouchEvent(event)) {
          // Watch for multiple subsequent deltas; this might occur for tiny cursor movements.
          // In this case, Panel sizes might not change–
          // but updating cursor in this scenario would cause a flicker.
          if (prevDeltaRef.current != delta) {
            if (!sizesChanged) {
              // If the pointer has moved too far to resize the panel any further,
              // update the cursor style for a visual clue.
              // This mimics VS Code behavior.

              if (isHorizontal) {
                setGlobalCursorStyle(
                  movement < 0 ? 'horizontal-min' : 'horizontal-max',
                );
              } else {
                setGlobalCursorStyle(
                  movement < 0 ? 'vertical-min' : 'vertical-max',
                );
              }
            } else {
              // Reset the cursor style to the the normal resize cursor.
              setGlobalCursorStyle(isHorizontal ? 'horizontal' : 'vertical');
            }
          }
        }

        if (sizesChanged) {
          // If resize change handlers have been declared, this is the time to call them.
          callPanelCallbacks(panelsArray, prevSizes, nextSizes);

          setSizes(nextSizes);
        }

        prevDeltaRef.current = delta;
      };

      return resizeHandler;
    },
    [groupId],
  );

  const unregisterPanel = useCallback((id: string) => {
    setPanels(prevPanels => {
      if (!prevPanels.has(id)) {
        return prevPanels;
      }

      const nextPanels = new Map(prevPanels);
      nextPanels.delete(id);

      return nextPanels;
    });
  }, []);

  const collapsePanel = useCallback((id: string) => {
    const { panels, sizes: prevSizes } = committedValuesRef.current;

    const panel = panels.get(id);
    if (panel == null || !panel.collapsible) {
      return;
    }

    const panelsArray = panelsMapToSortedArray(panels);

    const index = panelsArray.indexOf(panel);
    if (index < 0) {
      return;
    }

    const currentSize = prevSizes[index];
    if (currentSize === 0) {
      // Panel is already collapsed.
      return;
    }

    panelSizeBeforeCollapse.current.set(id, currentSize);

    const [idBefore, idAfter] = getBeforeAndAfterIds(id, panelsArray);
    if (idBefore == null || idAfter == null) {
      return;
    }

    const isLastPanel = index === panelsArray.length - 1;
    const delta = isLastPanel ? currentSize : 0 - currentSize;

    const nextSizes = adjustByDelta(
      null,
      panels,
      idBefore,
      idAfter,
      delta,
      prevSizes,
      panelSizeBeforeCollapse.current,
      null,
    );
    if (prevSizes !== nextSizes) {
      // If resize change handlers have been declared, this is the time to call them.
      callPanelCallbacks(panelsArray, prevSizes, nextSizes);

      setSizes(nextSizes);
    }
  }, []);

  const expandPanel = useCallback((id: string) => {
    const { panels, sizes: prevSizes } = committedValuesRef.current;

    const panel = panels.get(id);
    if (panel == null) {
      return;
    }

    const sizeBeforeCollapse =
      panelSizeBeforeCollapse.current.get(id) || panel.minSize;
    if (!sizeBeforeCollapse) {
      return;
    }

    const panelsArray = panelsMapToSortedArray(panels);

    const index = panelsArray.indexOf(panel);
    if (index < 0) {
      return;
    }

    const currentSize = prevSizes[index];
    if (currentSize !== 0) {
      // Panel is already expanded.
      return;
    }

    const [idBefore, idAfter] = getBeforeAndAfterIds(id, panelsArray);
    if (idBefore == null || idAfter == null) {
      return;
    }

    const isLastPanel = index === panelsArray.length - 1;
    const delta = isLastPanel ? 0 - sizeBeforeCollapse : sizeBeforeCollapse;

    const nextSizes = adjustByDelta(
      null,
      panels,
      idBefore,
      idAfter,
      delta,
      prevSizes,
      panelSizeBeforeCollapse.current,
      null,
    );
    if (prevSizes !== nextSizes) {
      // If resize change handlers have been declared, this is the time to call them.
      callPanelCallbacks(panelsArray, prevSizes, nextSizes);

      setSizes(nextSizes);
    }
  }, []);

  const resizePanel = useCallback((id: string, nextSize: number) => {
    const { panels, sizes: prevSizes } = committedValuesRef.current;

    const panel = panels.get(id);
    if (panel == null) {
      return;
    }

    const panelsArray = panelsMapToSortedArray(panels);

    const index = panelsArray.indexOf(panel);
    if (index < 0) {
      return;
    }

    const currentSize = prevSizes[index];
    if (currentSize === nextSize) {
      return;
    }

    if (panel.collapsible && nextSize === 0) {
      // This is a valid resize state.
    } else {
      nextSize = Math.min(panel.maxSize, Math.max(panel.minSize, nextSize));
    }

    const [idBefore, idAfter] = getBeforeAndAfterIds(id, panelsArray);
    if (idBefore == null || idAfter == null) {
      return;
    }

    const isLastPanel = index === panelsArray.length - 1;
    const delta = isLastPanel ? currentSize - nextSize : nextSize - currentSize;

    const nextSizes = adjustByDelta(
      null,
      panels,
      idBefore,
      idAfter,
      delta,
      prevSizes,
      panelSizeBeforeCollapse.current,
      null,
    );
    if (prevSizes !== nextSizes) {
      // If resize change handlers have been declared, this is the time to call them.
      callPanelCallbacks(panelsArray, prevSizes, nextSizes);

      setSizes(nextSizes);
    }
  }, []);

  const context = useMemo(
    () => ({
      activeHandleId,
      collapsePanel,
      direction,
      expandPanel,
      getPanelStyle,
      groupId,
      registerPanel,
      registerResizeHandle,
      resizePanel,
      startDragging: (id: string, event: ResizeEvent) => {
        setActiveHandleId(id);

        if (isMouseEvent(event) || isTouchEvent(event)) {
          const handleElement = getResizeHandle(id);
          if (!handleElement) {
            return;
          }

          initialDragStateRef.current = {
            dragHandleRect: handleElement.getBoundingClientRect(),
            dragOffset: getDragOffset(event, id, direction),
            sizes: committedValuesRef.current.sizes,
          };
        }
      },
      stopDragging: () => {
        resetGlobalCursorStyle();
        setActiveHandleId(null);

        initialDragStateRef.current = null;
      },
      unregisterPanel,
    }),
    [
      activeHandleId,
      collapsePanel,
      direction,
      expandPanel,
      getPanelStyle,
      groupId,
      registerPanel,
      registerResizeHandle,
      resizePanel,
      unregisterPanel,
    ],
  );

  const style: CSSProperties = {
    display: 'flex',
    flexDirection: direction === 'horizontal' ? 'row' : 'column',
    height: '100%',
    width: '100%',
  };

  return (
    <PanelsGroupContext.Provider value={context}>
      <Component
        className={classNameFromProps}
        data-panel-group=""
        data-panel-group-direction={direction}
        data-panel-group-id={groupId}
        data-testid={testId}
        style={{ ...style, ...styleFromProps }}
      >
        {children}
      </Component>
    </PanelsGroupContext.Provider>
  );
};

export default PanelsGroup;
