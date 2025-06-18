import {
  type Dispatch,
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import type { SingleValue } from 'react-select';

import { type NamePath } from '@/skin/forms/Form/interface';
import { areNamePathsEqual } from '@/skin/forms/Form/utils/areNamePathsEqual';

import { useJsonFormFormInstance } from './jsonFormContext';

type Option = SingleValue<{ label: string; value: string }>;

type OneOfContext = {
  isOneOfField: boolean;
  registerSubFieldPath: (path: NamePath) => void;
};

const OneOfContext = createContext<OneOfContext>({
  isOneOfField: false,
  registerSubFieldPath: () => {},
});

const ONE_OF_CONTEXT_VALUE = {
  isOneOfField: true,
};

type RenderChildren = (params: {
  onChangeWithCleanup: (option: Option) => void;
}) => ReactNode;

type OneOfContextProviderProps = {
  children: RenderChildren;
  onChange: Dispatch<React.SetStateAction<string | undefined>>;
};

export const OneOfContextProvider = ({
  children,
  onChange,
}: OneOfContextProviderProps) => {
  const form = useJsonFormFormInstance();
  const [subPaths, setSubPaths] = useState<NamePath[]>([]);

  const registerSubFieldPath = useCallback((path: NamePath) => {
    setSubPaths(previous => {
      if (previous.find(subPath => areNamePathsEqual(subPath, path))) {
        return [...previous];
      }
      return [...previous, path];
    });
  }, []);

  const value = useMemo(
    () => ({
      registerSubFieldPath,
      ...ONE_OF_CONTEXT_VALUE,
    }),
    [registerSubFieldPath],
  );

  const handleChangeWithCleanup = (option: Option) => {
    subPaths.forEach(path => form?.setFieldValue(path, undefined));
    onChange(option?.value);
  };

  return (
    <OneOfContext.Provider value={value}>
      {children({ onChangeWithCleanup: handleChangeWithCleanup })}
    </OneOfContext.Provider>
  );
};

export const useOneOfContext = () => useContext(OneOfContext);
