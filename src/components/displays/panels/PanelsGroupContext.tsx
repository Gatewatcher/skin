import type { CSSProperties } from 'react';
import { createContext } from 'react';

import type { PanelData, ResizeEvent, ResizeHandler } from './types';

export const PanelsGroupContext = createContext<{
  activeHandleId: string | null;
  collapsePanel: (id: string) => void;
  direction: 'horizontal' | 'vertical';
  expandPanel: (id: string) => void;
  getPanelStyle: (id: string) => CSSProperties;
  groupId: string;
  registerPanel: (id: string, panel: PanelData) => void;
  registerResizeHandle: (id: string) => ResizeHandler;
  resizePanel: (id: string, percentage: number) => void;
  startDragging: (id: string, event: ResizeEvent) => void;
  stopDragging: () => void;
  unregisterPanel: (id: string) => void;
} | null>(null);
