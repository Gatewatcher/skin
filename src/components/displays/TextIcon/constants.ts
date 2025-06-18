import type { TextProps } from '@/skin/typography';
import '@/skin/typography/constants';

import type { TextIconProps } from '.';

export const ICON_SIZES: Record<
  NonNullable<TextProps['size']>,
  TextIconProps['iconSize']
> = {
  'extra-small': 'small',
  small: 'medium',
  regular: 'medium',
};
