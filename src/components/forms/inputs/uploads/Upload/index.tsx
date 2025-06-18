import { useDidMountEffect } from '@gatewatcher/bistoury/hooks';
import { ConcurrentQueue } from '@gatewatcher/bistoury/utils-event';
import { generateUniqId, isFunction } from '@gatewatcher/bistoury/utils-lang';
import type {
  DataTestId,
  RequiredOnly,
} from '@gatewatcher/bistoury/utils-types';
import type { ReactElement, ReactNode } from 'react';
import { cloneElement, useEffect, useMemo, useRef, useState } from 'react';
import type { FileRejection } from 'react-dropzone';

import type { UploadFile, UploadInformation } from '@/skin/feedback';
import { FilesList, LinearProgress } from '@/skin/feedback';
import { Stack } from '@/skin/layout';
import type { UploadOptions, UploadProgress } from '@/utils';
import { upload } from '@/utils';

import type { InputFileProps } from '../../..';
import { Input } from '../../..';
import type { DropzoneProps } from '../../Dropzone';
import { DEFAULT_FORM_DATA_NAME } from '../constants';
import { calcFileProgress, createUploadFile, generateFormData } from '../utils';
import {
  DEFAULT_CONCURRENCY_COUNT,
  DEFAULT_FILES,
  DEFAULT_FORMAT_FILE_ERRORS,
  DEFAULT_ON_CHANGE,
  DEFAULT_WITH_DROPZONE,
  DEFAULT_WITH_FILES_LIST,
  DEFAULT_WITH_PROGRESS,
} from './constants';
import type { ProgressLabelParams } from './types';

export type UploadProps = DataTestId & {
  concurrencyCount?: number;
  queue?: ConcurrentQueue<unknown>;
  dropzone?: ReactNode;
  dropzoneOptions?: DropzoneProps;
  formatFileErrors?: (rejection: FileRejection) => string[];
  files?: UploadFile[];
  filesType?: string | ((file: File) => string);
  formDataName?: string;
  inputs?: InputFileProps[];
  inputsContainer?: ReactNode;
  list?: ReactNode;
  onChange?: (files: UploadFile[]) => void;
  onInformationChange?: (
    filesInformation: Record<string, UploadInformation>,
  ) => void;
  progressLabel?: string | ((params: ProgressLabelParams) => string);
  uploadOptions?: RequiredOnly<UploadOptions, 'endpoint'>;
  withDropzone?: boolean;
  withFilesList?: boolean;
  withProgress?: boolean;
};

