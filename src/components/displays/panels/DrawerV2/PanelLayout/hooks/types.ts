import type { HTMLProps } from 'react';

import type { Position } from '../utils';

export type UseDragHandleParams = UseDragHandleEventHandlers &
  UseDragHandleOptions;

export type UseDragHandleEventHandlers = {
  onWillDrag?: (params: { position: Position }) => void;
  onDragStart?: (params: { position: Position }) => void;
  onDrag?: (params: {
    offset: Position;
    position: Position;
    cancel: () => void;
    end: () => void;
  }) => void;
  onDragEnd?: (params: {
    position: Position;
    settle: (keepFocus?: boolean) => void;
  }) => void;
  onDragCancel?: (params: {
    position: Position;
    settle: (keepFocus?: boolean) => void;
  }) => void;
  onDragSettled?: () => void;
};

export type UseDragHandleOptions = {
  cancelOnContextMenu?: boolean;
  cancelOnEscape?: boolean;
  cancelOnFocusLost?: boolean;
  deadZoneRadius?: number;
  keepFocusAfterSettled?: boolean;
  speed?: number | Position;
};

export type UseDragHandleState = {
  draggingOffset: Position | null;
  mouseStartPosition: Position | null;
  needsToBeSettled: boolean;
};

export type UseDragHandleReturn<ElementType> = {
  cancel: () => void;
  end: () => void;
  elementProps: HTMLProps<ElementType>;
};
