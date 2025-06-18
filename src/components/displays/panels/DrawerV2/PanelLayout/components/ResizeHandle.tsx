import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import { type UseDragHandleParams, useDragHandle } from '../hooks';

import styles from '../styles.module.scss';

export type ResizeHandleProps = Pick<
  UseDragHandleParams,
  'onDragStart' | 'onDrag' | 'onDragEnd' | 'onDragSettled'
>;

const ResizeHandle = ({
  'data-testid': testId = 'resize-handle',
  onDragStart,
  onDrag,
  onDragEnd,
  onDragSettled,
}: Required<ResizeHandleProps> & DataTestId) => {
  const dragging = useDragHandle<HTMLDivElement>({
    onDragStart: dragging => {
      onDragStart(dragging);
      document.documentElement.style.userSelect = 'none';
      document.body.style.pointerEvents = 'none';
    },
    onDrag,
    onDragEnd,
    onDragSettled: () => {
      onDragSettled();
      document.documentElement.style.userSelect = 'auto';
      document.body.style.pointerEvents = 'all';
    },
  });

  return (
    <div
      className={styles.ResizeHandle}
      data-testid={testId}
      {...dragging.elementProps}
    />
  );
};

export default ResizeHandle;
