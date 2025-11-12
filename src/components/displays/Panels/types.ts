import type { RefObject } from 'react';

export type Direction = 'horizontal' | 'vertical';

export type PanelGroupPersistence = {
  getItem(name: string): string | null | void;
  setItem(name: string, value: string): void;
};

export type PanelGroupOnLayout = (sizes: number[]) => void;
export type PanelOnCollapse = (collapsed: boolean) => void;
export type PanelOnResize = (size: number) => void;
export type PanelResizeHandleOnDragging = (isDragging: boolean) => void;

export type PanelData = {
  callbacksRef: RefObject<{
    onCollapse: PanelOnCollapse | null;
    onResize: PanelOnResize | null;
  }>;
  collapsible: boolean;
  defaultSize: number | null;
  id: string;
  maxSize: number;
  minSize: number;
  order: number | null;
};

export type ResizeEvent = KeyboardEvent | MouseEvent | TouchEvent;
export type ResizeHandler = (event: ResizeEvent) => void;

// Initial drag state serves a few purposes:
// * dragOffset:
//   Resize is calculated by the distance between the current pointer event and the resize handle being "dragged"
//   This value accounts for the initial offset when the touch/click starts, so the handle doesn't appear to "jump"
// * dragHandleRect, sizes:
//   When resizing is done via mouse/touch event– some initial state is stored
//   so that any panels that contract will also expand if drag direction is reversed.
export type InitialDragState = {
  dragHandleRect: DOMRect;
  dragOffset: number;
  sizes: number[];
};

export type PanelDataMap = Map<string, PanelData>;

export type CommittedValues = {
  direction: Direction;
  panels: Map<string, PanelData>;
  sizes: number[];
};
