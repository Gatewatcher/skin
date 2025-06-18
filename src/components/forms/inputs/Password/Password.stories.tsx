import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { withControlledValue } from '@/hocs';
import { addInlineRadio } from '@/storybook';

import type { PasswordProps } from '.';
import Password from '.';
import {
  DEFAULT_LABEL_DIRECTION,
  LABEL_DIRECTIONS,
} from '../InputBaseLabel/constants';

type Story = StoryObj<typeof Password>;

export default {
  title: 'forms/inputs/Password',
  component: Password,
  argTypes: {
    ...addInlineRadio<PasswordProps>('labelDirection', LABEL_DIRECTIONS),
  },
  args: {
    label: 'Label',
    required: true,
    meta: {
      helpers: ['helper text'],
    },
    disabled: false,
    placeholder: 'Placeholder',
    labelDirection: DEFAULT_LABEL_DIRECTION,
    value: '',
  },
} as Meta<typeof Password>;

const ControlledPassword = withControlledValue(Password, {
  valuePropName: 'value',
});

const Template: StoryFn<typeof Password> = (args: PasswordProps) => (
  <ControlledPassword {...args} />
);

export const Default: Story = {
  render: Template,
};

export const WithErrors: Story = {
  render: Template,
  args: {
    meta: {
      errors: ['Errors text'],
    },
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    disabled: true,
  },
};

export const Readonly: Story = {
  render: Template,
  args: {
    value: 'value',
    readOnly: true,
  },
};

export const ReadonlyKeyValue: Story = {
  render: Template,
  args: {
    value: 'value',
    readonlyMode: { enabled: true, variant: 'keyValue' },
  },
};
