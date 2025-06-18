import type { ReactNode } from 'react';

import { MESSAGE_TYPES } from '@/constants';
import type { IconName } from '@/skin/displays';
import { CircularLoader } from '@/skin/feedback';

import type {
  ToastTypeAsFunction,
  ToastTypeAsIcon,
  ToastrOffset,
  ToastrPosition,
} from './types';

export const TOASTR_POSITIONS = [
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
] as const;

export const TOAST_TYPES_AS_FUNCTIONS = ['loader'] as const;
export const TOAST_TYPES_AS_ICONS = [...MESSAGE_TYPES] as const;

export const TOAST_TYPES = [
  ...TOAST_TYPES_AS_ICONS,
  ...TOAST_TYPES_AS_FUNCTIONS,
] as const;

export const DEFAULT_TOAST_METHOD_REF = () => {};
export const DEFAULT_DURATION = 5000;
export const DEFAULT_MAX = 5;
export const DEFAULT_POSITION: ToastrPosition = 'bottom-right';
export const DEFAULT_OFFSET: ToastrOffset = { x: 9, y: 9 };

export const TOAST_TYPES_BY_FUNCTIONS: Record<
  ToastTypeAsFunction,
  () => ReactNode
> = {
  loader: () => <CircularLoader />,
};

export const TOAST_ICONS_BY_ICONS: Record<ToastTypeAsIcon, IconName> = {
  info: 'CircleFilledInfo',
  success: 'CircleFilledCheck',
  warning: 'CircleFilledWarning',
  danger: 'CircleFilledWarning',
  error: 'CircleFilledWarning',
};

export const TOAST_ICONS = {
  ...TOAST_ICONS_BY_ICONS,
  ...TOAST_TYPES_BY_FUNCTIONS,
};
