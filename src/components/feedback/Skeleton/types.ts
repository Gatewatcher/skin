import type {
  SKELETON_ANIMATION,
  SKELETON_SHAPE,
  SKELETON_VARIANT,
} from './constants';

export type SkeletonAnimation = typeof SKELETON_ANIMATION[number];

export type SkeletonVariant = typeof SKELETON_VARIANT[number];

export type SkeletonShape = typeof SKELETON_SHAPE[number];
