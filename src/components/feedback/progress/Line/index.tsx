import { classNames, stylesToCamelCase } from '@gatewatcher/bistoury/utils-dom';
import { getColor } from 'utils/theme';

import { DEFAULT_IS_INFINITE, DEFAULT_STATUS } from '../constants';
import type { ProgressBaseProps } from '../types';

import styles from './styles.module.scss';

export type LineProps = Pick<
  ProgressBaseProps,
  'isInfinite' | 'percentage' | 'status'
> & {
  className?: string;
  type: 'linear' | 'circular';
};

export const Line = ({
  className,
  isInfinite = DEFAULT_IS_INFINITE,
  percentage,
  status = DEFAULT_STATUS,
  type,
}: LineProps) => {
  if (type === 'linear') {
    return (
      <div
        className={classNames(styles.track, styles.trackLinear, className)}
        data-testid="progress-linear-line"
      >
        <div
          className={classNames(
            styles.progressLinear,
            isInfinite
              ? styles.progressLinearInfinite
              : stylesToCamelCase(styles, 'progress', 'linear', status),
          )}
          data-testid="progress"
          style={{ ...(!isInfinite && { width: `${percentage}%` }) }}
        />
      </div>
    );
  }

  const viewBoxSize = 34;
  const radius = (viewBoxSize - 2) / 2;

  return (
    <svg
      className={classNames(styles.lineCircular, className)}
      data-testid="progress-circular-line"
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {isInfinite && (
        <defs>
          <linearGradient data-testid="gradient" id="gradient">
            <stop offset="0%" stopColor={getColor('info', { alpha: 15 })} />
            <stop offset="100%" stopColor={getColor('info')} />
          </linearGradient>
        </defs>
      )}
      <circle
        className={classNames(styles.track, styles.trackCircular)}
        cx="50%"
        cy="50%"
        r={radius}
      />
      {percentage > 0 && (
        <circle
          className={classNames(
            styles.progressCircular,
            isInfinite
              ? styles.progressCircularInfinite
              : stylesToCamelCase(styles, 'progress', 'circular', status),
          )}
          strokeDashoffset={
            !isInfinite ? Math.round(100 - percentage) : undefined
          }
          cx="50%"
          cy="50%"
          data-testid="progress"
          r={radius}
        />
      )}
    </svg>
  );
};
