import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import styles from '../styles.module.scss';

export type FooterProps = DataTestId & {
  children?: ReactNode;
};

const Footer = ({
  children,
  'data-testid': testId = 'panel-content-footer',
}: FooterProps) => {
  return (
    <footer className={styles.Footer} data-testid={testId}>
      {children}
    </footer>
  );
};

export default Footer;
