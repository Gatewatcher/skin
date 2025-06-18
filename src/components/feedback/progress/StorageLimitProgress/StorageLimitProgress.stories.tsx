import type { Meta, StoryObj } from '@storybook/react';

import { Stack } from '@/skin/layout';
import { NeutralText, Text } from '@/skin/typography';

import StorageLimitProgress from '.';
import { DEFAULT_IS_INFINITE } from '../constants';
import { DEFAULT_IS_INLINE } from './constants';

type Story = StoryObj<typeof StorageLimitProgress>;

export default {
  title: 'feedback/progress/StorageLimitProgress',
  component: StorageLimitProgress,
  args: {
    isInfinite: DEFAULT_IS_INFINITE,
    isInline: DEFAULT_IS_INLINE,
    label: 'Uploading',
    labelError: 'Error',
  },
} as Meta<typeof StorageLimitProgress>;

export const Default: Story = {
  args: {
    completedPercentage: 70,
  },
};

export const WithLabelElement: Story = {
  render: ({ ...args }) => {
    return (
      <StorageLimitProgress
        labelElement={
          <Stack alignItems="baseline" gap={2}>
            <Text>70 GB</Text>
            <NeutralText size="small" variant={500}>
              used of 100GB
            </NeutralText>
          </Stack>
        }
        {...args}
        completedPercentage={70}
      />
    );
  },

  parameters: {
    controls: { exclude: ['percentage'] },
  },
};

export const WithInline: Story = {
  render: ({ ...args }) => {
    return (
      <StorageLimitProgress
        label="Uploading"
        {...args}
        completedPercentage={70}
        isInline={true}
      />
    );
  },

  parameters: {
    controls: { exclude: ['percentage'] },
  },
};
