import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { useStickyContext } from '../components/StickyProvider';

import styles from '../styles.module.scss';

export type SubHeaderProps = DataTestId & {
  children?: ReactNode;
};

const SubHeader = ({
  children,
  'data-testid': testId = 'panel-content-sub-header',
}: SubHeaderProps) => {
  const { stickySize } = useStickyContext();

  return (
    <div
      className={styles.SubHeader}
      data-testid={testId}
      style={{ marginTop: stickySize, marginBottom: -stickySize }}
    >
      {children}
    </div>
  );
};

export default SubHeader;
