import { formatBytes } from '@gatewatcher/bistoury/utils-lang';

import { ButtonIcon } from '@/skin/actions';
import { Chip } from '@/skin/displays';
import { Stack } from '@/skin/layout';
import { OverflownText, Text } from '@/skin/typography';
import { InternalText } from '@/skin/typography/Text';

import type { UploadFile } from '../..';
import { useUploadIndicator } from '../hook';
import Indicator from './Indicator';

import styles from '../styles.module.scss';

export type UploadItemProps = {
  file: UploadFile;
};

export const UploadItem = ({ file }: UploadItemProps) => {
  const { removeFile, setFileInformations } = useUploadIndicator();

  const handleRemove = () => {
    file.uploadInformation?.xhr?.abort();
    setFileInformations(file, { uploadStatus: 'pending', isCanceled: true });
    removeFile(file?.id);
  };

  return (
    <Stack
      className={styles.Item}
      direction="column"
      gap={2}
      padding={{ y: 6 }}
    >
      <Stack alignItems="center" justifyContent="space-between">
        <Stack alignItems="center" className={styles.ItemHeader}>
          <Stack.Item flexShrink={0} margin={{ right: 2 }}>
            <Indicator status={file.uploadInformation?.uploadStatus} />
          </Stack.Item>
          <OverflownText
            type={
              file.uploadInformation?.uploadStatus === 'error'
                ? 'error'
                : undefined
            }
            size="small"
            weight="medium"
          >
            {file.name}
          </OverflownText>
        </Stack>
        <Stack
          alignItems="center"
          className={styles.RemoveButton}
          gap={4}
          justifyContent="space-between"
        >
          {file.uploadInformation?.uploadStatus !== 'success' && (
            <ButtonIcon
              icon="Close"
              onClick={handleRemove}
              size="small"
              type="neutral"
              variant="ghosted"
            />
          )}
        </Stack>
      </Stack>

      <Stack alignItems="center" gap={4} justifyContent="space-between">
        <Stack alignItems="center" gap={3}>
          <Chip size="small" type="neutral">
            {file.fileType}
          </Chip>
          <Text size="small">{formatBytes(file.size, 0)}</Text>
        </Stack>

        {!!file.errors?.length && (
          <InternalText className={styles.ItemErrors} size="small" type="error">
            {file.errors}
          </InternalText>
        )}
      </Stack>
    </Stack>
  );
};
