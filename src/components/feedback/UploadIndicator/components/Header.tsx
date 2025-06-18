import { isFunction } from '@gatewatcher/bistoury/utils-lang';

import { ButtonIcon } from '@/skin/actions';
import { Stack } from '@/skin/layout';
import { Title } from '@/skin/typography';

import type { FileStatus, UploadFile } from '../..';
import { useUploadIndicatorContext } from '../context';
import { useUploadIndicator } from '../hook';
import CancelModal from './CancelModal';
import StatusResume from './StatusResume';

export type UploadIndicatorHeaderProps = {
  files: Record<FileStatus, UploadFile[]>;
  isUnfolded: boolean;
};

export const Header = ({ files, isUnfolded }: UploadIndicatorHeaderProps) => {
  const { title, cancelModal, queueRef } = useUploadIndicatorContext();

  const { clearAll, foldMenu, toggleMenu } = useUploadIndicator();

  const importedCount = files.success.length;
  const importingCount = files.pending.length + files.uploading.length;
  const isFinished = !files.pending.length && !files.uploading.length;

  const allFiles = Object.values(files).flat();

  const handleClose = () => {
    if (cancelModal) {
      foldMenu();
      isFinished ? clearAll() : queueRef.current?.pause();
    } else {
      clearAll();
    }
  };

  const closeButton = (
    <ButtonIcon
      icon="Close"
      onClick={handleClose}
      type="neutral"
      variant="ghosted"
    />
  );

  return (
    <Stack alignItems="center" justifyContent="space-between">
      <Title as="h5">
        {isFunction(title)
          ? title({ importedCount, importingCount, isFinished })
          : title}
      </Title>

      <Stack gap={4}>
        <StatusResume
          errorCount={files.error.length}
          successCount={files.success.length}
        />

        <ButtonIcon
          icon={isUnfolded ? 'ChevronDown' : 'ChevronUp'}
          onClick={toggleMenu}
          type="neutral"
          variant="ghosted"
        />

        {!isFinished ? (
          <CancelModal files={allFiles}>{closeButton}</CancelModal>
        ) : (
          closeButton
        )}
      </Stack>
    </Stack>
  );
};
