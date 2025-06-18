import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ElementType, ReactNode } from 'react';

import type { Type } from '@/types';

import type {
  ALIGNMENT_VARIANTS,
  OVERFLOW_WRAP_VARIANTS,
  SIZE_VARIANTS,
  TRANSFORM_VARIANTS,
  WEIGHT_VARIANTS,
  WHITE_SPACES,
  WORD_BREAK_VARIANTS,
} from './constants';

export type SizeVariant = typeof SIZE_VARIANTS[number];
export type WeightVariant = typeof WEIGHT_VARIANTS[number];
export type AlignmentVariant = typeof ALIGNMENT_VARIANTS[number];
export type OverflowWrapVariant = typeof OVERFLOW_WRAP_VARIANTS[number];
export type WordBreakVariant = typeof WORD_BREAK_VARIANTS[number];
export type TransformVariant = typeof TRANSFORM_VARIANTS[number];
export type WhiteSpace = typeof WHITE_SPACES[number];

export type TypographyProps = DataTestId & {
  children: ReactNode;
  currentColor?: boolean;
  title?: string;
  type?: Type;
};

export type OverflowProps = {
  overflowHidden?: boolean;
  textEllipsis?: boolean;
};

export type TypographyVariantsProps = {
  alignment?: AlignmentVariant;
  overflowWrap?: OverflowWrapVariant;
  size?: SizeVariant;
  transform?: TransformVariant;
  weight?: WeightVariant;
  whiteSpace?: WhiteSpace;
  wordBreak?: WordBreakVariant;
};

export type TypographyGenericProps<T extends ElementType> = TypographyProps &
  OverflowProps & {
    as?: T;
  };
