import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';

import type { IconContainedProps } from '@/skin/displays';
import { Card, IconContained } from '@/skin/displays';
import { Stack } from '@/skin/layout';

import type { LinearProgressProps } from '../LinearProgress';
import LinearProgress from '../LinearProgress';
import { DEFAULT_COLOR } from './constants';

type PickedColor = Pick<IconContainedProps, 'color'>;
type OptionalColor = Partial<PickedColor>;

export type StorageLimitProgressProps = Omit<
  LinearProgressProps,
  'percentage'
> & {
  completedPercentage: number;
} & OptionalColor;

const StorageLimitProgress = ({
  'data-testid': testId = 'storage-limit-progress',
  completedPercentage,
  color = DEFAULT_COLOR,
  ...props
}: StorageLimitProgressProps) => {
  return (
    <Card data-testid={testId}>
      <Card.Body>
        <Stack
          alignItems="center"
          gap={4}
          justifyContent="center"
          padding={{ x: 4, y: 4 }}
        >
          <IconContained
            color={color}
            data-testid={suffixTestId(testId, 'icon')}
            name="Db2Database"
            size="xLarge"
          />
          <Stack.Item flexGrow={1}>
            <LinearProgress
              data-testid={suffixTestId(testId, 'linear-progress')}
              percentage={completedPercentage}
              {...props}
            />
          </Stack.Item>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default StorageLimitProgress;
