import { getThemeValue } from '@/utils';

import { type FileImageSize } from './types';

export const getBorderRadius = (size: FileImageSize) => {
  const BORDER_RADIUS: Record<FileImageSize, string> = {
    large: getThemeValue('--border-radius-large'),
    medium: getThemeValue('--border-radius-medium'),
    small: getThemeValue('--border-radius-regular'),
  };

  return BORDER_RADIUS[size];
};
