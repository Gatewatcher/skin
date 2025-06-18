import { createContext, useContext } from 'react';

export type FloatingContextType = {
  close: () => void;
  opened: boolean;
};

export const FloatingContext = createContext<FloatingContextType>({
  opened: false,
  close: () => {},
});

export const useFloatingContext = () => useContext(FloatingContext);
