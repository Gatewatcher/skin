import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { COLORS_SCAlE } from '@/constants';
import { Stack } from '@/skin/layout';
import { addSelect } from '@/storybook';

import type { NeutralTextProps } from '.';
import NeutralText from '.';
import { DEFAULT_VARIANT } from './constants';

type Story = StoryObj<typeof NeutralText>;

export default {
  title: 'typography/NeutralText',
  component: NeutralText,
  args: {
    variant: DEFAULT_VARIANT,
    children: 'some text',
  },
  argTypes: {
    ...addSelect<NeutralTextProps>('variant', COLORS_SCAlE),
  },
} as Meta<typeof NeutralText>;

const Template: StoryFn<typeof NeutralText> = (args: NeutralTextProps) => (
  <NeutralText {...args} />
);

export const Default: Story = {
  render: Template,
};

export const All: Story = {
  render: Template,
  parameters: {
    controls: { exclude: ['variant'] },
  },
  decorators: [
    (Story, { args }) => (
      <Stack direction="column">
        {COLORS_SCAlE.map(variant => (
          <Story key={variant} args={{ ...args, variant }} />
        ))}
      </Stack>
    ),
  ],
};
