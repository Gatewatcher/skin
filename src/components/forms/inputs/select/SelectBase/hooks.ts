import { useMemo } from 'react';

import type { OptionGroup, OptionsOrGroups } from './types';

export const useFlattenedOptions = <OptionValue, OptionMeta>(
  options?: OptionsOrGroups<OptionValue, OptionMeta>,
) => {
  return useMemo(() => {
    return (options || []).flatMap(
      item => (item as OptionGroup<OptionValue, OptionMeta>)?.options || item,
    );
  }, [options]);
};
