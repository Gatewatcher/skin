import { faker } from '@faker-js/faker/locale/en';
import type { Meta, StoryObj } from '@storybook/react';

import { Stack } from '@/skin/layout';
import { addNumber, addSelect } from '@/storybook';

import ScoreIndicator from '.';
import { DEFAULT_SIZE, SCORE_INDICATOR_SIZE } from './constants';

faker.seed(10);

type Story = StoryObj<typeof ScoreIndicator>;

export default {
  title: 'displays/ScoreIndicator',
  component: ScoreIndicator,
  args: {
    value: 42,
    size: 'medium',
  },
  argTypes: {
    ...addNumber('value', { min: 0, max: 100 }),
    ...addSelect('size', SCORE_INDICATOR_SIZE, { defaultValue: DEFAULT_SIZE }),
  },
} as Meta<typeof ScoreIndicator>;

export const Default: Story = {
  args: { sectors: ['low', 'medium', 'high', 'critical'] },
};

export const WithCustomSectorSlot: Story = {
  args: {
    sectors: [
      {
        type: 'low',
        start: 0,
        end: 30,
      },
      {
        type: 'medium',
        start: 31,
        end: 60,
      },
      {
        type: 'high',
        start: 61,
        end: 90,
      },
      {
        type: 'critical',
        start: 91,
        end: 100,
      },
    ],
  },
};

export const AllSectorSize: Story = {
  render: args => (
    <Stack gap={4} justifyContent="space-around" wrap="wrap">
      <ScoreIndicator sectors={['low', 'critical']} value={args.value} />
      <ScoreIndicator
        sectors={['low', 'medium', 'critical']}
        value={args.value}
      />
      <ScoreIndicator
        sectors={['low', 'medium', 'high', 'critical']}
        value={args.value}
      />
      <ScoreIndicator
        sectors={['low', 'low', 'medium', 'medium', 'critical', 'critical']}
        value={args.value}
      />
      <ScoreIndicator
        sectors={[
          'low',
          'low',
          'medium',
          'medium',
          'high',
          'high',
          'critical',
          'critical',
        ]}
        value={args.value}
      />
      <ScoreIndicator
        sectors={[
          'low',
          'low',
          'low',
          'medium',
          'medium',
          'medium',
          'critical',
          'critical',
          'critical',
        ]}
        value={args.value}
      />
    </Stack>
  ),
};
