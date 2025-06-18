import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

import type { BackLinkProps } from '.';
import BackLink from '.';

type Story = StoryObj<typeof BackLink>;

export default {
  title: 'actions/links/BackLink',
  component: BackLink,
  args: {
    children: 'Back',
  },
  decorators: [withRouter],
} as Meta<typeof BackLink>;

const Template: StoryFn<typeof BackLink> = (args: BackLinkProps) => (
  <BackLink {...args} />
);

export const Default: Story = {
  render: Template,
  args: {
    variant: 'primary',
  },
};
