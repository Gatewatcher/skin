import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

import { LinkInternal } from '@/skin/actions';
import { Text } from '@/skin/typography';

import Breadcrumb from '.';

type Story = StoryObj<typeof Breadcrumb>;

export default {
  title: 'feedback/Breadcrumb',
  component: Breadcrumb,
  decorators: [withRouter],
} as Meta<typeof Breadcrumb>;

export const Default: Story = {
  args: {
    children: [
      <LinkInternal key="1" to="link1">
        Link 1
      </LinkInternal>,
      <Text key="2">Here</Text>,
    ],
  },
};

export const FourItems: Story = {
  args: {
    children: [
      <LinkInternal key="1" to="link1">
        Link 1
      </LinkInternal>,
      <LinkInternal key="2" to="link2">
        Link 2
      </LinkInternal>,
      <LinkInternal key="3" to="link3">
        Link 3
      </LinkInternal>,
      <Text key="last">Here</Text>,
    ],
  },
};
