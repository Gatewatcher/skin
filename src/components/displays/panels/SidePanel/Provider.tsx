import { isFunction } from '@gatewatcher/bistoury/utils-lang';
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

export type SidePanelContext = {
  close: () => void;
  content: ReactNode;
  isOpened: boolean;
  open: (content: ReactNode) => void;
};

const Context = createContext<SidePanelContext | null>(null);

type SidePanelProviderProps = {
  children?: ReactNode | ((props: SidePanelContext) => ReactNode);
};

const Provider = ({ children }: SidePanelProviderProps) => {
  const [content, setContent] = useState<ReactNode>(null);

  const close = useCallback(() => setContent(null), []);

  const value: SidePanelContext = useMemo(
    () => ({
      close,
      content,
      isOpened: content !== null,
      open: setContent,
    }),
    [close, content],
  );

  return (
    <Context.Provider value={value}>
      {isFunction(children) ? children(value) : children}
    </Context.Provider>
  );
};

export type UseSidePanelInit =
  | ReactNode
  | ((context: SidePanelContext) => ReactNode);

export const useSidePanel = (init: UseSidePanelInit = null) => {
  const context = useContext(Context);
  const [needsInitialization, setNeedsInitialization] = useState(!!init);

  if (!context) {
    throw new Error(
      'useSidePanel() must be used within a <SidePanelProvider />',
    );
  }

  const initRef = useRef(init);
  const contextRef = useRef(context);

  useEffect(() => {
    initRef.current = init;
    contextRef.current = context;
  }, [context, init]);

  useEffect(() => {
    if (needsInitialization) {
      const init = initRef.current;
      const context = contextRef.current;
      const content = isFunction(init) ? init(context) : init;
      context.open(content);
      setNeedsInitialization(false);
    }
  }, [needsInitialization]);

  return context;
};

export default Provider;
