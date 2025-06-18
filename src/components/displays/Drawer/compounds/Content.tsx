import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';
import { forwardRef } from 'react';

import styles from '../styles.module.scss';

export type DrawerContentProps = DataTestId & {
  children: ReactNode;
  fitContent?: boolean;
};

const Content = forwardRef<HTMLDivElement, DrawerContentProps>(
  (
    { children, fitContent = false, 'data-testid': testId = 'drawer-content' },
    ref,
  ) => (
    <div
      ref={ref}
      className={classNames(fitContent && styles.DrawerFitContent)}
      data-testid={testId}
    >
      {children}
    </div>
  ),
);

export default Content;
