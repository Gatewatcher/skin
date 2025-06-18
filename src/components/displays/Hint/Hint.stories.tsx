import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Stack } from '@/skin/layout';
import { addInlineRadio } from '@/storybook';

import type { HintProps } from '.';
import Hint from '.';
import { DEFAULT_VARIANT, HINT_VARIANTS } from './constants';

type Story = StoryObj<typeof Hint>;

export default {
  title: 'displays/Hint',
  component: Hint,
  args: {
    children: 'Hint',
    variant: DEFAULT_VARIANT,
  },
  argTypes: {
    ...addInlineRadio<HintProps>('variant', HINT_VARIANTS),
  },
} as Meta<typeof Hint>;

const Template: StoryFn<typeof Hint> = ({ children, ...args }: HintProps) => (
  <Hint {...args}>{children}</Hint>
);

export const Default: Story = {
  render: Template,
};

export const All: Story = {
  render: ({ children, ...args }) => (
    <Stack direction="column" gap={5}>
      {HINT_VARIANTS.map(variant => (
        <Hint key={variant} {...args} variant={variant}>
          {children}
        </Hint>
      ))}
    </Stack>
  ),

  parameters: { controls: { exclude: ['variant'] } },
};
