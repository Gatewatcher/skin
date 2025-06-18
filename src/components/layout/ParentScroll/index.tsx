import { useOnWindowScroll } from '@gatewatcher/bistoury/hooks';
import type { ReactNode, RefObject } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { DEFAULT_PADDING_Y } from './constants';

import styles from './styles.module.scss';

export type ParentScrollProps = {
  parentRef: RefObject<HTMLElement>;
  children: ({ isSticky }: { isSticky: boolean }) => ReactNode;
};

const ParentScroll = ({ children, parentRef }: ParentScrollProps) => {
  const [isSticky, setIsSticky] = useState(false);
  const [initialY, setInitialY] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parentRef.current && initialY === null) {
      setInitialY(parentRef.current.getBoundingClientRect().y);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentRef.current]);

  const updateStickyCallback = useCallback(() => {
    if (parentRef.current && initialY && ref.current) {
      const { y, height: scrollHeight } =
        parentRef.current.getBoundingClientRect();
      const { height: currentHeight } = ref.current.getBoundingClientRect();
      if (currentHeight > scrollHeight - DEFAULT_PADDING_Y) {
        setIsSticky(false);
      }
      setIsSticky(isSticky => {
        if (isSticky && y === initialY) {
          return false;
        } else if (!isSticky && y < initialY - DEFAULT_PADDING_Y) {
          return true;
        }
        return isSticky;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentRef.current, initialY, ref.current]);

  useOnWindowScroll(updateStickyCallback, true);

  return (
    <>
      <div ref={ref} className={styles.HeightRefContainer} />
      {children({ isSticky: Boolean(isSticky) })}
    </>
  );
};

export default ParentScroll;
