import type { ConcurrentQueue } from '@gatewatcher/bistoury/utils-event';
import type { Dispatch, ReactElement, ReactNode, SetStateAction } from 'react';
import { createContext, useContext } from 'react';

import type { UploadFile } from '..';
import { DEFAULT_TITLE, DEFAULT_UPLOAD_METHOD_REF } from './constant';

export type UploadIndicatorTitleData = {
  importedCount: number;
  importingCount: number;
  isFinished: boolean;
};

export type UploadIndicatorCancelModalData = {
  children: ReactElement;
  onContinue: () => void;
  onCancel: () => void;
};

export type UploadIndicatorContextType = {
  cancelModal?: (params: UploadIndicatorCancelModalData) => ReactNode;
  queueRef: { current: ConcurrentQueue<unknown> | null };
  setFilesRef: { current: Dispatch<SetStateAction<UploadFile[]>> };
  setIsUnfoldedRef: { current: Dispatch<SetStateAction<boolean>> };
  title?: string | ((data: UploadIndicatorTitleData) => string);
};

export const UploadIndicatorContext = createContext<UploadIndicatorContextType>(
  {
    queueRef: { current: null },
    setFilesRef: { current: DEFAULT_UPLOAD_METHOD_REF },
    setIsUnfoldedRef: { current: DEFAULT_UPLOAD_METHOD_REF },
    title: DEFAULT_TITLE,
  },
);

export const useUploadIndicatorContext = () =>
  useContext(UploadIndicatorContext);
