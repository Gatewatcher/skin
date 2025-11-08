import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode, Ref } from 'react';

import styles from '../styles.module.scss';

export type DrawerContentProps = DataTestId & {
  children: ReactNode;
  fitContent?: boolean;
  ref?: Ref<HTMLDivElement>;
};

const Content = ({
  children,
  fitContent = false,
  'data-testid': testId = 'drawer-content',
  ref,
}: DrawerContentProps) => (
  <div
    ref={ref}
    className={classNames(fitContent && styles.DrawerFitContent)}
    data-testid={testId}
  >
    {children}
  </div>
);

export default Content;
