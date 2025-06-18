import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import { Stack } from '@/skin/layout';
import { buildTestIds } from '@/utils/testIds';

import { SUFFIX_TEST_IDS, TEST_ID } from '../constants';
import { useConditionerContext } from '../context';
import { useConditioner } from '../hooks';
import { Group } from './Group';
import { IfElser } from './IfElser';
import { Label } from './Label';

import styles from './../styles.module.scss';

export type BaseProps = DataTestId & {};

const TEST_IDS = buildTestIds(TEST_ID, SUFFIX_TEST_IDS);

export const Base = ({ 'data-testid': testId }: BaseProps) => {
  const { logicalGroups, isMulti } = useConditionerContext();

  useConditioner();

  return (
    <Stack data-testid={testId} direction="column" gap={9}>
      {logicalGroups
        .filter(logicalGroup => !logicalGroup.subGroupOf)
        .map((logicalGroup, logicalGroupIndex) => (
          <Stack key={logicalGroup.id} direction="column" gap={4}>
            {isMulti && (
              <>
                <IfElser
                  logicalGroup={logicalGroup}
                  logicalGroupIndex={logicalGroupIndex}
                />
                <Label logicalGroup={logicalGroup} />
              </>
            )}
            {logicalGroup.type !== 'else' && (
              <div className={styles.Conditioner}>
                <Group
                  currentLogicalGroup={logicalGroup}
                  data-testid={TEST_IDS.mainGroup}
                  logicalGroupIndex={logicalGroupIndex}
                  isEven
                  isFirst
                />
              </div>
            )}
          </Stack>
        ))}
    </Stack>
  );
};
