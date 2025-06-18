import { faker } from '@faker-js/faker';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Icon } from '@/skin/displays';
import { Stack } from '@/skin/layout';
import { addBoolean, addInlineRadio } from '@/storybook';

import type { OverflownTextProps } from '.';
import OverflownText from '.';
import { ALIGNMENT_VARIANTS } from '../constants';

type Story = StoryObj<typeof OverflownText>;

faker.seed(10);

export default {
  title: 'typography/OverflownText',
  component: OverflownText,
  argTypes: {
    ...addBoolean<OverflownTextProps>('isDisabled'),
    ...addInlineRadio<OverflownTextProps>('alignment', ALIGNMENT_VARIANTS),
  },
  args: {
    children: faker.lorem.sentence(9),
  },
} as Meta<typeof OverflownText>;

const Template: StoryFn<typeof OverflownText> = (args: OverflownTextProps) => (
  <OverflownText {...args} />
);

export const Default: Story = {
  render: Template,
};

export const Overflown: Story = {
  render: Template,
  decorators: [
    Story => (
      <div style={{ width: 200 }}>
        <Story />
      </div>
    ),
  ],
};

export const WithAlignment: Story = {
  render: Template,
  decorators: [
    Story => (
      <Stack alignItems="center" direction="column" style={{ width: 200 }}>
        <Icon name="CsUserComputer" />
        <Story />
      </Stack>
    ),
  ],
};

export const WithoutWhitespace: Story = {
  render: Template,
  args: {
    children: faker.lorem.sentence(25).replace(/\s/g, ''),
  },
  decorators: [
    Story => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
};
