import { createContext, useContext } from 'react';

import { type FormInstance } from '../interface';

export type InternalFormContextType = {
  form?: FormInstance;
};

export const InternalFormContext = createContext<InternalFormContextType>({});

export const useInternalFormContext = () => useContext(InternalFormContext);
