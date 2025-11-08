import { withoutKey } from '@gatewatcher/bistoury/utils-lang';
import { consoleWarn } from '@gatewatcher/bistoury/utils-log';
import { useCallback, useMemo, useRef } from 'react';

import { DEFAULT_DRAWER_OPTIONS } from '../../constants';
import type { UseDrawerV2Options } from './useDrawerV2';

export type UseDrawerOptionsStore = {
  get: (id: string) => UseDrawerV2Options;
  register: (id: string, options: UseDrawerV2Options | null) => () => void;
  unregister: (id: string) => void;
};

export const useDrawerOptions = (): UseDrawerOptionsStore => {
  const optionsRef = useRef<Record<string, UseDrawerV2Options | null>>({});

  const get: (id: string) => UseDrawerV2Options = useCallback((id: string) => {
    const options = optionsRef.current[id];

    if (!options) {
      return DEFAULT_DRAWER_OPTIONS;
    }

    if (options.closeOn) {
      return {
        ...withoutKey(DEFAULT_DRAWER_OPTIONS, ['keepOn']),
        ...options,
      };
    }

    if (options.keepOn) {
      return {
        ...withoutKey(DEFAULT_DRAWER_OPTIONS, ['closeOn']),
        ...options,
      };
    }

    const optionsWithoutRouting: Omit<
      UseDrawerV2Options,
      'keepOn' | 'closeOn'
    > = options;

    return {
      ...DEFAULT_DRAWER_OPTIONS,
      ...optionsWithoutRouting,
    };
  }, []);

  const unregister = useCallback((id: string) => {
    delete optionsRef.current[id];
  }, []);

  const register = useCallback(
    (id: string, options: UseDrawerV2Options | null) => {
      const currentOptions = optionsRef.current[id];

      if (
        currentOptions !== undefined &&
        !optionsAreEqual(currentOptions, options)
      ) {
        consoleWarn(
          `Drawer \`${id}\` received different options over multiple calls`,
        );
      }

      optionsRef.current[id] = options;
      return () => unregister(id);
    },
    [unregister],
  );

  return useMemo(
    () => ({
      get,
      register,
      unregister,
    }),
    [get, register, unregister],
  );
};

const optionsAreEqual = (
  options1: UseDrawerV2Options | null,
  options2: UseDrawerV2Options | null,
) => {
  return (
    options1?.closeOn?.source === options2?.closeOn?.source &&
    options1?.keepOn?.source === options2?.keepOn?.source
  );
};
