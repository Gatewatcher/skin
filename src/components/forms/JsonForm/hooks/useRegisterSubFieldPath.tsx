import { useEffect } from 'react';

import { useOneOfContext } from '../contexts/oneOfContext';
import { useFullPath } from '../hooks';

export const useRegisterSubFieldPath = (path: string) => {
  const fullPath = useFullPath(path);
  const { registerSubFieldPath } = useOneOfContext();

  useEffect(() => {
    registerSubFieldPath(fullPath);
  }, [fullPath, registerSubFieldPath]);
};
