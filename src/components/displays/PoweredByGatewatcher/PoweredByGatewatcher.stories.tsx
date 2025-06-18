import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Stack } from '@/skin/layout';

import type { PoweredByGatewatcherProps } from '.';
import PoweredByGatewatcher from '.';

type Story = StoryObj<typeof PoweredByGatewatcher>;

export default {
  title: 'displays/PoweredByGatewatcher',
  component: PoweredByGatewatcher,
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
} as Meta<typeof PoweredByGatewatcher>;

const Template: StoryFn<typeof PoweredByGatewatcher> = (
  args: PoweredByGatewatcherProps,
) => <PoweredByGatewatcher {...args} />;

export const Default: Story = {
  render: Template,
};
