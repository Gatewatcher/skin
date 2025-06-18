import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';

import styles from '../styles.module.scss';

export type PresetsProps = DataTestId & {
  children: ReactNode;
};

const Presets = ({
  children,
  'data-testid': testId = 'datepicker-presets',
}: PresetsProps) => {
  return (
    <Stack
      className={styles.Presets}
      data-testid={testId}
      direction="column"
      gap={7}
      margin={{ right: 9 }}
      padding={{ right: 9 }}
    >
      {children}
    </Stack>
  );
};

export default Presets;
