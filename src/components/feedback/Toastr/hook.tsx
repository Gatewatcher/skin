import { generateUniqId } from '@gatewatcher/bistoury/utils-lang';
import type { Modify } from '@gatewatcher/bistoury/utils-types';
import { useCallback } from 'react';

import { DEFAULT_DURATION } from './constants';
import { useToastrContext } from './context';
import type { Toast } from './types';

export const useToasts = () => {
  const { setToastRef, max } = useToastrContext();

  const addToast = useCallback(
    (toast: Modify<Toast, { id?: Toast['id'] }>) => {
      const toastId = toast.id || generateUniqId();
      const duration = toast.duration ?? DEFAULT_DURATION;

      setToastRef.current(prev => [
        ...prev.slice(-(max - 1)),
        {
          ...toast,
          id: toastId,
          duration,
        },
      ]);
      return toastId;
    },
    [setToastRef, max],
  );

  const removeToast = useCallback(
    (id: Toast['id']) => {
      setToastRef.current(prev => prev.filter(toast => toast.id !== id));
    },
    [setToastRef],
  );

  const clearAllToasts = useCallback(() => {
    setToastRef.current([]);
  }, [setToastRef]);

  return { addToast, removeToast, clearAllToasts };
};
