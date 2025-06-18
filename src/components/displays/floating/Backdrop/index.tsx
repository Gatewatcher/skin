import { FloatingOverlay } from '@floating-ui/react';
import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { CSSProperties, ReactNode } from 'react';

import { withStopPropagation } from '@/hocs';

import styles from './styles.module.scss';

export type BackdropProps = DataTestId & {
  children: ReactNode;
  isMounted: boolean;
  isScrollable?: boolean;
  isTransparent?: boolean;
  slideTransition: CSSProperties;
  style?: CSSProperties;
};

const Backdrop = ({
  children,
  'data-testid': testId = 'backdrop',
  isMounted,
  isScrollable = true,
  isTransparent = false,
  slideTransition,
  style,
}: BackdropProps) => {
  return (
    <>
      {isMounted &&
        withStopPropagation(
          <FloatingOverlay
            className={classNames(
              styles.Backdrop,
              isTransparent && styles.transparent,
              isScrollable && styles.scrollable,
            )}
            data-testid={testId}
            style={style}
          >
            <div
              className={classNames(
                isScrollable && styles.transitionScrollable,
              )}
              style={slideTransition}
            >
              {children}
            </div>
          </FloatingOverlay>,
        )}
    </>
  );
};

export default Backdrop;
