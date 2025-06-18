import { ConcurrentQueue } from '@gatewatcher/bistoury/utils-event';
import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import { Button } from '@/skin/actions';
import { Stack } from '@/skin/layout';

import type { UploadProps } from '.';
import Upload from '.';
import {
  DEFAULT_CONCURRENCY_COUNT,
  DEFAULT_FORMAT_FILE_ERRORS,
  DEFAULT_WITH_DROPZONE,
  DEFAULT_WITH_PROGRESS,
} from './constants';

type Story = StoryObj<typeof Upload>;

export default {
  title: 'forms/inputs/Upload',
  component: Upload,
  args: {
    concurrencyCount: DEFAULT_CONCURRENCY_COUNT,
    formatFileErrors: DEFAULT_FORMAT_FILE_ERRORS,
    withDropzone: DEFAULT_WITH_DROPZONE,
    withProgress: DEFAULT_WITH_PROGRESS,
    onInformationChange: () => {},
  },
} as Meta<typeof Upload>;

export const Default: Story = {};

export const WithInputs: Story = {
  args: {
    inputsContainer: <Stack gap={8} />,
    inputs: [
      { label: 'upload', startIcon: 'Add' },
      { label: 'file', startIcon: 'File' },
    ],
    uploadOptions: {
      endpoint: 'https://httpbin.org/post',
      method: 'POST',
    },
  },
};

export const WithUpload: Story = {
  args: {
    concurrencyCount: 2,
    uploadOptions: {
      endpoint: 'https://httpbin.org/post',
      method: 'POST',
      bodyType: 'formData',
    },
    filesType: (file: File) => {
      const ext = file.name.split('.').pop();
      return ext || '';
    },
    progressLabel: ({ uploadedCount, totalFiles }) =>
      `${uploadedCount} file(s) uploaded / ${totalFiles}`,
  },
};

export const WithRejections: Story = {
  args: {
    uploadOptions: {
      endpoint: 'https://httpbin.org/post',
      method: 'POST',
      bodyType: 'formData',
    },
    dropzoneOptions: {
      maxSize: 100,
      maxFiles: 1,
    },
    filesType: (file: File) => {
      const ext = file.name.split('.').pop();
      return ext || '';
    },
    progressLabel: ({ uploadedCount, totalFiles }) =>
      `${uploadedCount} file(s) uploaded / ${totalFiles}`,
  },
};

export const WithInnerComponent: Story = {
  render: (args: UploadProps) => {
    return <Upload {...args} />;
  },
  args: {
    concurrencyCount: 1,
    dropzoneOptions: { innerComponent: <div>Inner component</div> },
    uploadOptions: {
      endpoint: 'https://httpbin.org/post',
      method: 'POST',
      bodyType: 'formData',
    },
    filesType: (file: File) => {
      const ext = file.name.split('.').pop();
      return ext || '';
    },
    progressLabel: ({ uploadedCount, totalFiles }) =>
      `${uploadedCount} file(s) uploaded / ${totalFiles}`,
  },
};

export const WithExternalControl: Story = {
  render: (args: UploadProps) => {
    const [activated, setActivated] = useState(false);
    const queue = useRef(
      new ConcurrentQueue({ maxConcurrency: 1, keepResults: false }),
    );
    const handleClick = () => {
      if (!activated) {
        queue.current.run();
      } else if (activated) {
        queue.current.pause();
      }
      setActivated(prevState => !prevState);
    };
    return (
      <>
        <Button onClick={handleClick}>
          {`Queue is ${activated ? 'running' : 'paused'}`}
        </Button>
        <Upload
          {...args}
          uploadOptions={{
            endpoint: 'https://httpbin.org/post',
            method: 'POST',
            bodyType: 'formData',
            onLoadStart: () => {
              queue.current.pause();
            },
          }}
          queue={queue.current}
        />
      </>
    );
  },
  args: {
    concurrencyCount: 1,
    filesType: (file: File) => {
      const ext = file.name.split('.').pop();
      return ext || '';
    },
    progressLabel: ({ uploadedCount, totalFiles }) =>
      `${uploadedCount} file(s) uploaded / ${totalFiles}`,
  },
};
