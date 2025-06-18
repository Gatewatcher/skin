import { faker } from '@faker-js/faker';
import { generateUniqId } from '@gatewatcher/bistoury/utils-lang';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '@/skin/actions';
import { Modal } from '@/skin/displays';
import { Input, createUploadFile } from '@/skin/forms';
import { Stack } from '@/skin/layout';

import type { UploadIndicatorProps } from '.';
import UploadIndicator from '.';
import type { UploadFile } from '..';
import { useUploadIndicator } from './hook';

faker.seed(10);

type Story = StoryObj<typeof UploadIndicator>;

export default {
  title: 'feedback/UploadIndicator',
  component: UploadIndicator,
} as Meta<typeof UploadIndicator>;

const Template: StoryFn<typeof UploadIndicator> = (
  args: UploadIndicatorProps,
) => (
  <UploadIndicator {...args}>
    <Input.Uploader
      uploadOptions={{
        endpoint: 'https://httpbin.org/post',
        method: 'POST',
        bodyType: 'formData',
      }}
    />
  </UploadIndicator>
);

export const Default: Story = {
  render: Template,
  args: {
    cancelModal: ({ children, onCancel, onContinue }) => (
      <Modal
        content={
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Cancel important</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Any incomplete uploads will be lost. Do you want to continue ?
            </Modal.Body>
            <Modal.Footer>
              <Modal.BasicActions
                cancelLabel="Cancel importation"
                onCancel={onCancel}
                onSave={onContinue}
                saveLabel="Continue importation"
              />
            </Modal.Footer>
          </Modal.Content>
        }
        size="small"
      >
        {children}
      </Modal>
    ),
  },
};

export const TwoDropzones: Story = {
  render: args => (
    <UploadIndicator {...args}>
      <Stack direction="column" gap={7}>
        <Input.Uploader
          uploadOptions={{
            endpoint: 'https://httpbin.org/post',
            method: 'POST',
            bodyType: 'formData',
          }}
        />
        <Input.Uploader
          uploadOptions={{
            endpoint: 'https://httpbin.org/post',
            method: 'POST',
            bodyType: 'formData',
          }}
        />
      </Stack>
    </UploadIndicator>
  ),
};

const AddFiles = () => {
  const { addFile, setFileInformations } = useUploadIndicator();
  const [files, setFiles] = useState<UploadFile[]>([]);

  const handleAddFiles = () => {
    const file = createUploadFile(
      new File([faker.lorem.sentences(10)], `${faker.lorem.word()}.txt`),
      {
        id: generateUniqId(),
        fileType: 'txt',
        uploadInformation: { uploadStatus: 'uploading', uploadPercentage: 0 },
      },
    );

    files.length &&
      setFileInformations(files.at(-1) as UploadFile, {
        uploadStatus: files.length % 2 === 0 ? 'success' : 'error',
      });
    setFiles(prev => [...prev, file]);
    addFile(file);
  };

  return <Button onClick={handleAddFiles}>Add files</Button>;
};

export const WithFiles: Story = {
  render: ({ children, ...args }) => {
    return (
      <UploadIndicator {...args}>
        <Input.Uploader
          uploadOptions={{
            endpoint: 'https://httpbin.org/post',
            method: 'POST',
            bodyType: 'formData',
          }}
        />
        {children}
      </UploadIndicator>
    );
  },
  args: {
    children: <AddFiles />,
  },
};

export const WithTransformErrors: Story = {
  render: ({ children, ...args }) => {
    return (
      <UploadIndicator {...args}>
        <Input.Uploader
          uploadOptions={{
            endpoint: 'https://httpbin.org/post',
            method: 'POST',
            body: () => {
              throw new Error('Nope');
            },
          }}
        />
        {children}
      </UploadIndicator>
    );
  },
};
