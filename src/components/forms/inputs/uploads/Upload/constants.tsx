import type { FileRejection } from 'react-dropzone';

export const DEFAULT_WITH_DROPZONE = true;
export const DEFAULT_WITH_FILES_LIST = true;
export const DEFAULT_WITH_PROGRESS = true;
export const DEFAULT_CONCURRENCY_COUNT = 10;
export const DEFAULT_FILES = [];
export const DEFAULT_ON_CHANGE = () => {};
export const DEFAULT_FORMAT_FILE_ERRORS = (rejection: FileRejection) =>
  rejection.errors.map(item => item.message);
