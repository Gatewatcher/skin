import { type ButtonProps } from '@/skin/actions';

import type { FileImageRatio, FileImageSize } from './types';

export const FILE_IMAGE_RATIOS = ['16:9', '4:3', '1:1'] as const;
export const FILE_IMAGE_SIZES = ['small', 'medium', 'large'] as const;

export const DEFAULT_RATIO: FileImageRatio = '16:9';
export const DEFAULT_SIZE: FileImageSize = 'medium';
export const DEFAULT_VARIANT: ButtonProps['variant'] = 'outlined';

export const RATIO_SIZES: Record<
  FileImageRatio,
  Record<FileImageSize, { width: number; height: number }>
> = {
  '16:9': {
    large: { width: 197, height: 111 },
    medium: { width: 155, height: 88 },
    small: { width: 113, height: 64 },
  },
  '4:3': {
    large: { width: 149, height: 112 },
    medium: { width: 117, height: 88 },
    small: { width: 85, height: 64 },
  },
  '1:1': {
    large: { width: 149, height: 149 },
    medium: { width: 88, height: 88 },
    small: { width: 64, height: 64 },
  },
};
