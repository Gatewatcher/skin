import { useTimeout } from '@gatewatcher/bistoury/hooks';
import { classNames, stylesToCamelCase } from '@gatewatcher/bistoury/utils-dom';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { DataTestId, TestId } from '@gatewatcher/bistoury/utils-types';
import { useEffect, useMemo, useState } from 'react';
import { getColor } from 'utils/theme';

import { ICON_DEFAULT_SIZE, ICON_SIZES_REM } from '@/constants';
import { Stack } from '@/skin/layout';
import type { IconSize } from '@/types';

import {
  DEFAULT_BACKGROUND_CIRCLE_COLOR,
  DEFAULT_WITH_BACKGROUND_CIRCLE,
  DEFAULT_WITH_LONG_RUNNING_ANIMATION,
} from './constants';

import styles from './styles.module.scss';

export type CircularLoaderProps = DataTestId & {
  size?: IconSize;
  withLongRunningAnimation?: boolean;
};

export type CircularLoaderInternalProps = {
  currentColor?: boolean;
  backgroundCircleColor?: 'default' | 'blue';
  withBackgroundCircle?: boolean;
};

const CircularLoader = ({
  backgroundCircleColor = DEFAULT_BACKGROUND_CIRCLE_COLOR,
  currentColor,
  'data-testid': testId = 'circular-loader',
  size: sizeProps = ICON_DEFAULT_SIZE,
  withLongRunningAnimation = DEFAULT_WITH_LONG_RUNNING_ANIMATION,
  withBackgroundCircle = DEFAULT_WITH_BACKGROUND_CIRCLE,
}: CircularLoaderProps & CircularLoaderInternalProps) => {
  const LONG_RUNNING_TIMEOUT = 7000;

  const [setTimeout] = useTimeout();
  const [longRunning, setLongRunning] = useState(false);

  const size = useMemo(() => ICON_SIZES_REM[sizeProps], [sizeProps]);
  const strokeColor = useMemo(
    () => (currentColor ? 'currentColor' : 'url(#circular-loader-grad)'),
    [currentColor],
  );

  useEffect(() => {
    setTimeout(() => {
      setLongRunning(withLongRunningAnimation);
    }, LONG_RUNNING_TIMEOUT);
  }, [setTimeout, withLongRunningAnimation]);

  return (
    <Stack alignItems="center" data-testid={testId} justifyContent="center">
      <svg
        className={classNames(
          styles.circularLoader,
          longRunning && styles.longRunning,
        )}
        style={{
          height: size,
          width: size,
        }}
        data-testid={buildCircularLoaderTestIds(testId).svg}
        viewBox="0 0 128 128"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="circular-loader-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={getColor('info')} />
            <stop offset="100%" stopColor={getColor('info', { alpha: 25 })} />
          </linearGradient>
        </defs>
        {withBackgroundCircle && (
          <circle
            className={classNames(
              styles.ring,
              stylesToCamelCase(styles, 'ring', backgroundCircleColor),
            )}
            cx="64"
            cy="64"
            fill="none"
            r="56"
            strokeDashoffset="10"
            strokeLinecap="round"
          />
        )}

        {longRunning ? (
          <path
            className={styles.wormLongRunning}
            d="M92,15.492S78.194,4.967,66.743,16.887c-17.231,17.938-28.26,96.974-28.26,96.974L119.85,59.892l-99-31.588,57.528,89.832L97.8,19.349,13.636,88.51l89.012,16.015S81.908,38.332,66.1,22.337C50.114,6.156,36,15.492,36,15.492a56,56,0,1,0,56,0Z"
            data-testid={buildCircularLoaderTestIds(testId).path}
            fill="none"
            stroke={strokeColor}
            strokeDasharray="44 1111"
            strokeDashoffset="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            className={styles.worm}
            d="M 92 15 L 92 15 C 63 -1 36 15.492 36 15.492 a 56 56 0 1 0 56 -0.492 Z"
            data-testid={buildCircularLoaderTestIds(testId).path}
            fill="none"
            stroke={strokeColor}
            strokeDasharray="300 195"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </Stack>
  );
};

export const buildCircularLoaderTestIds = (base: TestId) => ({
  svg: suffixTestId(base, 'svg'),
  path: suffixTestId(base, 'path'),
});

export default CircularLoader;
