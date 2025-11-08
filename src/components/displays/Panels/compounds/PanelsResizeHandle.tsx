import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import ResizeHandler from '../ResizeHandler';

import styles from './PanelsResizeHandle.module.scss';

export type PanelsResizeHandleProps = DataTestId & {
  className?: string;
  collapsed?: boolean;
  id?: string;
};

const PanelsResizeHandle = ({
  className,
  collapsed = false,
  id,
  'data-testid': testId = 'panels-resize-handle',
}: PanelsResizeHandleProps) => {
  return (
    <ResizeHandler
      className={classNames(styles.PanelsResizeHandle, className)}
      data-testid={testId}
      id={id}
    >
      <div className={styles.inner} data-collapsed={collapsed || undefined} />
    </ResizeHandler>
  );
};

export default PanelsResizeHandle;
