import type { Meta, StoryObj } from '@storybook/react';

import InfoTooltip from '.';

type Story = StoryObj<typeof InfoTooltip>;

export default {
  title: 'displays/InfoTooltip',
  component: InfoTooltip,
} as Meta<typeof InfoTooltip>;

export const Default: Story = {
  args: {
    info: 'Some really important information',
  },
};
