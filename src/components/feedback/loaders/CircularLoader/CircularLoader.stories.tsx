import type { Meta, StoryObj } from '@storybook/react';

import { ICON_DEFAULT_SIZE, ICON_SIZES } from '@/constants';
import { Stack } from '@/skin/layout';
import { addInlineRadio } from '@/storybook';

import { DEFAULT_WITH_LONG_RUNNING_ANIMATION } from './constants';
import CircularLoader from './index';

type Story = StoryObj<typeof CircularLoader>;

export default {
  title: 'feedback/loaders/CircularLoader',
  component: CircularLoader,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    withLongRunningAnimation: DEFAULT_WITH_LONG_RUNNING_ANIMATION,
  },
  argTypes: {
    ...addInlineRadio('size', ICON_SIZES),
  },
} as Meta<typeof CircularLoader>;

export const Default: Story = {
  args: {
    size: ICON_DEFAULT_SIZE,
  },
};

export const All: Story = {
  render: () => (
    <Stack gap={4} justifyContent="center">
      <CircularLoader size="small" />
      <CircularLoader size="medium" />
      <CircularLoader size="large" />
    </Stack>
  ),

  parameters: { controls: { exclude: ['size'] } },
};
