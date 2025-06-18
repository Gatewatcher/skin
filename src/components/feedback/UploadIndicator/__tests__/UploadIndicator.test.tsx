import { faker } from '@faker-js/faker';
import { generateUniqId } from '@gatewatcher/bistoury/utils-lang';
import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { Button } from '@/skin/actions';
import { createUploadFile } from '@/skin/forms';

import type { UploadFile, UploadIndicatorProps } from '../..';
import { UploadIndicator } from '../..';
import { useUploadIndicator } from '../hook';

faker.seed(10);

describe('UploadIndicator', () => {
  const renderComponent = (props: Partial<UploadIndicatorProps> = {}) => {
    const AddFile = () => {
      const { addFile, setFileInformations } = useUploadIndicator();
      const [files, setFiles] = useState<UploadFile[]>([]);

      const handleAddFile = () => {
        const file = createUploadFile(
          new File([faker.lorem.sentences(10)], 'new-file.txt'),
          {
            id: generateUniqId(),
            fileType: 'txt',
            uploadInformation: {
              uploadStatus: 'uploading',
              uploadPercentage: 0,
            },
          },
        );

        addFile(file);
        setFiles(prev => [...prev, file]);
      };

      const setSuccess = () => {
        setFileInformations(files.at(-1) as UploadFile, {
          uploadStatus: 'success',
          uploadPercentage: 100,
        });
      };

      const setErrors = () => {
        setFileInformations(files.at(-1) as UploadFile, {
          uploadStatus: 'error',
          uploadPercentage: 10,
        });
      };

      return (
        <>
          <Button onClick={handleAddFile}>Add file</Button>
          <Button onClick={setSuccess}>Set success</Button>
          <Button onClick={setErrors}>Set error</Button>
        </>
      );
    };

    render(
      <UploadIndicator {...props}>
        <AddFile />
      </UploadIndicator>,
    );
  };

  const user = userEvent.setup();

  const addFile = async () => {
    await user.click(await screen.findByText('Add file'));
  };

  it('should have files', async () => {
    renderComponent();
    await addFile();

    await expectToBeVisibleInTheDocument(
      'Importing 1 files...',
      screen.findByText,
    );
  });

  it('should have title', async () => {
    renderComponent({
      title: ({ importingCount }) => `importing ${importingCount} files`,
    });

    await addFile();
    await expectToBeVisibleInTheDocument(
      'importing 1 files',
      screen.findByText,
    );
    await addFile();
    await expectToBeVisibleInTheDocument(
      'importing 2 files',
      screen.findByText,
    );
  });
});
