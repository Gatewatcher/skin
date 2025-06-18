import type { Dispatch, SetStateAction } from 'react';
import { createContext, useContext } from 'react';

import { DEFAULT_MAX, DEFAULT_TOAST_METHOD_REF } from './constants';
import type { Toast } from './types';

export type ToastrContextType = {
  setToastRef: { current: Dispatch<SetStateAction<Toast[]>> };
  max: number;
};

export const ToastrContext = createContext<ToastrContextType>({
  setToastRef: { current: DEFAULT_TOAST_METHOD_REF },
  max: DEFAULT_MAX,
});

export const useToastrContext = () => useContext(ToastrContext);
