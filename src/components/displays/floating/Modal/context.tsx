import { createContext, useContext } from 'react';

export type ModalContextType = {
  withCloseOnOutsidePress: boolean;
  setWithCloseOnOutsidePress: (withCloseOnOutsidePress: boolean) => void;
};

export const ModalContext = createContext<ModalContextType>({
  withCloseOnOutsidePress: true,
  setWithCloseOnOutsidePress: () => {},
});

export const useModalContext = () => useContext(ModalContext);
