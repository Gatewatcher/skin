import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import type { ProfileCardProps } from '.';
import ProfileCard from '.';

type Story = StoryObj<typeof ProfileCard>;

export default {
  title: 'displays/ProfileCard',
  component: ProfileCard,
} as Meta<typeof ProfileCard>;

const Template: StoryFn<typeof ProfileCard> = (args: ProfileCardProps) => (
  <ProfileCard {...args} />
);

export const Default: Story = {
  render: Template,
  args: {
    username: 'alex_smith',
    email: 'alex_smith@gatewatcher.com',
    fullname: 'Alex Smith',
  },
};
