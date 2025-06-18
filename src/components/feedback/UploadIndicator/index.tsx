import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';
import { useMemo, useRef } from 'react';

import Uploads from './components/Uploads';
import { DEFAULT_TITLE, DEFAULT_UPLOAD_METHOD_REF } from './constant';
import type { UploadIndicatorContextType } from './context';
import { UploadIndicatorContext } from './context';

export type UploadIndicatorProps = DataTestId &
  Pick<UploadIndicatorContextType, 'title' | 'cancelModal'> & {
    children: ReactNode;
  };

const UploadIndicator = ({
  children,
  title = DEFAULT_TITLE,
  cancelModal,
}: UploadIndicatorProps) => {
  const setFilesRef = useRef(DEFAULT_UPLOAD_METHOD_REF);
  const setIsUnfoldedRef = useRef(DEFAULT_UPLOAD_METHOD_REF);
  const queueRef = useRef(null);

  const contextValue = useMemo<UploadIndicatorContextType>(
    () => ({
      cancelModal,
      queueRef,
      setFilesRef,
      setIsUnfoldedRef,
      title,
    }),
    [cancelModal, queueRef, setFilesRef, setIsUnfoldedRef, title],
  );

  return (
    <UploadIndicatorContext.Provider value={contextValue}>
      <Uploads />
      {children}
    </UploadIndicatorContext.Provider>
  );
};

export default UploadIndicator;
