import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import {
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_SHIMMER_COLOR,
  DEFAULT_TEXT_COLOR,
} from './constants';
import './styles.css';

import styles from './styles.module.scss';

export type ShimmerEffectProps = DataTestId & {
  children: ReactNode;
  shimmerColor?: string;
  textColor?: string;
  animationDuration?: number;
};

const ShimmerEffect = ({
  children,
  'data-testid': testId,
  shimmerColor = DEFAULT_SHIMMER_COLOR,
  textColor = DEFAULT_TEXT_COLOR,
  animationDuration = DEFAULT_ANIMATION_DURATION,
}: ShimmerEffectProps) => {
  const background = `linear-gradient(90deg, ${shimmerColor} 0%, ${shimmerColor} 30%, ${textColor} 50%, ${textColor} 60%, ${textColor} 100%)`;
  const animation = `shimmer ${animationDuration}s infinite`;

  return (
    <div
      style={{
        background,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        backgroundSize: '200%',
        animation,
      }}
      className={styles.ShimmerEffect}
      data-testid={testId}
    >
      {children}
    </div>
  );
};

export default ShimmerEffect;
