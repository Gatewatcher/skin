import type { TextProps } from '@/skin/typography';
import type { IconSize } from '@/types';

import type { Size } from './types';

export const SIZES = ['regular', 'small'] as const;

export const DEFAULT_SIZE: Size = 'regular';

export const sizesMatching: Record<
  Size,
  { icon: IconSize; text: TextProps['size'] }
> = {
  regular: { icon: 'medium', text: 'regular' },
  small: { icon: 'small', text: 'small' },
};
