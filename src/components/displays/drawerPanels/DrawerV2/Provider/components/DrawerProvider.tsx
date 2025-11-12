import type { ReactNode } from 'react';
import { createContext, useContext, useMemo } from 'react';

import type { UseDrawerV2Options } from '../hooks/useDrawerV2';

type DrawerV2Context = {
  closeAll: () => void;
  closeWithId: (id: string) => void;
  content: ReactNode | null;
  currentId: string | null;
  open: (
    id: string,
    props: unknown,
    options: UseDrawerV2Options | null,
  ) => void;
  registerOptions: (
    id: string,
    options: UseDrawerV2Options | null,
  ) => () => void;
  unregisterOptions: (id: string) => void;
};

const Context = createContext<DrawerV2Context | null>(null);

type DrawerProviderProps = DrawerV2Context & {
  children?: ReactNode;
};

const DrawerProvider = ({
  children,
  closeAll,
  closeWithId,
  content,
  currentId,
  open,
  registerOptions,
  unregisterOptions,
}: DrawerProviderProps) => {
  const value: DrawerV2Context = useMemo(
    () => ({
      closeAll,
      closeWithId,
      content,
      currentId,
      open,
      registerOptions,
      unregisterOptions,
    }),
    [
      closeAll,
      closeWithId,
      content,
      currentId,
      open,
      registerOptions,
      unregisterOptions,
    ],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useDrawerV2Context = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useDrawerV2() must be used within <DrawerV2Provider />');
  }

  return context;
};

export default DrawerProvider;
