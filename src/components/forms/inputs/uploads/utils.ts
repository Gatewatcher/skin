import type { UploadFile, UploadFileProps } from '@/skin/feedback';
import type { UploadProgress } from '@/utils';

export const createUploadFile = (
  file: File,
  params: Partial<UploadFileProps> = {},
): UploadFile => {
  const extendedFile = file as UploadFile;
  Object.entries(params).forEach(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ([key, value]: [string, any]) =>
      (extendedFile[key as keyof UploadFileProps] = value),
  );
  return extendedFile;
};

export const calcFileProgress = (progress: UploadProgress) => {
  return (
    progress?.percentage ||
    Math.round((progress?.loaded / progress?.total) * 100)
  );
};

export const generateFormData = (file: UploadFile, formDataName: string) => {
  const data = new FormData();
  data.append(formDataName, file, file.name);
  return data;
};
