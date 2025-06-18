import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';
import { mockDateDecorator } from 'storybook-mock-date-decorator';

import CopyToClipboard from '@/skin/actions/CopyToClipboard';
import { addInlineRadio } from '@/storybook';

import type { DateProps } from '.';
import InputDate from '.';
import {
  DEFAULT_LABEL_DIRECTION,
  DEFAULT_WITH_LABEL,
  LABEL_DIRECTIONS,
} from '../InputBaseLabel/constants';

type Story = StoryObj<typeof InputDate>;

export default {
  title: 'forms/inputs/Date',
  component: InputDate,
  argTypes: {
    ...addInlineRadio<DateProps>('labelDirection', LABEL_DIRECTIONS),
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
  decorators: [mockDateDecorator],
  parameters: {
    date: new Date('May 17, 2024 12:00:00'),
  },
} as Meta<typeof InputDate>;

const Template: StoryFn<typeof InputDate> = (args: DateProps) => (
  <InputDate {...args} />
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
    value: 'readonly keyvalue mode',
    readonlyMode: {
      enabled: true,
      variant: 'keyValue',
    },
  },
};

export const ReadonlyKeyValueFallback: Story = {
  render: Template,
  args: {
    value: undefined,
    readonlyMode: {
      enabled: true,
      variant: 'keyValue',
    },
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

export const WithMinMax: Story = {
  render: Template,
  args: {
    min: dayjs().subtract(3, 'd').toDate(),
    max: dayjs().add(3, 'd').toDate(),
  },
};
