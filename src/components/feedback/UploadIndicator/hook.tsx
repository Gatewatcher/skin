import { useCallback } from 'react';

import type { UploadFile, UploadInformation } from '..';
import { useUploadIndicatorContext } from './context';

export const useUploadIndicator = () => {
  const { setFilesRef, setIsUnfoldedRef } = useUploadIndicatorContext();

  const addFile = useCallback(
    (file: UploadFile) => {
      setFilesRef.current(prev => [...prev, file]);
    },
    [setFilesRef],
  );

  const addFiles = useCallback(
    (files: UploadFile[]) => {
      setFilesRef.current(prev => [...prev, ...files]);
    },
    [setFilesRef],
  );

  const setFileInformations = useCallback(
    (currentFile: UploadFile, data: UploadInformation) => {
      setFilesRef.current(prev => {
        const index = prev.findIndex(file => file.id === currentFile.id);
        if (index == -1) return prev;

        const file = prev[index];
        file.uploadInformation = {
          ...file.uploadInformation,
          ...data,
        };

        return prev.toSpliced(index, 1, file);
      });
    },
    [setFilesRef],
  );

  const setFileErrors = useCallback(
    (id: string, errors: string[]) => {
      setFilesRef.current(prev => {
        const index = prev.findIndex(file => file.id === id);
        if (index === -1) return prev;
        const newFile = prev[index];
        newFile.errors = errors;

        return prev.toSpliced(index, 1, newFile);
      });
    },
    [setFilesRef],
  );

  const removeFile = useCallback(
    (id?: string) => {
      setFilesRef.current(prev => prev.filter(file => file.id !== id));
    },
    [setFilesRef],
  );

  const clearAll = useCallback(() => {
    setFilesRef.current([]);
  }, [setFilesRef]);

  const unfoldMenu = useCallback(() => {
    setIsUnfoldedRef.current(true);
  }, [setIsUnfoldedRef]);

  const foldMenu = useCallback(() => {
    setIsUnfoldedRef.current(false);
  }, [setIsUnfoldedRef]);

  const toggleMenu = useCallback(() => {
    setIsUnfoldedRef.current(prev => !prev);
  }, [setIsUnfoldedRef]);

  return {
    addFile,
    addFiles,
    setFileInformations,
    setFileErrors,
    removeFile,
    clearAll,
    unfoldMenu,
    foldMenu,
    toggleMenu,
  };
};
