import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { addInlineRadio } from '@/storybook';

import type { PinCodeProps } from '.';
import PinCode from '.';
import {
  DEFAULT_PIN_CODE_LENGTH,
  DEFAULT_PIN_CODE_TYPE,
  PIN_CODE_TYPES,
} from './constants';

type Story = StoryObj<typeof PinCode>;

export default {
  title: 'forms/inputs/PinCode',
  component: PinCode,
  argTypes: {
    ...addInlineRadio<PinCodeProps>('type', PIN_CODE_TYPES),
  },
  args: {
    length: DEFAULT_PIN_CODE_LENGTH,
    type: DEFAULT_PIN_CODE_TYPE,
  },
} as Meta<typeof PinCode>;

const Template: StoryFn<typeof PinCode> = (args: PinCodeProps) => (
  <PinCode {...args} />
);

export const Default: Story = {
  render: Template,
};

export const WithOnComplete: Story = {
  render: Template,
  args: {
    onComplete: console.log,
  },
};

export const WithErrors: Story = {
  args: { meta: { errors: ['Error'] } },
  render: args => <PinCode {...args} />,
};
