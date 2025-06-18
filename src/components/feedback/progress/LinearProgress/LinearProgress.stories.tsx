import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { Stack } from '@/skin/layout';

import LinearProgress from '.';
import { DEFAULT_IS_INFINITE } from '../constants';
import { DEFAULT_IS_INLINE } from './constants';

type Story = StoryObj<typeof LinearProgress>;

export default {
  title: 'feedback/progress/LinearProgress',
  component: LinearProgress,
  args: {
    isInfinite: DEFAULT_IS_INFINITE,
    isInline: DEFAULT_IS_INLINE,
    label: 'Uploading',
    labelError: 'Error',
    percentage: 0,
    endLabel: undefined,
  },
} as Meta<typeof LinearProgress>;

export const Default: Story = {
  args: {
    percentage: 30,
  },
};

export const WithProgress: Story = {
  render: ({ percentage: percentageProps, ...args }) => {
    const [percentage, setPercentage] = useState(percentageProps || 0);

    useEffect(() => {
      const chrono = setInterval(() => {
        setPercentage(p => {
          const newPercentage = p + Math.round(Math.random() * 5 + 1);
          if (newPercentage >= 100) {
            clearInterval(chrono);
            return 100;
          }

          return newPercentage;
        });
      }, 300);

      return () => clearInterval(chrono);
    }, []);

    return <LinearProgress percentage={percentage} {...args} />;
  },

  parameters: {
    controls: { exclude: ['percentage'] },
  },
};

export const WithLabelElement: Story = {
  render: ({ ...args }) => {
    return (
      <LinearProgress
        labelElement={
          <Stack gap={4}>
            <strong>strong tag</strong>
            <span>span tag</span>
          </Stack>
        }
        {...args}
        percentage={70}
      />
    );
  },

  parameters: {
    controls: { exclude: ['percentage'] },
  },
};
