import { areEqual } from '@gatewatcher/bistoury/utils-lang';

import type { NamePath } from '@/skin/forms/Form/interface';

export const areNamePathsEqual = (pathA: NamePath, pathB: NamePath) => {
  return Array.isArray(pathA) && Array.isArray(pathB)
    ? areEqual(pathA, pathB)
    : pathA === pathB;
};
