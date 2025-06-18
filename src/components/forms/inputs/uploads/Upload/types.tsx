import type { ProgressBaseProps } from '@/skin/feedback/progress/types';

export type ProgressLabelParams = Pick<ProgressBaseProps, 'percentage'> & {
  totalFiles: number;
  uploadingCount: number;
  uploadedCount: number;
};
