import { MESSAGE_TYPES } from '@/constants';
import type { IconName } from '@/skin/displays';

import type { BannerVariant } from './types';

export const BANNER_VARIANTS = MESSAGE_TYPES;

export const DEFAULT_VARIANT: BannerVariant = 'info';
export const DEFAULT_WITH_ICON = true;
export const DEFAULT_WITH_CLOSE = true;

export const BANNER_ICONS: Record<BannerVariant, IconName> = {
  info: 'CircleInfo',
  danger: 'CircleWarning',
  success: 'CircleCheck',
  warning: 'CircleWarning',
  error: 'CircleWarning',
};
