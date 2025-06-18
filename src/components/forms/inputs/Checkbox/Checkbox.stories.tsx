import { faker } from '@faker-js/faker/locale/en';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { withControlledValue } from '@/hocs';
import { OverflownText, Text } from '@/skin/typography';

import type { CheckboxProps } from '.';
import Checkbox from '.';

faker.seed(42);

type Story = StoryObj<typeof Checkbox>;

export default {
  title: 'forms/inputs/Checkbox',
  component: Checkbox,
  args: {
    disabled: false,
    label: 'label 1',
  },
  parameters: {
    controls: { exclude: ['labelDirection'] },
  },
} as Meta<typeof Checkbox>;

const ControlledCheckbox = withControlledValue(Checkbox, {
  valuePropName: 'checked',
});

const Template: StoryFn<typeof Checkbox> = (args: CheckboxProps) => (
  <ControlledCheckbox value="value 1" {...args} />
);

export const Default: Story = {
  render: Template,
  args: {},
};

export const Disabled: Story = {
  render: Template,
  args: {
    disabled: true,
  },
};

export const Indeterminate: Story = {
  render: Template,
  args: {
    indeterminate: true,
    value: '',
  },
};

export const WithRidiculouslyLongLabel: Story = {
  render: Template,
  args: {
    label: faker.lorem.paragraphs(5),
    withMultilineLabel: false,
  },
};

export const WithReactNodeLabel: Story = {
  render: Template,
  args: {
    label: <Text>react node label</Text>,
  },
  parameters: {
    controls: { exclude: ['label'] },
  },
};

export const WithOverflownText: Story = {
  render: args => {
    return (
      <OverflownText padding={{ x: 2 }}>
        <Template {...args} />
      </OverflownText>
    );
  },
  args: {
    label: faker.lorem.paragraphs(5),
    withMultilineLabel: false,
  },
};
