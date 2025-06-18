import { faker } from '@faker-js/faker';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

import type { OverflownLinkProps } from '.';
import OverflownLink from '.';

type Story = StoryObj<typeof OverflownLink>;

faker.seed(10);

export default {
  title: 'actions/links/OverflownLink',
  component: OverflownLink,
  args: {
    children: 'internal link with long text inside it',
    to: '/links',
  },
  decorators: [withRouter],
} as Meta<typeof OverflownLink>;

const Template: StoryFn<typeof OverflownLink> = (args: OverflownLinkProps) => (
  <OverflownLink {...args} />
);

export const Default: Story = {
  render: Template,
};

export const Overflown: Story = {
  render: Template,
  decorators: [
    Story => (
      <div style={{ width: 150 }}>
        <Story />
      </div>
    ),
  ],
};

export const External: Story = {
  render: Template,
  args: {
    children: 'external link with long text inside it',
    to: 'https://www.google.com',
  },
  decorators: [
    Story => (
      <div style={{ width: 150 }}>
        <Story />
      </div>
    ),
  ],
};

export const WithoutWhitespace: Story = {
  render: Template,
  args: {
    children: faker.lorem.sentence(20).replace(/\s/g, ''),
  },
  decorators: [
    Story => (
      <div style={{ width: 150 }}>
        <Story />
      </div>
    ),
  ],
};
