import type { MutableRefObject } from 'react';
import { createContext, useContext } from 'react';

export type FloatingActionsContextType = {
  onlyOneAction: MutableRefObject<boolean>;
};

export const FloatingActionsContext = createContext<FloatingActionsContextType>(
  {
    onlyOneAction: { current: false },
  },
);

export const useFloatingActionsContext = () =>
  useContext(FloatingActionsContext);
