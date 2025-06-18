import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import { Icon } from '@/skin/displays';
import { CircularLoader } from '@/skin/feedback';
import { DEFAULT_PREVIEW_ICON_NAME } from '@/skin/forms/inputs/ChatBox/constants';
import { Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';

import type { AttachmentOptions, ChatBoxAttachment } from '../types';
import { splitFilename } from '../utils';

import styles from '../styles.module.scss';

type AttachmentProps<T extends ChatBoxAttachment> = DataTestId & {
  attachment: T;
  errors?: string;
  onAttachmentDelete?: (attachment: T) => void;
} & Partial<AttachmentOptions>;

export const Attachment = <T extends ChatBoxAttachment>({
  'data-testid': testId = 'attachment',
  attachment,
  errors,
  onAttachmentDelete,
  previewIconName = DEFAULT_PREVIEW_ICON_NAME,
}: AttachmentProps<T>) => {
  const [filename, extension] = splitFilename(attachment.name);

  const handleClickDelete = () => {
    onAttachmentDelete?.(attachment);
  };

  return (
    <Stack
      className={styles.Attachment}
      data-testid={testId}
      gap={4}
      padding={3}
    >
      <Stack
        alignItems="center"
        className={classNames(styles.defaultAttachmentPreview)}
        justifyContent="center"
        padding={2}
      >
        {attachment.isLoading && !attachment.loadingProgress && (
          <CircularLoader backgroundCircleColor="blue" currentColor />
        )}
        {!attachment.isLoading && (
          <Icon name={previewIconName} size="large" currentColor />
        )}
      </Stack>
      <Stack
        className={styles.AttachmentTextContainer}
        direction="column"
        justifyContent="center"
      >
        <Stack>
          <Text
            weight="semibold"
            whiteSpace="nowrap"
            overflowHidden
            textEllipsis
          >
            {filename}
          </Text>
          <Text weight="semibold">{extension}</Text>
        </Stack>
        {errors && (
          <Text
            data-testid={suffixTestId(testId, 'error')}
            size="small"
            type="error"
          >
            {errors}
          </Text>
        )}
      </Stack>
      {onAttachmentDelete && !attachment.isLoading && (
        <span
          className={styles.AttachmentCloseButton}
          data-testid={suffixTestId(testId, 'delete')}
          onClick={handleClickDelete}
        >
          <Icon name="Close" currentColor />
        </span>
      )}
    </Stack>
  );
};
