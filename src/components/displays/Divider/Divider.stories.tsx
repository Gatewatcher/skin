import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Stack } from '@/skin/layout';
import { addInlineRadio } from '@/storybook';

import type { DividerProps } from '.';
import Divider from '.';
import { DEFAULT_DIRECTION, DIVIDER_DIRECTIONS } from './constants';

type Story = StoryObj<typeof Divider>;

export default {
  title: 'displays/Divider',
  component: Divider,
  argTypes: {
    ...addInlineRadio<DividerProps>('direction', DIVIDER_DIRECTIONS),
  },
  args: {
    direction: DEFAULT_DIRECTION,
  },
  decorators: [
    Story => (
      <Stack
        alignItems="center"
        justifyContent="center"
        style={{ height: 400 }}
      >
        <Story />
      </Stack>
    ),
  ],
} as Meta<typeof Divider>;

const Template: StoryFn<typeof Divider> = (args: DividerProps) => (
  <Divider {...args} />
);

export const Default: Story = {
  render: Template,
};
