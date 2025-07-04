import { isDefined, isFunction } from '@gatewatcher/bistoury/utils-lang';
import type { SearchParamsObject } from '@gatewatcher/bistoury/utils-url';
import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';

import DrawerProvider from './components/DrawerProvider';
import { useDrawerOptions } from './hooks/useDrawerOptions';
import { useDrawerSearchParams } from './hooks/useDrawerSearchParams';
import type { UseDrawerV2Options } from './hooks/useDrawerV2';
import type { DrawerMatches } from './types';
import { getContent } from './utils';

export type DrawerV2ProviderApi = {
  close: () => void;
  content: ReactNode;
  currentId: string | null;
  isOpened: boolean;
  options: UseDrawerV2Options | null;
};

export type DrawerV2ProviderProps = {
  children: ReactNode | ((props: DrawerV2ProviderApi) => ReactNode);
  matches: DrawerMatches;
};

const Provider = ({ children, matches }: DrawerV2ProviderProps) => {
  const { pathname } = useLocation();
  const drawerSearchParams = useDrawerSearchParams();
  const [currentId, setCurrentId] = useState<string | null>(() => {
    const id = drawerSearchParams.getId();
    return id && matches[id] ? id : null;
  });
  const [props, setProps] = useState<unknown>(() => {
    return currentId ? drawerSearchParams.getProps() : {};
  });
  const [content, setContent] = useState<ReactNode>(
    () => currentId && getContent(matches, currentId, props)?.content,
  );
  const currentPathnameRef = useRef(currentId ? pathname : '');

  const optionsStore = useDrawerOptions();
  const { keepOn, closeOn, encode, clean } = optionsStore.get(currentId ?? '');

  const canBeKeptOpen =
    (!keepOn || keepOn.test(pathname)) && !closeOn?.test(pathname);

  const persistenceRef = useRef({ encode, clean });
  useEffect(() => {
    persistenceRef.current = { encode, clean };
  }, [clean, encode]);

  const open = useCallback(
    (id: string, props: unknown, options: UseDrawerV2Options | null) => {
      const getContentResult = getContent(matches, id, props);
      if (!getContentResult) {
        return;
      }

      setCurrentId(id);
      setProps(props);
      setContent(getContentResult.content);
      if (options) {
        optionsStore.register(id, options);
      }
      if (id !== currentId) {
        persistenceRef.current.clean?.();
      }
      persistenceRef.current.encode?.(id, props as SearchParamsObject);
      currentPathnameRef.current = pathname;
    },
    [currentId, matches, optionsStore, pathname],
  );

  const closeCurrent = useCallback(() => {
    setCurrentId(null);
    setProps(null);
    setContent(null);
    if (drawerSearchParams.getId()) {
      persistenceRef.current.clean?.();
    }
    currentPathnameRef.current = '';
  }, [drawerSearchParams]);

  const closeWithId = useCallback(
    (id: string) => {
      if (id === currentId) {
        if (!isDefined(id) || id === currentId) {
          closeCurrent();
        }
      }
    },
    [closeCurrent, currentId],
  );

  useEffect(() => {
    if (
      currentId &&
      currentPathnameRef.current !== pathname &&
      !canBeKeptOpen
    ) {
      closeCurrent();
    } else {
      currentPathnameRef.current = pathname;
    }
  }, [
    canBeKeptOpen,
    closeCurrent,
    currentId,
    drawerSearchParams,
    optionsStore,
    pathname,
  ]);

  useEffect(() => {
    if (currentId && !drawerSearchParams.getId()) {
      persistenceRef.current.encode?.(currentId, props as SearchParamsObject);
    }
  }, [currentId, props, pathname, drawerSearchParams, optionsStore]);

  return (
    <DrawerProvider
      closeAll={closeCurrent}
      closeWithId={closeWithId}
      content={content}
      currentId={currentId}
      open={open}
      registerOptions={optionsStore.register}
      unregisterOptions={optionsStore.unregister}
    >
      {isFunction(children)
        ? children({
            close: closeCurrent,
            content,
            currentId,
            isOpened: !!currentId,
            options: currentId ? optionsStore.get(currentId) : {},
          })
        : children}
    </DrawerProvider>
  );
};

export default Provider;
