import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Form } from '@/skin/forms';
import { FormStore } from '@/skin/forms/Form/FormStore';
import { Stack } from '@/skin/layout';

import SimpleScheduler, { type SchedulerProps } from '.';
import type { Schedule } from '../../types';

type Story = StoryObj<typeof SimpleScheduler>;

export default {
  title: 'forms/inputs/CronScheduler/SimpleScheduler',
  component: SimpleScheduler,
  args: {
    value: {
      period: 'days',
      hours: 21,
      minutes: 30,
      days: [1, 5],
    },
  },
  argTypes: { onChange: { action: 'change' } },
} satisfies Meta<typeof SimpleScheduler>;

const Template: StoryFn<typeof SimpleScheduler> = (args: SchedulerProps) => (
  <SimpleScheduler {...args} />
);

export const Default: Story = {
  render: args => {
    const [schedule, setSchedule] = useState(args.value);

    const handleChange = (schedule: Schedule) => {
      args.onChange?.(schedule);
      setSchedule(schedule);
    };

    return <Template {...args} onChange={handleChange} value={schedule} />;
  },
};

export const WithForm: Story = {
  render: args => {
    const formStore = new FormStore(() => {});
    const form = formStore.getForm();

    return (
      <Form onFinish={({ schedule }) => alert(JSON.stringify(schedule))}>
        <Stack direction="column" gap={10}>
          <Form.Field name="schedule">
            <SimpleScheduler {...args} />
          </Form.Field>
          <Form.Actions form={form} />
        </Stack>
      </Form>
    );
  },
};
