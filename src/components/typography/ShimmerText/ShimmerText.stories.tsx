import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import type { ShimmerTextProps } from '.';
import ShimmerText from '.';

type Story = StoryObj<typeof ShimmerText>;

export default {
  title: 'typography/ShimmerText',
  component: ShimmerText,
} as Meta<typeof ShimmerText>;

const Template: StoryFn<typeof ShimmerText> = (args: ShimmerTextProps) => (
  <ShimmerText {...args} />
);

export const Default: Story = {
  render: Template,
};
