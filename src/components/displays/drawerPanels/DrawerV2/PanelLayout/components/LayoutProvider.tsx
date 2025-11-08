import { type ReactNode, createContext, useContext, useMemo } from 'react';

export type DrawerV2ProviderContext = {
  isMaximized: boolean;
  isMinimized: boolean;
  maximize: () => void;
  minimize: () => void;
  onClose: () => void;
};

const Context = createContext<DrawerV2ProviderContext | null>(null);

export type DrawerV2ProviderProps = DrawerV2ProviderContext & {
  children: ReactNode;
};

const LayoutProvider = ({
  children,
  isMaximized,
  isMinimized,
  maximize,
  minimize,
  onClose,
}: DrawerV2ProviderProps) => {
  const value = useMemo(
    () => ({
      isMaximized,
      isMinimized,
      maximize,
      minimize,
      onClose,
    }),
    [isMaximized, isMinimized, maximize, minimize, onClose],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useDrawerV2 = (): DrawerV2ProviderContext => {
  const value = useContext(Context);

  if (!value) {
    throw new Error('useDrawerV2() must be used inside <DrawerV2Provider />.');
  }

  return value;
};

export default LayoutProvider;
