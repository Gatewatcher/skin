import type { Meta, StoryObj } from '@storybook/react';

import { NavigationItem } from '@/skin/navigation';

import WithStatus from '.';

const meta: Meta<typeof WithStatus> = {
  title: 'feedback/WithStatus',
  component: WithStatus,
};

export default meta;

type Story = StoryObj<typeof WithStatus>;

export const Default: Story = {
  render: ({ children, ...args }) => (
    <NavigationItem.Trigger icon="Tower">
      <WithStatus {...args}>{children}</WithStatus>
    </NavigationItem.Trigger>
  ),
  args: {
    as: 'span',
    children: 'Health',
    offset: { x: 0, y: 0 },
    type: 'critical',
    withPulse: true,
  },
};
