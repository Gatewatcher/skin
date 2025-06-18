import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';
import { memo } from 'react';

import { Stack } from '@/skin/layout';

import Body from './compounds/Body';
import Date from './compounds/Date';
import Item from './compounds/Item';
import Title from './compounds/Title';

export type TimelineProps = DataTestId & {
  children: ReactNode;
};

const Timeline = ({
  children,
  'data-testid': testId = 'timeline',
}: TimelineProps) => {
  return (
    <Stack data-testid={testId} direction="column">
      {children}
    </Stack>
  );
};

Timeline.Body = memo(Body);
Timeline.Date = memo(Date);
Timeline.Item = memo(Item);
Timeline.Title = memo(Title);

export default Timeline;
