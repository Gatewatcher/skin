import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import type { PillProps } from '.';
import Pill from '.';

type Story = StoryObj<typeof Pill>;

export default {
  title: 'displays/Pill',
  component: Pill,
  args: {
    children: 'Item',
    icon: 'Overview',
  },
} as Meta<typeof Pill>;

const Template: StoryFn<typeof Pill> = (args: PillProps) => <Pill {...args} />;

export const Default: Story = {
  render: Template,
};

export const WithoutIcon: Story = {
  render: Template,
  args: {
    icon: undefined,
  },
};

export const Active: Story = {
  render: Template,
  args: {
    active: true,
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    disabled: true,
  },
};
