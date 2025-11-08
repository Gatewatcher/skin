import {
  type ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

type StickyContext = {
  scrollTop: number;
  setStickySize: (size: number) => void;
  stickySize: number;
};

const Context = createContext<StickyContext | null>(null);

export type StickyProviderProps = {
  children?: ReactNode;
  scrollTop: number;
};

const StickyProvider = ({ children, scrollTop }: StickyProviderProps) => {
  const [stickySize, setStickySize] = useState(0);

  const value: StickyContext = useMemo(
    () => ({
      scrollTop,
      stickySize,
      setStickySize,
    }),
    [scrollTop, setStickySize, stickySize],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useStickyContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useStickyContext() must be used within <Content />');
  }

  return context;
};

export default StickyProvider;
