import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { withControlledValue } from '@/hocs';

import type { RadioProps } from '.';
import Radio from '.';

type Story = StoryObj<typeof Radio>;

export default {
  title: 'forms/inputs/Radio',
  component: Radio,
  args: {
    disabled: false,
  },
  parameters: {
    controls: { exclude: /^label/ },
  },
} as Meta<typeof Radio>;

const ControlledRadio = withControlledValue(Radio, { valuePropName: 'value' });

const Template: StoryFn<typeof Radio> = (args: RadioProps) => (
  <>
    <ControlledRadio label="yes" name="test" value="yes" {...args} />
    <ControlledRadio label="no" name="test" value="no" {...args} />
  </>
);

export const Default: Story = {
  render: Template,
};

export const Disabled: Story = {
  render: Template,

  args: {
    disabled: true,
  },
};
