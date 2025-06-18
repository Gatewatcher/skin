import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactElement } from 'react';
import { cloneElement } from 'react';

import { useStepperContext } from '@/skin/displays/Stepper/context';
import { Stack } from '@/skin/layout';

import type { StepperPanelInternalProps, StepperPanelProps } from './Panel';

import styles from '../styles.module.scss';

export type StepperPanelListProps = DataTestId & {
  children: ReactElement<StepperPanelProps & StepperPanelInternalProps>[];
};

const StepperPanelList = ({
  children,
  'data-testid': testId = 'stepper-panel-list',
}: StepperPanelListProps) => {
  const { stepsCount } = useStepperContext();

  stepsCount.current = children.length;

  return (
    <Stack
      as="ul"
      className={styles.PanelList}
      data-testid={testId}
      direction="column"
    >
      {children.map((item, index) =>
        cloneElement(item, {
          key: index,
          index,
        }),
      )}
    </Stack>
  );
};

export default StepperPanelList;
