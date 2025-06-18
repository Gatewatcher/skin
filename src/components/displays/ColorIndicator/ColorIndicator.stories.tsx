import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Stack } from '@/skin/layout';
import { addInlineRadio } from '@/storybook';

import type { ColorIndicatorProps } from '.';
import ColorIndicator from '.';
import { COLOR_INDICATOR_COLORS, DEFAULT_SIZE } from './constants';

type Story = StoryObj<typeof ColorIndicator>;

export default {
  title: 'displays/ColorIndicator',
  component: ColorIndicator,
  args: {
    color: 'blue',
    size: DEFAULT_SIZE,
  },
  argTypes: {
    ...addInlineRadio<ColorIndicatorProps>('color', COLOR_INDICATOR_COLORS),
  },
} as Meta<typeof ColorIndicator>;

const Template: StoryFn<typeof ColorIndicator> = (
  args: ColorIndicatorProps,
) => <ColorIndicator {...args} />;

export const Default: Story = {
  render: Template,
};

export const All: Story = {
  render: Template,
  parameters: {
    controls: { exclude: ['color'] },
  },
  decorators: [
    (Story, { args }) => (
      <Stack gap={4}>
        {COLOR_INDICATOR_COLORS.map(color => (
          <Story key={color} args={{ ...args, color }} />
        ))}
      </Stack>
    ),
  ],
};
