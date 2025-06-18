import { faker } from '@faker-js/faker';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { withControlledValue } from '@/hocs';
import { Stack } from '@/skin/layout';
import { addInlineRadio } from '@/storybook';

import {
  DEFAULT_LABEL_DIRECTION,
  DEFAULT_WITH_LABEL,
  LABEL_DIRECTIONS,
} from '../InputBaseLabel/constants';
import type { TextAreaProps } from './';
import TextArea from './';

type Story = StoryObj<typeof TextArea>;

faker.seed(10);

export default {
  title: 'forms/inputs/TextArea',
  component: TextArea,
  argTypes: {
    ...addInlineRadio<TextAreaProps>('labelDirection', LABEL_DIRECTIONS),
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
} as Meta<typeof TextArea>;

const ControlledTextArea = withControlledValue(TextArea, {
  valuePropName: 'value',
});

const Template: StoryFn<typeof TextArea> = (args: TextAreaProps) => (
  <ControlledTextArea {...args} />
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

export const WithMaxLength: Story = {
  render: Template,
  args: {
    maxLength: 20,
    value: 'textarea value',
    meta: { helpers: ['helpers'] },
  },
};

export const ReadonlyMode: Story = {
  render: Template,
  args: {
    readonlyMode: {
      enabled: true,
      variant: 'keyValue',
    },
  },
};

export const Readonly: Story = {
  render: Template,
  args: {
    readOnly: true,
    value: 'textarea value',
  },
};

export const WithFlexGrow: Story = {
  render: Template,
  args: {
    flexGrow: 1,
  },
  decorators: [
    (Story, { args }) => {
      return (
        <Stack direction="column" style={{ height: '500px' }}>
          <Story args={args} />
        </Stack>
      );
    },
  ],
};

export const AutoGrow: Story = {
  render: Template,
  args: {
    value: faker.lorem.sentences(8, '\n'),
    autoGrow: true,
  },
};
