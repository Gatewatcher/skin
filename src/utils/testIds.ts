import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';

export const buildTestIds = <T extends string>(
  base: TestId,
  keys: readonly T[],
) => {
  return keys.reduce(
    (testIds, key) => ({
      ...testIds,
      [key]: suffixTestId(base, key),
    }),
    {} as Record<T, string>,
  );
};
