import type { ReactNode } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

import type { AutoSaveProps } from '..';

type Context = {
  status: AutoSaveProps['status'];
  setStatus: (status: Context['status']) => void;
};

const AutoSaveContext = createContext<Context | null>(null);

export const AutoSaveProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<AutoSaveProps['status']>('idle');

  const value = useMemo(() => {
    return { status, setStatus };
  }, [status]);

  return (
    <AutoSaveContext.Provider value={value}>
      {children}
    </AutoSaveContext.Provider>
  );
};

export const useAutoSave = () => {
  const value = useContext(AutoSaveContext);

  if (!value) {
    throw new Error(
      'useAutoSave must be used as a children of AutoSaveProvider',
    );
  }

  return value;
};
