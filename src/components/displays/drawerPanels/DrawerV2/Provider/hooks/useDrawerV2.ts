import type { XOR } from '@gatewatcher/bistoury/utils-types';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useDrawerV2Context } from '../components/DrawerProvider';

type UseDrawerV2PersistenceOptions = XOR<
  { keepOn?: RegExp },
  { closeOn: RegExp }
> & {
  encode?: (id: string, props: unknown) => void;
  clean?: () => void;
};

export type UseDrawerV2Options = UseDrawerV2PersistenceOptions & {
  mainContentMinWidth?: number;
};

export type UseDrawerV2Return<T> = {
  close: () => void;
  isOpened: boolean;
  open: (props: T) => void;
};

export const useDrawerV2 = <T = void>(
  id: string,
  options: UseDrawerV2Options | null = null,
): UseDrawerV2Return<T> => {
  const context = useDrawerV2Context();
  const contextRef = useRef(context);
  const paramsRef = useRef({ id, options });

  useEffect(() => {
    contextRef.current = context;
    paramsRef.current = { id, options };
    return context.registerOptions(id, options);
  }, [context, id, options]);

  const handleOpen = useCallback(
    (props: T) =>
      contextRef.current.open(
        paramsRef.current.id,
        props,
        paramsRef.current.options,
      ),
    [],
  );

  const handleClose = useCallback(
    () => contextRef.current.closeWithId(paramsRef.current.id),
    [],
  );

  return useMemo(() => {
    return {
      close: handleClose,
      isOpened: context.currentId === paramsRef.current.id,
      open: handleOpen,
    };
  }, [context.currentId, handleClose, handleOpen]);
};
