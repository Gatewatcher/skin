import type { FILE_STATUS } from './constants';

export type FileStatus = typeof FILE_STATUS[number];

export type UploadInformation = {
  uploadStatus: FileStatus;
  uploadPercentage?: number;
  xhr?: XMLHttpRequest;
  isCanceled?: boolean;
};

export interface UploadFileProps {
  id?: string;
  uploadInformation?: UploadInformation;
  fileType?: string;
  errors?: string[];
}

export interface UploadFile extends File, UploadFileProps {}
