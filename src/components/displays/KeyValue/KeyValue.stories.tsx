import type { Meta, StoryObj } from '@storybook/react';

import KeyValue from '.';
import { DEFAULT_KEY_VALUE_VARIANT, DEFAULT_VALUE_FALLBACK } from './constants';

type Story = StoryObj<typeof KeyValue>;

export default {
  title: 'displays/KeyValue',
  component: KeyValue,
  args: {
    label: 'Label',
    valueFallback: DEFAULT_VALUE_FALLBACK,
    variant: DEFAULT_KEY_VALUE_VARIANT,
  },
} as Meta<typeof KeyValue>;

export const Default: Story = {
  args: {
    value: 'Value',
  },
};

export const Fallback: Story = {};

export const CustomFallback: Story = {
  args: {
    valueFallback: 'custom fallback',
  },
};
