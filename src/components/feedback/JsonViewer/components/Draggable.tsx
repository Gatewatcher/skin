import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { DragEvent } from 'react';

import { Icon } from '@/skin/displays';
import { Stack } from '@/skin/layout';

import styles from './styles.module.scss';

export type DraggableProps = DataTestId & {
  children?: React.ReactNode;
  data?: string;
  disabled?: boolean;
  format?: string;
};

const Draggable = ({
  children,
  data,
  'data-testid': testId = 'draggable',
  disabled,
  format = 'text/plain',
}: DraggableProps) => {
  if (disabled) {
    return children;
  }

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    if (data) {
      event.dataTransfer.setData(format, data);
    }
  };

  return (
    <Stack
      className={styles.Draggable}
      data-dragData={data}
      data-testid={testId}
      gap={2}
      onDragStart={handleDragStart}
      padding={{ right: 3 }}
      draggable
    >
      <Icon className={styles.icon} color="neutral" name="Draggable" />
      {children}
    </Stack>
  );
};

export default Draggable;
