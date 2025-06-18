import type {
  SkeletonAnimation,
  SkeletonShape,
  SkeletonVariant,
} from './types';

export const SKELETON_ANIMATION = ['wave', 'none'] as const;

export const SKELETON_VARIANT = ['rounded', 'none'] as const;

export const SKELETON_SHAPE = ['square', 'none'] as const;

export const DEFAULT_ANIMATION: SkeletonAnimation = 'wave';
export const DEFAULT_VARIANT: SkeletonVariant = 'none';
export const DEFAULT_SHAPE: SkeletonShape = 'none';
