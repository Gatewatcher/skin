import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { withControlledValue } from '@/hocs';
import CopyToClipboard from '@/skin/actions/CopyToClipboard';
import { addInlineRadio } from '@/storybook';

import type { NumberProps } from '.';
import Number from '.';
import {
  DEFAULT_LABEL_DIRECTION,
  LABEL_DIRECTIONS,
} from '../InputBaseLabel/constants';
import { DEFAULT_WITH_ARROWS } from './constants';

type Story = StoryObj<typeof Number>;

export default {
  title: 'forms/inputs/Number',
  component: Number,
  argTypes: {
    ...addInlineRadio<NumberProps>('labelDirection', LABEL_DIRECTIONS),
  },
  args: {
    label: 'Label',
    required: true,
    disabled: false,
    labelDirection: DEFAULT_LABEL_DIRECTION,
    withArrows: DEFAULT_WITH_ARROWS,
  },
} as Meta<typeof Number>;

const ControlledNumber = withControlledValue(Number, {
  valuePropName: 'value',
});

const Template: StoryFn<typeof Number> = (args: NumberProps) => (
  <ControlledNumber {...args} />
);

export const Default: Story = {
  render: Template,
};

export const WithRules: Story = {
  render: Template,
  args: {
    min: 1,
    max: 10,
  },
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
    readOnly: true,
    value: 'value',
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

export const WithComplexLabel: Story = {
  render: Template,
  args: {
    label: { primary: 'page_size', secondary: 'number', precision: 'query' },
  },
};
