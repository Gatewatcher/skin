import { useDidMountEffect } from '@gatewatcher/bistoury/hooks';
import { ConcurrentQueue } from '@gatewatcher/bistoury/utils-event';
import {
  generateUniqId,
  isFunction,
  isJSON,
  isString,
} from '@gatewatcher/bistoury/utils-lang';
import type {
  DataTestId,
  RequiredOnly,
} from '@gatewatcher/bistoury/utils-types';
import { useRef, useState } from 'react';
import type { DropEvent, FileRejection } from 'react-dropzone';

import { useUploadIndicatorContext } from '@/skin/feedback/UploadIndicator/context';
import { useUploadIndicator } from '@/skin/feedback/UploadIndicator/hook';
import type { UploadOptions } from '@/utils';
import { upload } from '@/utils';

import { Input, createUploadFile } from '../../..';
import type { DropzoneProps } from '../../Dropzone';
import type { UploadFile } from '../types';
import { calcFileProgress, generateFormData } from '../utils';
import { DEFAULT_DROPZONE_CONFIG, DEFAULT_MAX_CONCURRENCY } from './constants';

type Awaitable<T> = T | Promise<T>;

export type UploaderProps = DataTestId & {
  dropzoneConfig?: DropzoneProps;
  fileType?: string | ((file: File) => string);
  formDataName?: string;
  maxConcurrency?: number;
  queue?: ConcurrentQueue<unknown>;
  uploadOptions?: Omit<RequiredOnly<UploadOptions, 'endpoint'>, 'body'> & {
    body?: (file: File) => Awaitable<FormData | File>;
    errorNormalizer?: (error: unknown) => string;
  };
};

const Uploader = ({
  'data-testid': testId = 'input-uploader',
  dropzoneConfig = DEFAULT_DROPZONE_CONFIG,
  fileType,
  formDataName = 'file',
  maxConcurrency = DEFAULT_MAX_CONCURRENCY,
  uploadOptions,
  queue,
}: UploaderProps) => {
  const { addFiles, setFileInformations, setFileErrors } = useUploadIndicator();
  const { queueRef } = useUploadIndicatorContext();
  const { onDropAccepted, onDropRejected, ...dropzoneOptions } = dropzoneConfig;

  const [acceptedFiles, setAcceptedFiles] = useState<UploadFile[]>([]);
  const needUpload = !!uploadOptions;

  const getFileType = (file: File) => {
    if (!fileType) {
      return file.name.split('.').at(-1);
    }

    return isFunction(fileType) ? fileType?.(file) : fileType;
  };

  const handleDropAccepted = (files: File[], event: DropEvent) => {
    const newFiles: UploadFile[] = files.map(file => {
      return createUploadFile(file, {
        id: generateUniqId(),
        fileType: getFileType(file),
        uploadInformation: { uploadStatus: 'pending' },
      });
    });

    addFiles(newFiles);
    setAcceptedFiles(newFiles);

    onDropAccepted?.(files, event);
  };

  const handleDropRejected = (
    rejections: FileRejection[],
    event: DropEvent,
  ): void => {
    const newFiles: UploadFile[] = rejections.map(rejection => {
      return createUploadFile(rejection.file, {
        id: generateUniqId(),
        fileType: getFileType(rejection.file),
        uploadInformation: { uploadStatus: 'error' },
        errors: rejection.errors.map(item => item.message),
      });
    });

    addFiles(newFiles);

    onDropRejected?.(rejections, event);
  };

  const internalQueueRef = useRef(
    new ConcurrentQueue({
      maxConcurrency,
      keepResults: true,
    }),
  );

  const uploadQueue = queue || internalQueueRef.current;

  queueRef.current = uploadQueue;

  useDidMountEffect(() => {
    if (!needUpload) return;

    const {
      endpoint,
      body,
      method,
      onProgress,
      onLoadStart,
      onFulfilled,
      onError,
      errorNormalizer,
      onSuccess,
      ...rest
    } = uploadOptions;

    uploadQueue.addTasks(
      acceptedFiles.map(file => async () => {
        const { bodyType = 'formData' } = uploadOptions;

        let transformedBody: File | FormData;
        let bodyContent: File | FormData;
        try {
          transformedBody = body ? await body(file) : file;
          bodyContent =
            bodyType === 'formData'
              ? transformedBody instanceof FormData
                ? transformedBody
                : generateFormData(file, formDataName)
              : transformedBody;
        } catch (error) {
          setFileInformations(file, {
            uploadStatus: 'error',
          });

          if (file.id) {
            setFileErrors(
              file.id,
              [error instanceof Error && error.message].filter(isString),
            );
          }

          return onError?.(error);
        }

        return upload({
          endpoint,
          method: method || 'POST',
          id: file.id,
          body: bodyContent,
          onLoadStart: xhr => {
            if (file.uploadInformation?.isCanceled) {
              xhr.abort();
              return;
            }

            setFileInformations(file, {
              uploadStatus: 'uploading',
              uploadPercentage: 0,
              xhr,
            });
            onLoadStart?.(xhr);
          },
          onProgress: progress => {
            setFileInformations(file, {
              uploadStatus: 'uploading',
              uploadPercentage: calcFileProgress(progress),
            });
            onProgress?.(progress);
          },
          onFulfilled: data => {
            const { xhr, resolve, reject } = data;
            if (xhr.status >= 200 && xhr.status < 300) {
              setFileInformations(file, {
                uploadStatus: 'success',
                uploadPercentage: 100,
              });
              resolve();
              onSuccess?.(data);
            } else {
              setFileInformations(file, {
                uploadStatus: 'error',
              });
              if (file.id && errorNormalizer && isJSON(xhr.response)) {
                setFileErrors(file.id, [
                  errorNormalizer(JSON.parse(xhr.response)),
                ]);
              }
              reject(`Error during file upload: ${file.name}`);
              onError?.(data);
            }
            onFulfilled?.(data);
          },
          onError,
          ...rest,
        });
      }),
    );
  }, [acceptedFiles]);

  return (
    <Input.Dropzone
      data-testid={testId}
      onDropAccepted={handleDropAccepted}
      onDropRejected={handleDropRejected}
      {...dropzoneOptions}
    />
  );
};

export default Uploader;
