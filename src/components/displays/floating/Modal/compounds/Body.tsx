import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import styles from '../styles.module.scss';

export type ModalBodyProps = DataTestId & {
  children: ReactNode;
};

const Body = ({
  children,
  'data-testid': testId = 'modal-body',
}: ModalBodyProps) => {
  return (
    <section className={styles.Body} data-testid={testId}>
      {children}
    </section>
  );
};

export default Body;
