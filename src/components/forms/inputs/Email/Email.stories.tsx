import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { withControlledValue } from '@/hocs';
import CopyToClipboard from '@/skin/actions/CopyToClipboard';
import { addInlineRadio } from '@/storybook';

import type { EmailProps } from '.';
import Email from '.';
import {
  DEFAULT_LABEL_DIRECTION,
  DEFAULT_WITH_LABEL,
  LABEL_DIRECTIONS,
} from '../InputBaseLabel/constants';

type Story = StoryObj<typeof Email>;

export default {
  title: 'forms/inputs/Email',
  component: Email,
  argTypes: {
    ...addInlineRadio<EmailProps>('labelDirection', LABEL_DIRECTIONS),
  },
  args: {
    label: 'Label',
    labelDirection: DEFAULT_LABEL_DIRECTION,
    required: true,
    meta: {
      helpers: ['helper text'],
    },
    disabled: false,
    placeholder: 'Placeholder',
    withLabel: DEFAULT_WITH_LABEL,
  },
} as Meta<typeof Email>;

const ControlledText = withControlledValue(Email, { valuePropName: 'value' });
const Template: StoryFn<typeof Email> = (args: EmailProps) => (
  <ControlledText {...args} />
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
    value: 'readonly mode',
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

export const WithElementBefore: Story = {
  render: Template,
  args: {
    elementBefore: <CopyToClipboard clipText="-" alwaysVisible />,
  },
};

export const WithElementAfter: Story = {
  render: Template,
  args: {
    elementAfter: <CopyToClipboard clipText="-" alwaysVisible />,
  },
};
