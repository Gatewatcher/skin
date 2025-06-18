import { createContext, useContext } from 'react';

export type SidenavContextType = {
  isOpened: boolean;
};

export const SidenavContext = createContext<SidenavContextType>({
  isOpened: false,
});

export const useSidenavContext = () => useContext(SidenavContext);
