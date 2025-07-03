import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactElement, ReactNode } from 'react';
import { Children, cloneElement } from 'react';

import { Stack } from '@/skin/layout';

import type { FinderResumeItemInternalProps } from './ResumeItem';

import styles from '../styles.module.scss';

export type FinderResumeProps = DataTestId & {
  children: ReactNode;
};

const Resume = ({
  children,
  'data-testid': testId = 'finder-resume',
}: FinderResumeProps) => {
  const nodes = Children.toArray(children);

  return (
    <Stack
      alignItems="center"
      className={styles.pointer}
      data-testid={testId}
      flexGrow={1}
      gap={6}
    >
      <Stack alignItems="center">
        {nodes.map((child, index) =>
          cloneElement(child as ReactElement<FinderResumeItemInternalProps>, {
            isLastItem: index === nodes.length - 1,
          }),
        )}
      </Stack>
    </Stack>
  );
};

export default Resume;
