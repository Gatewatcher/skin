import type { ReactElement } from 'react';

import type { UploadFile } from '../..';
import { useUploadIndicatorContext } from '../context';
import { useUploadIndicator } from '../hook';

export type CancelModalProps = {
  children: ReactElement;
  files: UploadFile[];
};

const CancelModal = ({ files, children }: CancelModalProps) => {
  const { cancelModal, queueRef } = useUploadIndicatorContext();
  const { clearAll, foldMenu, setFileInformations } = useUploadIndicator();

  const handleAbort = () => {
    queueRef.current?.pause();
    files.forEach(file => {
      file.uploadInformation?.xhr?.abort();
      setFileInformations(file, {
        uploadStatus: 'pending',
        isCanceled: true,
      });
    });
    clearAll();
    foldMenu();
  };

  const handleContinue = () => {
    queueRef.current?.run();
    foldMenu();
  };

  return cancelModal
    ? cancelModal?.({
        children,
        onCancel: handleAbort,
        onContinue: handleContinue,
      })
    : children;
};

export default CancelModal;
