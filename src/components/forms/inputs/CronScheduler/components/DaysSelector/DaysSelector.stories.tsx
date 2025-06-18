import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Form } from '@/skin/forms';
import { FormStore } from '@/skin/forms/Form/FormStore';
import { Stack } from '@/skin/layout';

import DaysSelector from '.';
import type { WeekDays } from '../../types';

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
  title: 'forms/inputs/CronScheduler/DaysSelector',
  component: DaysSelector,
  args: {
    weekDays: WEEK_DAYS,
    label: 'On',
    tooltip: 'Select the days on which the task will run.',
    value: [1, 2, 3, 4, 5],
  },
  argTypes: { onChange: { action: 'change' } },
} satisfies Meta<typeof DaysSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    const [days, setDays] = useState(args.value);

    const handleChange = (value: number[]) => {
      args.onChange?.(value);
      setDays(value);
    };

    return <DaysSelector {...args} onChange={handleChange} value={days} />;
  },
};

export const WithForm: Story = {
  render: args => {
    const formStore = new FormStore(() => {});
    const form = formStore.getForm();

    return (
      <Form
        initialValues={{ days: args.value }}
        onFinish={({ days }) => alert(days)}
      >
        <Stack direction="column" gap={10}>
          <Form.Field name="days">
            <DaysSelector {...args} />
          </Form.Field>
          <Form.Actions form={form} />
        </Stack>
      </Form>
    );
  },
};
