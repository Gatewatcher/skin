import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import { useEffect, useState } from 'react';

import { ButtonIcon } from '@/skin/actions';
import type { MaximizeSize } from '@/skin/displays/Drawer/types';
import { Stack } from '@/skin/layout';

import { MIN_SIZE_PERCENTAGE } from '../constants';
import { useDrawerContext } from '../context';

import styles from '../styles.module.scss';

export type DrawerMaximizeProps = DataTestId & {
  maximizeSize?: MaximizeSize;
};

const MAXIMIZE_PERCENTAGE: Record<MaximizeSize, number> = {
  full: 100,
  large: 75,
  medium: 50,
  small: 30,
};

const Maximize = ({
  'data-testid': testId = 'drawer-close',
  maximizeSize = 'full',
}: DrawerMaximizeProps) => {
  const { resizeRef, setMaxSizeRef, setMaximizeRef } = useDrawerContext();
  const [maximized, setMaximized] = useState(false);
  setMaximizeRef.current = setMaximized;

  useEffect(() => {
    setMaxSizeRef?.current(MAXIMIZE_PERCENTAGE[maximizeSize]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMaximize = () => {
    setMaximized(prevState => {
      resizeRef?.current?.(
        !prevState ? MAXIMIZE_PERCENTAGE[maximizeSize] : MIN_SIZE_PERCENTAGE,
      );
      return !prevState;
    });
  };

  return (
    <Stack.Item alignSelf="center" className={styles.Icon}>
      <ButtonIcon
        data-testid={testId}
        icon={maximized ? 'Retract' : 'Expand'}
        onClick={handleMaximize}
        variant="ghosted"
      />
    </Stack.Item>
  );
};

export default Maximize;
