import { createContext, useContext } from 'react';
import type { DropzoneOptions } from 'react-dropzone';

export type DropzoneContextType = {
  isDragActive?: boolean;
  accept?: DropzoneOptions['accept'];
  maxSize?: number;
  open?: () => void;
};

export const DropzoneContext = createContext<DropzoneContextType | null>(null);

export const useDropzone = () => {
  const value = useContext(DropzoneContext);

  if (!value) {
    throw new Error(
      'useDropzone() must be used inside <DropzoneContext.Provider />.',
    );
  }

  return value;
};
