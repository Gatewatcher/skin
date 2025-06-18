import type { UploadIndicatorTitleData } from './context';

export const DEFAULT_UPLOAD_METHOD_REF = () => {};
export const DEFAULT_TITLE = ({
  importedCount,
  importingCount,
  isFinished,
}: UploadIndicatorTitleData) =>
  isFinished
    ? `${importedCount} files imported`
    : `Importing ${importingCount} files...`;
