import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Stack } from '@/skin/layout';
import { addInlineRadio } from '@/storybook';

import MetricsText, { type MetricsTextProps } from '.';
import { DEFAULT_SIZE, METRICS_TEXT_SIZES } from './constants';

type Story = StoryObj<typeof MetricsText>;

export default {
  title: 'typography/MetricsText',
  component: MetricsText,
  argTypes: {
    ...addInlineRadio<MetricsTextProps>('size', METRICS_TEXT_SIZES),
  },
  args: {
    children: 'Lorem ipsum',
    size: DEFAULT_SIZE,
  },
} as Meta<typeof MetricsText>;

const Template: StoryFn<typeof MetricsText> = ({
  children,
  ...args
}: MetricsTextProps) => <MetricsText {...args}>{children}</MetricsText>;

export const Default: Story = {
  render: Template,
};

export const AllSizes: Story = {
  render: Template,
  parameters: { controls: { exclude: ['size'] } },
  decorators: [
    (Story, { args }) => (
      <Stack direction="column">
        {METRICS_TEXT_SIZES.map(size => (
          <Story key={size} args={{ ...args, size }} />
        ))}
      </Stack>
    ),
  ],
};
