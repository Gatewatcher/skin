import {
  ICON_DEFAULT_SIZE,
  ICON_NAMES,
  ICON_SIZES,
  THEME_COLORS,
  TYPES_WITH_NEUTRAL,
} from '@/constants';
import { addInlineRadio, addSelect } from '@/storybook';

import type { IconProps } from './Icon';

export const getDefaultArgsTypes = <T extends keyof object>() => ({
  ...addSelect<T>('color', [...THEME_COLORS, ...TYPES_WITH_NEUTRAL]),
  ...addSelect<T>('name', ICON_NAMES),
  ...addInlineRadio<T>('size', ICON_SIZES),
});

export const getDefaultArgs = (): Partial<IconProps> => ({
  size: ICON_DEFAULT_SIZE,
});
