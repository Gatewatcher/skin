import { type ReactNode, useCallback, useEffect, useMemo, useRef } from 'react';

import { useDrawerV2Context } from '../components/DrawerProvider';

export type UseCurrentDrawerReturn = {
  id: string | null;
  isOpened: boolean;
  content: ReactNode;
  close: () => void;
};

export const useCurrentDrawer = (): UseCurrentDrawerReturn => {
  const context = useDrawerV2Context();
  const contextRef = useRef(context);

  useEffect(() => {
    contextRef.current = context;
  }, [context]);

  const handleClose = useCallback(() => {
    contextRef.current.closeAll();
  }, []);

  return useMemo(
    () => ({
      close: handleClose,
      content: context.content,
      id: context.currentId,
      isOpened: !!context.currentId,
    }),
    [context.content, context.currentId, handleClose],
  );
};
