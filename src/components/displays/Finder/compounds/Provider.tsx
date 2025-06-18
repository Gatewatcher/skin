import {
  type ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

type FinderContext = {
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
};

const Context = createContext<FinderContext | null>(null);

export type ProviderProps = {
  children: ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
  const [isOpened, setIsOpened] = useState(false);

  const value = useMemo(
    () => ({
      isOpened,
      setIsOpened,
    }),
    [isOpened],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useFinder = () => {
  const value = useContext(Context);

  if (!value) {
    throw new Error('useFinder() must be used inside <Finder.Provider />.');
  }

  return value;
};

export default Provider;
