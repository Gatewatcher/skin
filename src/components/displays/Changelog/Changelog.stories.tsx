import type { Meta, StoryObj } from '@storybook/react';

import { addInlineRadio } from '@/storybook';

import type { ChangelogProps } from '.';
import Changelog from '.';
import { DATE_MODES, DEFAULT_CHANGELOG, DEFAULT_DATE_MODE } from './constants';

type Story = StoryObj<typeof Changelog>;

export default {
  title: 'displays/Changelog',
  component: Changelog,
  argTypes: {
    ...addInlineRadio<ChangelogProps>('dateMode', DATE_MODES),
  },
} as Meta<typeof Changelog>;

export const Default: Story = {
  args: {
    changelog: DEFAULT_CHANGELOG,
    dateMode: DEFAULT_DATE_MODE,
  },
};
