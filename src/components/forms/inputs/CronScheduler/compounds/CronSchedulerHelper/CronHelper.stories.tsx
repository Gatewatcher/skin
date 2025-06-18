import type { Meta, StoryObj } from '@storybook/react';

import { addSelect } from '@/storybook';

import CronSchedulerHelper from '.';
// We need to synchronously import the locales here.
import * as allLocales from '../../lib/cronstrue/locales';

const meta = {
  title: 'forms/inputs/CronScheduler/CronSchedulerHelper',
  component: CronSchedulerHelper,
  render: ({ locale, ...args }) => (
    <CronSchedulerHelper {...args} locale={locale} />
  ),
  argTypes: {
    ...addSelect('locale', Object.keys(allLocales)),
  },
} satisfies Meta<typeof CronSchedulerHelper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    cronExp: '* * * * *',
    verbose: false,
    locale: 'en',
  },
} satisfies Story;

export const Empty = {
  args: {
    cronExp: '',
  },
} satisfies Story;

export const Error = {
  args: {
    cronExp: 'invalid cron expression',
  },
} satisfies Story;
