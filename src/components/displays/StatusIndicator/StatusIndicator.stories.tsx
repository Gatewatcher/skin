import type { Meta, StoryObj } from '@storybook/react';

import { Stack } from '@/skin/layout';
import { addInlineRadio } from '@/storybook';

import type { StatusIndicatorProps } from '.';
import StatusIndicator from '.';
import {
  DEFAULT_STATUS_INDICATOR_SIZE,
  STATUS_INDICATOR_SIZES,
  STATUS_INDICATOR_TYPES,
} from './constants';

const meta: Meta<typeof StatusIndicator> = {
  title: 'displays/StatusIndicator',
  component: StatusIndicator,
  render: args => <StatusIndicator {...args} />,
  args: {
    size: DEFAULT_STATUS_INDICATOR_SIZE,
    type: 'info',
    withPulse: false,
  },
  argTypes: {
    ...addInlineRadio<StatusIndicatorProps>('type', STATUS_INDICATOR_TYPES),
    ...addInlineRadio<StatusIndicatorProps>('size', STATUS_INDICATOR_SIZES),
  },
};

export default meta;

type Story = StoryObj<typeof StatusIndicator>;

export const Default: Story = {};

export const All: Story = {
  render: args => (
    <Stack gap={10} wrap="wrap">
      {STATUS_INDICATOR_TYPES.map(type => (
        <StatusIndicator key={type} {...args} type={type} />
      ))}
    </Stack>
  ),
  parameters: {
    controls: {
      exclude: ['type'],
    },
  },
};
