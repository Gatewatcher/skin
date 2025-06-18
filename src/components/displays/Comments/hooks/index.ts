import { useCallback } from 'react';

import { useCommentsContext } from '../context';

export const useCommentThread = (id: string) => {
  const { openedThreads, setOpenedThreads } = useCommentsContext();

  const openThread = useCallback(() => {
    setOpenedThreads(prev => ({
      ...prev,
      [id]: true,
    }));
  }, [id, setOpenedThreads]);

  const closeThread = useCallback(() => {
    setOpenedThreads(prev => ({
      ...prev,
      [id]: false,
    }));
  }, [id, setOpenedThreads]);

  const toggleThread = useCallback(() => {
    setOpenedThreads(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, [id, setOpenedThreads]);

  return {
    closeThread,
    openThread,
    toggleThread,
    threadOpened: openedThreads[id],
  };
};
