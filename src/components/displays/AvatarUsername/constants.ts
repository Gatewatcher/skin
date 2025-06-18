import type { TextProps } from '@/skin/typography';

import type { AvatarUsernameSize } from './types';

export const AVATAR_USERNAME_SIZES = ['small', 'medium', 'large'] as const;

export const DEFAULT_AVATAR_USERNAME_SIZE: AvatarUsernameSize = 'medium';
export const TEXT_SIZES: Record<AvatarUsernameSize, TextProps['size']> = {
  small: 'small',
  medium: 'regular',
  large: 'regular',
};
