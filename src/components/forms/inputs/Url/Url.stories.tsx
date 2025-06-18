import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { withControlledValue } from '@/hocs';

import type { UrlProps } from '.';
import Url from '.';

type Story = StoryObj<typeof Url>;

export default {
  title: 'forms/inputs/Url',
  component: Url,
  args: {
    value: 'www.google.com',
    prefix: 'https://',
  },
} as Meta<typeof Url>;

const ControlledUrl = withControlledValue(Url, { valuePropName: 'value' });
const Template: StoryFn<typeof Url> = (args: UrlProps) => (
  <ControlledUrl {...args} />
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

export const Suffix: Story = {
  render: Template,
  args: {
    value: 'doqsdsq',
    suffix: '.com',
    prefix: undefined,
  },
};

export const Both: Story = {
  render: Template,
  args: {
    suffix: '.com',
  },
};
