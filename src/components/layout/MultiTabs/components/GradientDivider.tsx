import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { XOR } from '@gatewatcher/bistoury/utils-types';

import styles from '../styles.module.scss';

type ToTheLeftProps = { toTheLeft: boolean };
type ToTheRightProps = { toTheRight: boolean };
export type GradientDividerProps = XOR<ToTheLeftProps, ToTheRightProps>;

const GradientDivider = ({ toTheLeft, toTheRight }: GradientDividerProps) => {
  return (
    <div
      className={classNames(
        styles.gradientDivider,
        toTheLeft && styles.toTheLeft,
        toTheRight && styles.toTheRight,
      )}
    />
  );
};

export default GradientDivider;
