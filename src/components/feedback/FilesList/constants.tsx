import type { ReactElement } from 'react';

import { Icon } from '@/skin/displays';

import type {
  FileStatus,
  UploadInformation,
} from '../../forms/inputs/uploads/types';
import { CircularLoader } from '../loaders';

export const SUFFIX_TEST_IDS = [
  'confirmation',
  'options',
  'size',
  'download',
  'delete',
];

export const DEFAULT_LIST_FILES = [];
export const DEFAULT_FILE_INFORMATION: UploadInformation = {
  uploadStatus: 'success',
};
export const DEFAULT_FILE_STATUS: FileStatus = 'success';
export const DEFAULT_FILE_ERRORS = [];
export const DEFAULT_WITH_DOWNLOAD = true;
export const DEFAULT_WITH_SIZE = true;
export const DEFAULT_WITH_PADDING_ON_ENDS = true;

export const STATUS_ICONS: Record<FileStatus, () => ReactElement> = {
  uploading: () => <CircularLoader />,
  success: () => <Icon color="info" name="Check" />,
  error: () => <Icon color="error" name="Warning" />,
  pending: () => <Icon color="info" name="OverflowMenuHorizontal" />,
};
