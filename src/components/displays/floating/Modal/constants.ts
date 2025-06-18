import type { ModalScrollOn, ModalSize } from './types';

export const MODAL_SIZES = [
  'small',
  'medium',
  'large',
  'semi-full',
  'full',
] as const;
export const MODAL_SCROLL_ON = ['modal', 'body'] as const;

export const DEFAULT_SIZE: ModalSize = 'medium';
export const DEFAULT_SCROLL_ON: ModalScrollOn = 'modal';
export const DEFAULT_WITH_BACKDROP = true;

export const DEFAULT_CANCEL_LABEL = 'Cancel';
export const DEFAULT_SAVE_LABEL = 'Save';
