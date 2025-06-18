import type { BreakpointProp } from '@/types';

import type { SPACING_VARIANT_KEYS } from './constants';

export type SpacingVariantKey = typeof SPACING_VARIANT_KEYS[number];

export type SpacingVariants<T = number> = {
  [key in SpacingVariantKey]?: BreakpointProp<T>;
};

export type MarginSpacingValues = number | 'auto';

export type Spacings = {
  margin?:
    | SpacingVariants<MarginSpacingValues>
    | BreakpointProp<MarginSpacingValues>;
  padding?: SpacingVariants | BreakpointProp;
};
