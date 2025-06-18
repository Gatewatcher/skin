import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import type {
  TOASTR_POSITIONS,
  TOAST_TYPES_AS_FUNCTIONS,
  TOAST_TYPES_AS_ICONS,
} from './constants';

export type ToastrPosition = typeof TOASTR_POSITIONS[number];
export type ToastrOffset = { x: number; y: number };

export type ToastTypeAsFunction = typeof TOAST_TYPES_AS_FUNCTIONS[number];
export type ToastTypeAsIcon = typeof TOAST_TYPES_AS_ICONS[number];

export type ToastType = ToastTypeAsIcon | ToastTypeAsFunction;

export type Toast = DataTestId & {
  content?: ReactNode;
  duration?: number;
  id: string;
  onClose?: () => void;
  onDurationEnd?: () => void;
  title: string;
  type?: ToastType;
};
