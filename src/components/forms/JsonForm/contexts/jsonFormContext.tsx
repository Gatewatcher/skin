import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useMemo, useRef } from 'react';

import type { FormInstance } from '@/skin/forms';

import type { OptionChangeHandler, Options } from '../types';

type JsonFormContext = {
  onOptionChange: OptionChangeHandler;
  initialOptions: Options;
  form?: FormInstance;
};

const JsonFormContext = createContext<JsonFormContext>({
  initialOptions: {},
  onOptionChange: () => {},
});

type JsonFormContextProviderProps = JsonFormContext & {
  children: ReactNode;
};

export const JsonFormContextProvider = ({
  children,
  onOptionChange,
  initialOptions,
  form,
}: JsonFormContextProviderProps) => {
  const value = useMemo(
    () => ({
      onOptionChange,
      initialOptions,
      form,
    }),
    [onOptionChange, initialOptions, form],
  );

  return (
    <JsonFormContext.Provider value={value}>
      {children}
    </JsonFormContext.Provider>
  );
};

export const useInitialOptionValue = (path: string) =>
  useContext(JsonFormContext).initialOptions[path];

export const useRegisterOption = (path: string, value: string | undefined) => {
  const { onOptionChange } = useContext(JsonFormContext);

  // Exclude the handler from dependencies by storing it in an always up-to-date ref.
  const onOptionChangeRef = useRef(onOptionChange);
  useEffect(() => {
    onOptionChangeRef.current = onOptionChange;
  }, [onOptionChange]);

  // Cleanup on path change or unmount.
  useEffect(() => {
    return () => onOptionChangeRef.current(path, undefined);
  }, [path]);

  // Update on path or value change.
  useEffect(() => {
    onOptionChangeRef.current(path, value);
  }, [path, value]);
};

export const useJsonFormFormInstance = () => useContext(JsonFormContext).form;
