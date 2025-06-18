import type { Meta, StoryObj } from '@storybook/react';

import Range from '.';
import { DEFAULT_MAX, DEFAULT_MIN } from '../SliderBase/constants';

type Story = StoryObj<typeof Range>;

export default {
  title: 'forms/inputs/Range',
  component: Range,
  args: {
    value: [12, 70],
    disabled: false,
    label: ({ value }: { value: number[] }) =>
      `difference: ${value[1] - value[0]}`,
    min: DEFAULT_MIN,
    max: DEFAULT_MAX,
  },
} as Meta<typeof Range>;

export const Default: Story = {
  args: {
    step: 4,
  },
};

export const WithGradient: Story = {
  args: {
    gradient: true,
  },
};

export const WithMarks: Story = {
  args: {
    marks: [12, 30, 70, 90],
  },
};

export const WithLabels: Story = {
  args: {
    endLabel: 'end',
    leftLabel: 'left',
    marks: [12, 30, 70, 90],
    rightLabel: 'right',
    startLabel: 'start',
  },
};
