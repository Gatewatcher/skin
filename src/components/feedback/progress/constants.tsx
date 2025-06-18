import type { ProgressStatus } from './types';

export const PROGRESS_STATUS = ['uploading', 'success', 'error'] as const;

export const DEFAULT_STATUS: ProgressStatus = 'uploading';
export const DEFAULT_IS_INFINITE = false;
export const DEFAULT_LABEL_ERROR = 'Error';
