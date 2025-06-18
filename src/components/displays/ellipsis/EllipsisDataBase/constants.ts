import type { ModalProps } from '@/skin/displays';

import type { EllipsedDataCountPosition, EllipsedDataDirection } from './types';

export const ELLIPSED_DATA_DIRECTIONS = ['row', 'column'] as const;
export const ELLIPSED_DATA_COUNT_POSITIONS = [
  'inline',
  'newline',
  'custom',
] as const;

export const DEFAULT_COUNT_POSITION: EllipsedDataCountPosition = 'inline';
export const DEFAULT_DIRECTION: EllipsedDataDirection = 'column';
export const DEFAULT_LIMIT = 3;

export const DEFAULT_MODAL_PROPS: Partial<ModalProps> = {
  size: 'small',
};
