import type { Meta, StoryObj } from '@storybook/react';

import { addNumber } from '@/storybook';

import LinearLoader from './index';

type Story = StoryObj<typeof LinearLoader>;

export default {
  title: 'feedback/loaders/LinearLoader',
  component: LinearLoader,
  argTypes: {
    ...addNumber('progress', { min: 0, max: 100 }),
  },
} as Meta;

export const Default: Story = {
  args: {
    progress: 50,
    rounded: false,
  },
};
