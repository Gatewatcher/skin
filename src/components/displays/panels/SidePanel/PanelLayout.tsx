import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { CSSProperties, ReactNode } from 'react';

import styles from './styles.module.scss';

export type PanelLayoutProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

const PanelLayout = ({ children, className, style }: PanelLayoutProps) => {
  return (
    <div
      className={classNames(styles.SidePanelLayout, className)}
      style={style}
    >
      {children}
    </div>
  );
};

export default PanelLayout;
