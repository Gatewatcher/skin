import { MESSAGE_TYPES } from '@/constants';
import type { IconName } from '@/skin/displays';

import type { HelperVariant } from './types';

export const HELPER_VARIANTS = MESSAGE_TYPES;

export const DEFAULT_VARIANT: HelperVariant = 'info';
export const DEFAULT_WITH_ICON = true;
export const DEFAULT_WITH_CLOSE = true;

export const HELPER_ICONS: Record<HelperVariant, IconName> = {
  info: 'CircleInfo',
  danger: 'CircleWarning',
  success: 'CircleCheck',
  warning: 'CircleWarning',
  error: 'CircleWarning',
};
