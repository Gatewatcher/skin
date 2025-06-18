import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { Text } from '@/skin/typography';
import { addInlineRadio } from '@/storybook';

import type { CircularProgressProps } from '.';
import CircularProgress from '.';
import { DEFAULT_IS_INFINITE, DEFAULT_LABEL_ERROR } from '../constants';
import { DEFAULT_SIZE, PROGRESS_SIZES } from './constants';

type Story = StoryObj<typeof CircularProgress>;

export default {
  title: 'feedback/progress/CircularProgress',
  component: CircularProgress,
  args: {
    isInfinite: DEFAULT_IS_INFINITE,
    label: 'Uploading',
    labelError: DEFAULT_LABEL_ERROR,
    percentage: 0,
    size: DEFAULT_SIZE,
  },
  argTypes: {
    ...addInlineRadio<CircularProgressProps>('size', PROGRESS_SIZES),
  },
} as Meta<typeof CircularProgress>;

export const Default: Story = {
  args: {
    percentage: 50,
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

    return <CircularProgress percentage={percentage} {...args} />;
  },

  parameters: {
    controls: { exclude: ['percentage'] },
  },
};

export const WithChildren: Story = {
  args: {
    children: ({ percentage }) => <Text weight="medium">{percentage}%</Text>,
    percentage: 50,
  },
};
