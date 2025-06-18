import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { type ReactNode, useCallback } from 'react';

import { useStickyContext } from '../components/StickyProvider';

import styles from '../styles.module.scss';

export type DynamicContentProps = {
  scrollTop: number;
};

export type HeaderProps = {
  children?: ReactNode;
  dynamicContent?: (props: DynamicContentProps) => ReactNode;
};

const Header = ({ children, dynamicContent }: HeaderProps) => {
  const { scrollTop, setStickySize } = useStickyContext();

  const handleMountAndUnmount = useCallback(
    (node: HTMLDivElement) => setStickySize(node?.offsetHeight ?? 0),
    [setStickySize],
  );

  const dynamicElement = !!dynamicContent && (
    <div className={styles.dynamicContainer}>
      <div ref={handleMountAndUnmount} className={styles.dynamicContent}>
        {dynamicContent({ scrollTop })}
      </div>
    </div>
  );

  return (
    <header
      className={classNames(styles.Header, children && styles.paddingTop)}
    >
      {children}
      {dynamicElement}
    </header>
  );
};

export default Header;
