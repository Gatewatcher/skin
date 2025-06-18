import { classNames, stylesToCamelCase } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import { Stack } from '@/skin/layout';

import { DEFAULT_ANIMATION, DEFAULT_SHAPE, DEFAULT_VARIANT } from './constants';
import type {
  SkeletonAnimation,
  SkeletonShape,
  SkeletonVariant,
} from './types';

import styles from './styles.module.scss';

export type SkeletonProps = DataTestId & {
  variant?: SkeletonVariant;
  animation?: SkeletonAnimation;
  shape?: SkeletonShape;
};

const Skeleton = ({
  'data-testid': testId = 'Skeleton',
  variant = DEFAULT_VARIANT,
  animation = DEFAULT_ANIMATION,
  shape = DEFAULT_SHAPE,
}: SkeletonProps) => (
  <Stack.Item
    className={classNames(
      styles.Skeleton,
      stylesToCamelCase(styles, 'variant', variant),
      stylesToCamelCase(styles, 'shape', shape),
      stylesToCamelCase(styles, 'animation', animation),
    )}
    data-testid={testId}
    flex="1"
  />
);

export default Skeleton;
