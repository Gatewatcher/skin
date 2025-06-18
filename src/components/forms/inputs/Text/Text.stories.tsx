import { faker } from '@faker-js/faker/locale/en';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { withControlledValue } from '@/hocs';
import CopyToClipboard from '@/skin/actions/CopyToClipboard';
import { addInlineRadio } from '@/storybook';

import type { TextProps } from '.';
import Text from '.';
import {
  DEFAULT_LABEL_DIRECTION,
  DEFAULT_WITH_LABEL,
  LABEL_DIRECTIONS,
} from '../InputBaseLabel/constants';

faker.seed(10);

type Story = StoryObj<typeof Text>;

export default {
  title: 'forms/inputs/Text',
  component: Text,
  argTypes: {
    ...addInlineRadio<TextProps>('labelDirection', LABEL_DIRECTIONS),
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
} as Meta<typeof Text>;

const ControlledText = withControlledValue(Text, { valuePropName: 'value' });
const Template: StoryFn<typeof Text> = (args: TextProps) => (
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

export const PlaceholderEllipsis: Story = {
  render: Template,
  args: {
    placeholder: faker.lorem.paragraph(100),
  },
};

export const WithCopySuffix: Story = {
  render: Template,
  args: {
    elementAfter: <Text.CopySuffix clipText="lorem ipsum" />,
  },
};

export const WithComplexLabel: Story = {
  render: Template,
  args: {
    label: { primary: 'date_from', secondary: 'string', precision: 'query' },
  },
};
