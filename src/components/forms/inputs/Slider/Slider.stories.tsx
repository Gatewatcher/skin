import type { Meta, StoryObj } from '@storybook/react';

import type { SliderProps } from '.';
import Slider from '.';
import { Form, Input } from '../..';
import {
  DEFAULT_MAX,
  DEFAULT_MIN,
  DEFAULT_WITH_CONSTANT_INTERVALS,
} from '../SliderBase/constants';

type Story = StoryObj<typeof Slider>;

export default {
  title: 'forms/inputs/Slider',
  component: Slider,
  args: {
    disabled: false,
    label: ({ value }) => `Label with value: ${value}`,
    min: DEFAULT_MIN,
    max: DEFAULT_MAX,
    value: 10,
    withConstantIntervals: DEFAULT_WITH_CONSTANT_INTERVALS,
  },
} as Meta<typeof Slider>;

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
    marks: [10, 30, 70, 90],
  },
};

export const WithLabels: Story = {
  args: {
    endLabel: ({ value, max }) => max - (value as number),
    leftLabel: 'left',
    marks: [10, 30, 70, 90],
    rightLabel: 'right',
    startLabel: ({ value }) => value,
  },
};

export const WithConstantIntervals: Story = {
  args: {
    gradient: { from: 'red', to: 'green' },
    startLabel: 'Better detection\n Worst performance',
    endLabel: 'Lower detection\n Better performance',
    label: ({ value }) => `Retention duration : ${value}`,
    marks: {
      1: '1 day',
      2: '2 days',
      4: '4 days',
      7: '7 days',
      10: '10 days',
      12: '12 days',
      14: '14 days',
    },
    max: 14,
    value: 7,
    withConstantIntervals: true,
  },
};

export const WithPopoverInMarks: Story = {
  args: {
    marks: {
      10: 10,
      30: {
        label: '30',
        popoverContent: 'popover 30',
      },
      60: {
        label: '60',
        popoverContent: 'popover 60',
      },
      70: {
        label: '70',
        popoverContent: 'popover 70',
      },
    },
  },
};

export const InsideForm: StoryObj<SliderProps & { defaultValue: number }> = {
  render: args => (
    <Form
      initialValues={{ slider: args.defaultValue }}
      onFinish={values => console.log(values)}
      onValuesChange={(_, values) => console.log('raw : ', values.slider)}
    >
      <Form.Field name="slider">
        <Input.Slider {...args} />
      </Form.Field>

      <Form.ButtonSubmit>Submit</Form.ButtonSubmit>
    </Form>
  ),
  args: {
    defaultValue: 10,
    step: 10,
    withConstantIntervals: true,
    marks: {
      1: { label: 1, popoverContent: '1' },
      10: { label: 10, popoverContent: '10' },
      30: { label: 30, popoverContent: '30' },
      60: { label: 60, popoverContent: '60' },
      80: { label: 80, popoverContent: '80' },
      100: { label: 100, popoverContent: '100' },
    },
  },
};

export const WithErrors: Story = {
  args: {
    meta: {
      errors: ['Some error'],
    },
  },
};
