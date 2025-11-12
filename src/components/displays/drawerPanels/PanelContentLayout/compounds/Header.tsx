import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import { type ReactNode, useCallback } from 'react';

import { useStickyContext } from '../components/StickyProvider';

import styles from '../styles.module.scss';

export type DynamicContentProps = {
  scrollTop: number;
};

export type HeaderProps = DataTestId & {
  children?: ReactNode;
  dynamicContent?: (props: DynamicContentProps) => ReactNode;
};

const Header = ({
  children,
  dynamicContent,
  'data-testid': testId = 'panel-content-header',
}: HeaderProps) => {
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
      data-testid={testId}
    >
      {children}
      {dynamicElement}
    </header>
  );
};

export default Header;
