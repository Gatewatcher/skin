import type {
  SizeVariant,
  TypographyVariantsProps,
  WeightVariant,
} from './types';

export const SIZE_VARIANTS = ['regular', 'small', 'extra-small'] as const;
export const WEIGHT_VARIANTS = ['regular', 'medium', 'semibold'] as const;
export const WHITE_SPACES = [
  'normal',
  'nowrap',
  'pre',
  'pre-wrap',
  'pre-line',
] as const;

export const OVERFLOW_WRAP_VARIANTS = [
  'normal',
  'anywhere',
  'break-word',
] as const;

export const WORD_BREAK_VARIANTS = [
  'normal',
  'break-word',
  'break-all',
  'keep-all',
] as const;

export const ALIGNMENT_VARIANTS = [
  'start',
  'end',
  'center',
  'justify',
] as const;

export const TRANSFORM_VARIANTS = [
  'lowercase',
  'uppercase',
  'capitalize',
  'capitalizeFirstLetter',
] as const;

export const DEFAULT_SIZE: SizeVariant = 'regular';
export const DEFAULT_WEIGHT: WeightVariant = 'regular';

export const DEFAULT_VARIANTS: TypographyVariantsProps = {
  size: DEFAULT_SIZE,
  weight: DEFAULT_WEIGHT,
};
