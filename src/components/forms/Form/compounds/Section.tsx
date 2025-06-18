import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';

import styles from '../styles.module.scss';

export type FormSectionProps = DataTestId & {
  children: ReactNode;
};

const FormSection = ({
  children,
  'data-testid': testId = 'form-section',
}: FormSectionProps) => {
  return (
    <Stack
      className={styles.Section}
      data-testid={testId}
      direction="column"
      gap={7}
    >
      {children}
    </Stack>
  );
};

export default FormSection;
