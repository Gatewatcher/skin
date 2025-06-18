import { useMemo } from 'react';

import { useFieldContext } from '@/skin/forms/Form/compounds/Field/FieldContext';

export const useFullPath = (path: string) => {
  const { prefixName } = useFieldContext();

  return useMemo(
    () => (prefixName ? [...prefixName, path] : path),
    [path, prefixName],
  );
};
