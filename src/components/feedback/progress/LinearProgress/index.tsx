import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';

import { Line } from '../Line';
import { DEFAULT_IS_INFINITE, DEFAULT_LABEL_ERROR } from '../constants';
import { useProgress } from '../hook';
import type { ProgressBaseProps } from '../types';
import { DEFAULT_IS_INLINE } from './constants';

import styles from './styles.module.scss';

export type LinearProgressProps = ProgressBaseProps & {
  isInline?: boolean;
  endLabel?: ReactNode;
};

const LinearProgress = ({
  'data-testid': testId = 'linear-progress',
  isInfinite: isInfiniteProps = DEFAULT_IS_INFINITE,
  isInline = DEFAULT_IS_INLINE,
  label,
  labelElement = label && <Text>{label}</Text>,
  labelError = DEFAULT_LABEL_ERROR,
  percentage,
  endLabel: endLabelProps,
  status: statusProps,
}: LinearProgressProps) => {
  const { isInfinite, status } = useProgress({
    isInfinite: isInfiniteProps,
    percentage,
    status: statusProps,
  });

  const percentText =
    status === 'error' ? labelError : `${Math.round(percentage)}%`;

  const endLabel =
    status === 'error' || !endLabelProps ? (
      <Text weight="medium">{percentText}</Text>
    ) : (
      endLabelProps
    );

  const line = (
    <Line
      isInfinite={isInfinite}
      percentage={percentage}
      status={status}
      type="linear"
    />
  );

  if (isInline) {
    return (
      <Stack
        alignItems="center"
        data-testid={isInfinite ? suffixTestId(testId, 'infinite') : testId}
        gap={7}
        justifyContent="space-between"
      >
        {labelElement}
        <Stack.Item flexGrow={1}>{line}</Stack.Item>

        {!isInfinite && (
          <Stack.Item className={styles.label}>{endLabel}</Stack.Item>
        )}
      </Stack>
    );
  }

  return (
    <Stack data-testid={testId} direction="column" gap={4}>
      <Stack justifyContent="space-between">
        {labelElement}
        {!isInfinite && endLabel}
      </Stack>
      {line}
    </Stack>
  );
};

export default LinearProgress;
