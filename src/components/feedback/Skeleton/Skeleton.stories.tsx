import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Grid, Stack } from '@/skin/layout';
import { addInlineRadio } from '@/storybook';

import type { SkeletonProps } from '.';
import Skeleton from '.';
import {
  DEFAULT_ANIMATION,
  DEFAULT_SHAPE,
  DEFAULT_VARIANT,
  SKELETON_ANIMATION,
  SKELETON_SHAPE,
  SKELETON_VARIANT,
} from './constants';

type Story = StoryObj<typeof Skeleton>;

export default {
  title: 'feedback/Skeleton',
  component: Skeleton,
  args: {
    variant: DEFAULT_VARIANT,
    animation: DEFAULT_ANIMATION,
    shape: DEFAULT_SHAPE,
  },
  argTypes: {
    ...addInlineRadio<SkeletonProps>('variant', SKELETON_VARIANT),
    ...addInlineRadio<SkeletonProps>('animation', SKELETON_ANIMATION),
    ...addInlineRadio<SkeletonProps>('shape', SKELETON_SHAPE),
  },
} as Meta<typeof Skeleton>;

const Template: StoryFn<typeof Skeleton> = (props: SkeletonProps) => (
  <Skeleton {...props} />
);

export const Default: Story = {
  render: Template,
  decorators: [
    Story => (
      <Stack style={{ width: 500, height: 200 }}>
        <Story />
      </Stack>
    ),
  ],
};

export const Text: Story = {
  render: Template,
  decorators: [
    Story => (
      <Grid gap={8} rows={4} isContainer>
        <Stack style={{ width: 700, height: 40 }}>
          <Story />
        </Stack>
        <Stack style={{ width: 700, height: 40 }}>
          <Story />
        </Stack>
        <Stack style={{ width: 700, height: 40 }}>
          <Story />
        </Stack>
        <Stack style={{ width: 700, height: 40 }}>
          <Story />
        </Stack>
      </Grid>
    ),
  ],
  args: {
    variant: 'rounded',
  },
};

export const Badge: Story = {
  render: Template,
  decorators: [
    Story => (
      <Stack style={{ width: 120, height: 120 }}>
        <Story />
      </Stack>
    ),
  ],
  args: {
    variant: 'rounded',
    shape: 'square',
  },
};

export const NoAnimation: Story = {
  render: Template,
  decorators: [
    Story => (
      <Stack style={{ width: 500, height: 200 }}>
        <Story />
      </Stack>
    ),
  ],
  args: {
    animation: 'none',
  },
};
