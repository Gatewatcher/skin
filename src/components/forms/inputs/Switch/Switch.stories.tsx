import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { withControlledValue } from '@/hocs';

import type { SwitchProps } from '.';
import Switch from '.';
import {
  DEFAULT_CHECKED_ICON_COLOR,
  DEFAULT_UNCHECKED_ICON_COLOR,
} from './constants';

type Story = StoryObj<typeof Switch>;

export default {
  title: 'forms/inputs/Switch',
  component: Switch,
  args: {
    checkedIconColor: DEFAULT_CHECKED_ICON_COLOR,
    uncheckedIconColor: DEFAULT_UNCHECKED_ICON_COLOR,
  },
  parameters: {
    controls: { exclude: ['labelDirection'] },
  },
} as Meta<typeof Switch>;

const ControlledSwitch = withControlledValue(Switch, {
  valuePropName: 'checked',
});

const Template: StoryFn<typeof Switch> = (args: SwitchProps) => (
  <ControlledSwitch {...args} />
);

export const Default: Story = {
  render: Template,
};

export const WithLabels: Story = {
  render: Template,
  args: {
    startLabel: 'startLabel',
    endLabel: 'endLabel',
  },
};

export const WithIcons: Story = {
  render: Template,
  args: {
    checkedIcon: 'BurgerMenu',
    uncheckedIcon: 'Edit',
  },
};

export const WithIconsAndLabels: Story = {
  render: Template,
  args: {
    checkedIcon: 'BurgerMenu',
    endLabel: 'end',
    uncheckedIcon: 'Edit',
    startLabel: 'start',
  },
};

export const WithErrors: Story = {
  render: Template,
  args: {
    meta: {
      errors: ['some errors'],
    },
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    disabled: true,
    startLabel: 'start',
    endLabel: 'end',
  },
};

export const Readonly: Story = {
  render: Template,
  args: {
    endLabel: 'end',
    readonlyMode: { enabled: true, label: 'Readonly label' },
  },
};

export const LongLabel: Story = {
  args: {
    endLabel:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  },
  decorators: [
    Story => (
      <div style={{ width: 500 }}>
        <Story />
      </div>
    ),
  ],
};
