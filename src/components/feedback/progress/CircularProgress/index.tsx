import { classNames, stylesToCamelCase } from '@gatewatcher/bistoury/utils-dom';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { ReactNode } from 'react';

import type { IconName } from '@/skin/displays';
import { Icon } from '@/skin/displays';
import { Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';

import { Line } from '../Line';
import { DEFAULT_IS_INFINITE, DEFAULT_LABEL_ERROR } from '../constants';
import { useProgress } from '../hook';
import type { ProgressBaseProps } from '../types';
import { DEFAULT_SIZE } from './constants';
import type { ProgressSize } from './types';

import lineStyles from '../Line/styles.module.scss';
import styles from './styles.module.scss';

export type CircularProgressProps = ProgressBaseProps & {
  children?: (
    props: Omit<CircularProgressProps, 'children' | 'data-testid'>,
  ) => ReactNode;
  icon?: IconName;
  size?: ProgressSize;
};

const CircularProgress = ({
  children,
  'data-testid': testId = 'circular-progress',
  icon,
  isInfinite: isInfiniteProps = DEFAULT_IS_INFINITE,
  label,
  labelError = DEFAULT_LABEL_ERROR,
  percentage,
  size = DEFAULT_SIZE,
  status: statusProps,
}: CircularProgressProps) => {
  const { isInfinite, status } = useProgress({
    isInfinite: isInfiniteProps,
    percentage,
    status: statusProps,
  });
  const percentText =
    status === 'error' ? labelError : `${Math.round(percentage)}%`;

  return (
    <Stack
      alignItems="center"
      className={styles.CircularProgress}
      data-testid={isInfinite ? suffixTestId(testId, 'infinite') : testId}
      direction="column"
      gap={4}
    >
      <Stack className={styles.reference}>
        <Line
          className={classNames(
            stylesToCamelCase(lineStyles, 'line circular', size),
          )}
          isInfinite={isInfinite}
          percentage={percentage}
          status={status}
          type="circular"
        />
        {(children || icon) && (
          <Stack className={styles.absolute}>
            {children &&
              children({
                icon,
                isInfinite,
                label,
                labelError,
                percentage,
                size,
                status,
              })}

            {icon && !children && (
              <Icon
                color={status === 'uploading' || !status ? 'info' : status}
                name={icon}
                size={size}
              />
            )}
          </Stack>
        )}
      </Stack>

      <Stack alignItems="center" direction="column">
        <Text>{label}</Text>
        {!isInfinite && <Text weight="semibold">{percentText}</Text>}
      </Stack>
    </Stack>
  );
};

export default CircularProgress;
