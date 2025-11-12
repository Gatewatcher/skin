import { useDocumentEventListener } from '@gatewatcher/bistoury/hooks';
import { useCallback, useEffect, useRef, useState } from 'react';

import {
  type Position,
  addPositions,
  getDistance,
  multiplyPosition,
  subtractPositions,
} from '../utils';
import type {
  UseDragHandleParams,
  UseDragHandleReturn,
  UseDragHandleState,
} from './types';

export const useDragHandle = <ElementType extends HTMLElement>({
  onWillDrag,
  onDragStart,
  onDrag,
  onDragEnd,
  onDragCancel,
  onDragSettled,
  cancelOnContextMenu,
  cancelOnEscape,
  cancelOnFocusLost,
  deadZoneRadius = 0,
  keepFocusAfterSettled,
  speed = 1,
}: UseDragHandleParams): UseDragHandleReturn<ElementType> => {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const stateRef = useRef<UseDragHandleParams & UseDragHandleState>({
    draggingOffset: null,
    mouseStartPosition: null,
    needsToBeSettled: false,
    onWillDrag,
    onDragStart,
    onDrag,
    onDragEnd,
    onDragCancel,
    onDragSettled,
  });

  useEffect(() => {
    stateRef.current.onWillDrag = onWillDrag;
    stateRef.current.onDragStart = onDragStart;
    stateRef.current.onDrag = onDrag;
    stateRef.current.onDragEnd = onDragEnd;
    stateRef.current.onDragCancel = onDragCancel;
    stateRef.current.onDragSettled = onDragSettled;
  }, [onDragStart, onDrag, onDragEnd, onWillDrag, onDragSettled, onDragCancel]);

  const getStartPosition = (): Position | null => {
    const { mouseStartPosition } = stateRef.current;
    return mouseStartPosition && { ...mouseStartPosition };
  };

  const getCurrentPosition = (): Position | null => {
    const { mouseStartPosition, draggingOffset } = stateRef.current;
    return (
      mouseStartPosition &&
      draggingOffset &&
      addPositions(mouseStartPosition, draggingOffset)
    );
  };

  const isDragging = () => !!stateRef.current.draggingOffset;

  const resetDraggingProperties = () => {
    stateRef.current.mouseStartPosition = null;
    stateRef.current.draggingOffset = null;
  };

  const handleDragSettled = useCallback(
    (keepFocus = keepFocusAfterSettled) => {
      if (stateRef.current.needsToBeSettled) {
        if (stateRef.current.onDragSettled) {
          // Prevent onDragSettled from happening too soon.
          requestAnimationFrame(stateRef.current.onDragSettled);
        }
        stateRef.current.needsToBeSettled = false;
        requestAnimationFrame(() => {
          if (keepFocus) {
            element?.focus();
          } else {
            element?.blur();
          }
        });
      }
    },
    [element, keepFocusAfterSettled],
  );

  const stopDraggingAndCleanUp = useCallback(() => {
    const currentPosition = getCurrentPosition();
    if (isDragging() && currentPosition) {
      stateRef.current.onDragEnd?.({
        position: currentPosition,
        settle: (keepFocus = keepFocusAfterSettled) =>
          handleDragSettled(keepFocus),
      });
    }
    handleDragSettled();
    resetDraggingProperties();
  }, [handleDragSettled, keepFocusAfterSettled]);

  const cancelDragging = useCallback(() => {
    const currentPosition = getCurrentPosition();
    if (isDragging() && currentPosition) {
      stateRef.current.onDragCancel?.({
        position: currentPosition,
        settle: handleDragSettled,
      });
      resetDraggingProperties();
    }
  }, [handleDragSettled]);

  const handleOnContextMenu = useCallback(() => {
    if (cancelOnContextMenu) {
      cancelDragging();
    }
  }, [cancelDragging, cancelOnContextMenu]);

  const handleOnKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isDragging() && event.key === 'Tab') {
        event.preventDefault();
      }
      if (cancelOnEscape && event.key === 'Escape') {
        cancelDragging();
      }
    },
    [cancelDragging, cancelOnEscape],
  );

  const updateDragging = useCallback(
    (event: MouseEvent) => {
      const startPosition = getStartPosition();
      if (!startPosition) {
        return;
      }
      const eventPosition = { x: event.clientX, y: event.clientY };
      const offset = subtractPositions(eventPosition, startPosition);
      const offsetLength = getDistance(offset);
      const isInSafeZone = offsetLength <= deadZoneRadius;
      if (!isDragging() && isInSafeZone) {
        return;
      }
      if (!isDragging()) {
        stateRef.current.onDragStart?.({ position: startPosition });
      }
      stateRef.current.draggingOffset = offset;
      const currentPosition = getCurrentPosition();
      if (currentPosition) {
        stateRef.current.onDrag?.({
          offset: { ...multiplyPosition(offset, speed) },
          position: currentPosition,
          cancel: cancelDragging,
          end: stopDraggingAndCleanUp,
        });
      }
      element?.focus();
    },
    [cancelDragging, deadZoneRadius, element, speed, stopDraggingAndCleanUp],
  );

  useDocumentEventListener('mousemove', updateDragging);
  useDocumentEventListener('mouseup', stopDraggingAndCleanUp);
  useDocumentEventListener('contextmenu', handleOnContextMenu);
  useDocumentEventListener('keydown', handleOnKeyDown);

  const initDragging: React.MouseEventHandler = useCallback(event => {
    if (event.button !== 0) {
      return;
    }
    stateRef.current.mouseStartPosition = {
      x: event.clientX,
      y: event.clientY,
    };
    const startPosition = getStartPosition();
    if (startPosition) {
      stateRef.current.onWillDrag?.({ position: startPosition });
    }
    stateRef.current.needsToBeSettled = true;
  }, []);

  const handleOnBlur = () => {
    if (cancelOnFocusLost) {
      cancelDragging();
      stopDraggingAndCleanUp();
    }
  };

  return {
    cancel: cancelDragging,
    end: stopDraggingAndCleanUp,
    elementProps: {
      onBlurCapture: handleOnBlur,
      onMouseDownCapture: initDragging,
      ref: setElement,
      tabIndex: -1,
    },
  };
};
