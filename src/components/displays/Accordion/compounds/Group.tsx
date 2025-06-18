import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactElement } from 'react';

import { Stack } from '@/skin/layout';

import type { AccordionProps } from '..';

import styles from '../styles.module.scss';

export type AccordionGroupProps = DataTestId & {
  children: ReactElement<AccordionProps>[];
};

const AccordionGroup = ({
  children,
  'data-testid': testId = 'accordion-group',
}: AccordionGroupProps) => {
  return (
    <Stack
      className={styles.Group}
      data-testid={testId}
      direction="column"
      gap={4}
    >
      {children}
    </Stack>
  );
};

export default AccordionGroup;
