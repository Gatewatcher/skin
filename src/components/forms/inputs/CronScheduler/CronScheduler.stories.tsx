import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Form, useForm } from '@/skin/forms';
import { Stack } from '@/skin/layout';

import CronScheduler from '.';
import type { WeekDays } from './types';

const WEEK_DAYS: WeekDays = [
  [1, 'Mo'],
  [2, 'Tu'],
  [3, 'We'],
  [4, 'Th'],
  [5, 'Fr'],
  [6, 'Sa'],
  [0, 'Su'],
];

const meta = {
  title: 'forms/inputs/CronScheduler',
  component: CronScheduler,
  args: { weekDays: WEEK_DAYS },
  argTypes: { onChange: { action: 'change' } },
} satisfies Meta<typeof CronScheduler>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    const [cronExp, setCronExp] = useState('');

    const handleChange = (cronExp: string) => {
      args.onChange?.(cronExp);
      setCronExp(cronExp);
    };

    return (
      <Stack direction="column" gap={8}>
        <CronScheduler.Helper cronExp={cronExp} />
        <CronScheduler {...args} onChange={handleChange} />
      </Stack>
    );
  },
};

export const InitialValueBasicDays: Story = {
  render: args => (
    <Stack direction="column" gap={8}>
      {args.initialValue && (
        <CronScheduler.Helper cronExp={args.initialValue} />
      )}
      <CronScheduler {...args} />
    </Stack>
  ),
  args: { initialValue: '30 21 * * 0,6' },
};
InitialValueBasicDays.storyName = 'With Initial Value - Basic View (Days)';

export const InitialValueBasicHours: Story = {
  render: args => (
    <Stack direction="column" gap={8}>
      {args.initialValue && (
        <CronScheduler.Helper cronExp={args.initialValue} />
      )}
      <CronScheduler {...args} />
    </Stack>
  ),
  args: { initialValue: '0 */2 * * 0,6' },
};
InitialValueBasicHours.storyName = 'With Initial Value - Basic View (Hours)';

export const InitialValueBasicMinutes: Story = {
  render: args => (
    <Stack direction="column" gap={8}>
      {args.initialValue && (
        <CronScheduler.Helper cronExp={args.initialValue} />
      )}
      <CronScheduler {...args} />
    </Stack>
  ),
  args: { initialValue: '*/15 * * * 0,6' },
};
InitialValueBasicMinutes.storyName =
  'With Initial Value - Basic View (Minutes)';

export const InitialValueCron: Story = {
  render: args => (
    <Stack direction="column" gap={8}>
      {args.initialValue && (
        <CronScheduler.Helper cronExp={args.initialValue} />
      )}
      <CronScheduler {...args} />
    </Stack>
  ),
  args: { initialValue: '30 */2 * * 0,6' },
};
InitialValueCron.storyName = 'With Initial Value - Cron View';

export const WithForm: Story = {
  render: ({ initialValue, ...args }) => {
    const [form] = useForm();

    return (
      <Form
        form={form}
        initialValues={{ cron: initialValue }}
        onFinish={({ cron }) => alert(cron)}
      >
        <Stack direction="column" gap={12}>
          <Stack direction={'column'} gap={10}>
            <Form.Field dependencies={['cron']}>
              {({ value }) => <CronScheduler.Helper cronExp={value.cron} />}
            </Form.Field>
            <Form.Field name="cron">
              <CronScheduler initialValue={initialValue} {...args} />
            </Form.Field>
          </Stack>
          <Stack.Item alignSelf="flex-end">
            <Form.Actions form={form} />
          </Stack.Item>
        </Stack>
      </Form>
    );
  },
  args: { initialValue: '30 21 * * 0,6' },
  parameters: { controls: { exclude: ['onChange'] } },
};

export const SpecialCaseAllWildcards: Story = {
  render: args => (
    <Stack direction="column" gap={8}>
      {args.initialValue && (
        <CronScheduler.Helper cronExp={args.initialValue} />
      )}
      <CronScheduler {...args} />
    </Stack>
  ),
  args: { initialValue: '* * * * *' },
};
SpecialCaseAllWildcards.storyName = 'Special Case - Every Minute Wildcard';