const Upload = ({
  concurrencyCount = DEFAULT_CONCURRENCY_COUNT,
  'data-testid': testId = 'input-upload',
  dropzone,
  dropzoneOptions,
  formatFileErrors = DEFAULT_FORMAT_FILE_ERRORS,
  files = DEFAULT_FILES,
  filesType,
  formDataName = DEFAULT_FORM_DATA_NAME,
  inputs,
  inputsContainer,
  list,
  onChange = DEFAULT_ON_CHANGE,
  onInformationChange = DEFAULT_ON_CHANGE,
  progressLabel,
  queue,
  uploadOptions,
  withDropzone = DEFAULT_WITH_DROPZONE,
  withFilesList = DEFAULT_WITH_FILES_LIST,
  withProgress = DEFAULT_WITH_PROGRESS,
}: UploadProps) => {
  const needUpload = !!uploadOptions;
  const {
    endpoint = '',
    onProgress,
    onLoadStart,
    onFulfilled,
    ...restUploadOptions
  } = uploadOptions ?? {};
  const [currentFiles, setCurrentFiles] = useState<UploadFile[]>([]);
  const [totalProgress, setTotalProgress] = useState<
    Record<string, UploadProgress>
  >({});
  const [filesStatus, setFilesStatus] = useState<
    Record<string, UploadInformation>
  >({});

  const defaultQueueRef = useRef(
    new ConcurrentQueue({
      maxConcurrency: concurrencyCount,
      keepResults: true,
    }),
  );

  const defaultQueue = defaultQueueRef.current;

  const uploadQueue = queue || defaultQueue;

  useEffect(
    () => onInformationChange(filesStatus),
    [filesStatus, onInformationChange],
  );

  useDidMountEffect(() => {
    if (Array.isArray(files)) {
      setCurrentFiles(prev => [...prev, ...files]);
    }
  }, [files]);

  useDidMountEffect(() => {
    if (Array.isArray(currentFiles)) {
      onChange(currentFiles);
    }
  }, [currentFiles]);

  useEffect(() => {
    if (!needUpload) return;

    const filesToUpload = currentFiles.filter(
      file => filesStatus[file.id as string].uploadStatus === 'pending',
    );

    uploadQueue.addTasks(
      filesToUpload.map(file => () => {
        const { bodyType = 'formData' } = uploadOptions;

        return upload({
          endpoint,
          id: file.id,
          body:
            bodyType === 'formData'
              ? generateFormData(file, formDataName)
              : file,
          onProgress: progress => {
            setTotalProgress(prev => ({
              ...prev,
              [file.id as string]: progress,
            }));
            setFileStatus(file, {
              uploadStatus: 'uploading',
              uploadPercentage: calcFileProgress(progress),
            });
            onProgress?.(progress);
          },
          onLoadStart: xhr => {
            setFileStatus(file, {
              uploadStatus: 'uploading',
              uploadPercentage: 0,
            });
            onLoadStart?.(xhr);
          },
          onFulfilled: ({ body, xhr, resolve, reject, id }) => {
            if (xhr.status >= 200 && xhr.status < 300) {
              setFileStatus(file, {
                uploadStatus: 'success',
                uploadPercentage: 100,
              });
              resolve();
            } else {
              setFileStatus(file, { uploadStatus: 'error' });
              reject(`Error during file upload : ${file.name}`);
            }
            onFulfilled?.({ body, xhr, resolve, reject, id });
          },
          ...restUploadOptions,
        });
      }),
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFiles]);

  const uploadedFilesCount = useMemo(() => {
    return Object.values(totalProgress).filter(
      progress => progress.percentage === 100,
    ).length;
  }, [totalProgress]);

  const uploadingFilesCount = useMemo(() => {
    return Object.keys(totalProgress).length - uploadedFilesCount;
  }, [totalProgress, uploadedFilesCount]);

  const totalBytes = useMemo(() => {
    return Object.values(totalProgress).reduce(
      (acc, item) => acc + item.total,
      0,
    );
  }, [totalProgress]);

  const totalLoaded = useMemo(() => {
    return Object.values(totalProgress).reduce(
      (acc, item) => acc + item.loaded,
      0,
    );
  }, [totalProgress]);

  const percentage = useMemo(() => {
    return Math.round((totalLoaded / totalBytes) * 100) || 0;
  }, [totalBytes, totalLoaded]);

  const setFileStatus = (file: UploadFile, status: UploadInformation) => {
    setFilesStatus(prev => ({ ...prev, [file.id as string]: status }));
  };

  const onDropAccepted = (files: File[]) => {
    const newFiles: UploadFile[] = files.map(file => {
      const newFile = createUploadFile(file, {
        id: generateUniqId(),
        fileType: isFunction(filesType) ? filesType(file) : filesType,
        uploadInformation: { uploadStatus: 'pending' },
      });
      setFileStatus(file, { uploadStatus: 'pending' });
      return newFile;
    });

    setCurrentFiles(prev => [...prev, ...newFiles]);
  };

  const onDropRejected = (rejections: FileRejection[]) => {
    const newFiles: UploadFile[] = rejections.map(rejection => {
      const newFile = createUploadFile(rejection.file, {
        id: generateUniqId(),
        uploadInformation: { uploadStatus: 'error' },
        fileType: isFunction(filesType) ? filesType(rejection.file) : filesType,
        errors: formatFileErrors(rejection),
      });
      setFileStatus(rejection.file, { uploadStatus: 'error' });
      return newFile;
    });

    setCurrentFiles(prev => [...prev, ...newFiles]);
  };

  const handleDelete = (file: UploadFile) => {
    setCurrentFiles(files => files.filter(f => f.id !== file.id));
    setTotalProgress(prev => {
      const newData = { ...prev };
      delete newData[file.id as string];
      return newData;
    });
  };

  return (
    <Stack data-testid={testId} direction="column" gap={8}>
      {dropzone ||
        (withDropzone && (
          <Input.Dropzone
            onDropAccepted={onDropAccepted}
            onDropRejected={onDropRejected}
            {...dropzoneOptions}
          />
        ))}
      {needUpload && withProgress && (
        <LinearProgress
          label={
            isFunction(progressLabel)
              ? progressLabel({
                  percentage,
                  totalFiles: uploadedFilesCount + uploadingFilesCount,
                  uploadedCount: uploadedFilesCount,
                  uploadingCount: uploadingFilesCount,
                })
              : progressLabel
          }
          percentage={percentage}
        />
      )}
      {withFilesList &&
        (list || (
          <FilesList files={currentFiles}>
            {file => (
              <FilesList.Item
                key={file.id || file.name}
                fileStatus={
                  needUpload
                    ? filesStatus[file.id as string]?.uploadStatus
                    : 'success'
                }
                file={file}
                fileType={file.fileType}
                onDelete={() => handleDelete(file)}
                {...file}
              />
            )}
          </FilesList>
        ))}
      {inputs &&
        cloneElement(
          (inputsContainer || <div />) as ReactElement,
          {},
          inputs.map((input, index) => (
            <Input.File
              key={index}
              {...input}
              onChange={params => {
                onDropAccepted(params.files);
                input.onChange?.(params);
              }}
            />
          )),
        )}
    </Stack>
  );
};

export default Upload;
