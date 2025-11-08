import { useUniqueId } from '@gatewatcher/bistoury/hooks';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type {
  CSSProperties,
  ElementType,
  MouseEvent,
  ReactNode,
  TouchEvent,
} from 'react';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { PanelsGroupContext } from './PanelsGroupContext';
import { useWindowSplitterResizeHandlerBehavior } from './hooks/useWindowSplitterBehavior';
import type {
  PanelResizeHandleOnDragging,
  ResizeEvent,
  ResizeHandler,
} from './types';
import { getCursorStyle } from './utils/cursor';

export type ResizeHandlerProps = DataTestId & {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  id?: string | null;
  onDragging?: PanelResizeHandleOnDragging;
  style?: CSSProperties;
  as?: ElementType;
};

const ResizeHandlerComponent = ({
  children = null,
  className: classNameFromProps = '',
  disabled = false,
  id: idFromProps = null,
  onDragging = () => {},
  style: styleFromProps = {},
  as: Component = 'div',
  'data-testid': testId = 'resize-handler',
}: ResizeHandlerProps) => {
  const divElementRef = useRef<HTMLDivElement>(null);

  // Use a ref to guard against users passing inline props
  const callbacksRef = useRef<{
    onDragging: PanelResizeHandleOnDragging | null;
  }>({ onDragging });
  useEffect(() => {
    callbacksRef.current.onDragging = onDragging;
  });

  const panelGroupContext = useContext(PanelsGroupContext);
  if (panelGroupContext === null) {
    throw Error(
      `PanelResizeHandle components must be rendered within a PanelGroup container`,
    );
  }

  const {
    activeHandleId,
    direction,
    groupId,
    registerResizeHandle,
    startDragging,
    stopDragging,
  } = panelGroupContext;

  const resizeHandleId = useUniqueId(idFromProps);
  const isDragging = activeHandleId === resizeHandleId;

  const [isFocused, setIsFocused] = useState(false);

  const [resizeHandler, setResizeHandler] = useState<ResizeHandler | null>(
    null,
  );

  const stopDraggingAndBlur = useCallback(() => {
    // Clicking on the drag handle shouldn't leave it focused;
    // That would cause the PanelGroup to think it was still active.
    const div = divElementRef.current;
    if (!div) {
      return;
    }
    div.blur();

    stopDragging();

    const { onDragging } = callbacksRef.current;
    if (onDragging) {
      onDragging(false);
    }
  }, [stopDragging]);

  useEffect(() => {
    if (disabled) {
      setResizeHandler(null);
    } else {
      const resizeHandler = registerResizeHandle(resizeHandleId);
      setResizeHandler(() => resizeHandler);
    }
  }, [disabled, resizeHandleId, registerResizeHandle]);

  useEffect(() => {
    if (disabled || resizeHandler == null || !isDragging) {
      return;
    }

    const onMove = (event: ResizeEvent) => {
      resizeHandler(event);
    };

    document.body.addEventListener('contextmenu', stopDraggingAndBlur);
    document.body.addEventListener('mousemove', onMove);
    document.body.addEventListener('touchmove', onMove);
    window.addEventListener('mouseup', stopDraggingAndBlur);
    window.addEventListener('touchend', stopDraggingAndBlur);

    return () => {
      document.body.removeEventListener('contextmenu', stopDraggingAndBlur);
      document.body.removeEventListener('mousemove', onMove);
      document.body.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', stopDraggingAndBlur);
      window.removeEventListener('touchend', stopDraggingAndBlur);
    };
  }, [direction, disabled, isDragging, resizeHandler, stopDraggingAndBlur]);

  useWindowSplitterResizeHandlerBehavior({
    disabled,
    handleId: resizeHandleId,
    resizeHandler,
  });

  const style: CSSProperties = {
    cursor: getCursorStyle(direction),
    touchAction: 'none',
    userSelect: 'none',
  };

  return (
    <Component
      ref={divElementRef}
      data-resize-handle-active={
        isDragging ? 'pointer' : isFocused ? 'keyboard' : undefined
      }
      onMouseDown={(event: MouseEvent) => {
        startDragging(resizeHandleId, event.nativeEvent);

        const { onDragging } = callbacksRef.current;
        if (onDragging) {
          onDragging(true);
        }
      }}
      onTouchStart={(event: TouchEvent) => {
        startDragging(resizeHandleId, event.nativeEvent);

        const { onDragging } = callbacksRef.current;
        if (onDragging) {
          onDragging(true);
        }
      }}
      className={classNameFromProps}
      data-panel-group-direction={direction}
      data-panel-group-id={groupId}
      data-panel-resize-handle-enabled={!disabled}
      data-panel-resize-handle-id={resizeHandleId}
      data-testid={testId}
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
      onMouseUp={stopDraggingAndBlur}
      onTouchCancel={stopDraggingAndBlur}
      onTouchEnd={stopDraggingAndBlur}
      role="separator"
      style={{ ...style, ...styleFromProps }}
      tabIndex={0}
    >
      {children}
    </Component>
  );
};

export default ResizeHandlerComponent;
