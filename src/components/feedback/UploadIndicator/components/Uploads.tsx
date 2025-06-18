import { useState } from 'react';

import { withElevation } from '@/hocs';
import { Stack } from '@/skin/layout';
import { List } from '@/skin/listings';

import type { FileStatus, UploadFile } from '../..';
import { useUploadIndicatorContext } from '../context';
import { Header } from './Header';
import { UploadItem } from './UploadItem';

import styles from '../styles.module.scss';

const Uploads = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isUnfolded, setIsUnfolded] = useState(false);

  const { setFilesRef, setIsUnfoldedRef } = useUploadIndicatorContext();

  setFilesRef.current = setFiles;
  setIsUnfoldedRef.current = setIsUnfolded;

  if (!files.length) {
    return null;
  }

  const filteredFiles = files.reduce<Record<FileStatus, UploadFile[]>>(
    (acc, file) => {
      const status = file.uploadInformation?.uploadStatus;
      if (!status) return acc;

      acc[status].push(file);
      return acc;
    },
    { uploading: [], success: [], error: [], pending: [] },
  );

  const displayedFiles = [
    ...filteredFiles.error,
    ...filteredFiles.success.reverse(),
    ...filteredFiles.uploading,
    ...filteredFiles.pending,
  ];

  const content = (
    <Stack className={styles.Uploads} direction="column" gap={7}>
      <Header files={filteredFiles} isUnfolded={isUnfolded} />

      {isUnfolded && !!files.length && (
        <Stack className={styles.filesContainer}>
          <List
            columns={1}
            data={displayedFiles}
            data-testid="uploads"
            emptyElement={<></>}
            gap={0}
            initialPerPage={0}
            totalItemsCount={files.length}
            withControls={false}
          >
            {item => (
              <List.Item key={item.id} data-testid="upload">
                <UploadItem file={item} />
              </List.Item>
            )}
          </List>
        </Stack>
      )}
    </Stack>
  );

  return withElevation(content, 2);
};

export default Uploads;
