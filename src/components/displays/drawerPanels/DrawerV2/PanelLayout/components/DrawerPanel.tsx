import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';
import { useRef, useState } from 'react';

import type { Position } from '../utils';
import ResizeHandle from './ResizeHandle';

import styles from '../styles.module.scss';

const DEFAULT_OFFSET: Position = { x: 0, y: 0 };

type DrawerPanelProps = DataTestId & {
  children?: ReactNode;
  onResize: (width: number) => void;
  stickToContainerEdge: boolean;
  widthPx: number;
};

const DrawerPanel = ({
  'data-testid': testId = 'drawer-panel',
  children,
  onResize,
  stickToContainerEdge,
  widthPx,
}: DrawerPanelProps) => {
  const startWidthRef = useRef(widthPx);
  const [offset, setOffset] = useState(DEFAULT_OFFSET);

  const handleDragStart = () => {
    startWidthRef.current = widthPx;
    document.documentElement.style.cursor = 'ew-resize';
  };

  const handleDrag = (dragging: { offset: Position }) => {
    setOffset(dragging.offset);
    onResize(startWidthRef.current - offset.x);
  };

  const handleDragEnd = () => {
    startWidthRef.current -= offset.x;
    setOffset(DEFAULT_OFFSET);
  };

  const handleDragSettled = () => {
    document.documentElement.style.cursor = 'default';
  };

  return (
    <div
      className={styles.DrawerPanel}
      data-testid={testId}
      style={{ width: stickToContainerEdge ? '100%' : widthPx }}
    >
      <div className={styles.inner}>{children}</div>
      <ResizeHandle
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onDragSettled={handleDragSettled}
        onDragStart={handleDragStart}
      />
    </div>
  );
};

export default DrawerPanel;
