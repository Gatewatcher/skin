import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { mockDateDecorator } from 'storybook-mock-date-decorator';

import { Button } from '@/skin/actions';
import { Input } from '@/skin/forms';
import { Stack } from '@/skin/layout';

import type { RangeDatepickerProps } from '.';
import RangeDatepicker from '.';

type Story = StoryObj<typeof RangeDatepicker>;

export default {
  title: 'forms/datepicker/RangeDatepicker',
  component: RangeDatepicker,
  argTypes: { onClick: { action: 'clicked' } },
  args: {
    onChange: console.log,
  },
  decorators: [mockDateDecorator],
  parameters: {
    date: new Date('March 4, 2024 12:00:00'),
  },
} as Meta<typeof RangeDatepicker>;

const Template: StoryFn<typeof RangeDatepicker> = (
  args: Omit<RangeDatepickerProps, 'floating'>,
) => (
  <RangeDatepicker {...args}>
    <RangeDatepicker.Presets>
      <RangeDatepicker.PresetToday />
      <RangeDatepicker.PresetYesterday />
      <RangeDatepicker.PresetLastTwoDays />
      <RangeDatepicker.PresetLastTwoWeeks />
      <RangeDatepicker.PresetCustomRange />
    </RangeDatepicker.Presets>
    <RangeDatepicker.Calendars />
  </RangeDatepicker>
);

export const Default: Story = {
  render: Template,
};

export const Floating: Story = {
  render: args => (
    <RangeDatepicker {...args}>
      <RangeDatepicker.Presets>
        <RangeDatepicker.PresetToday />
        <RangeDatepicker.PresetYesterday />
        <RangeDatepicker.PresetLastTwoDays />
        <RangeDatepicker.PresetLastTwoWeeks />
        <RangeDatepicker.PresetCustomRange />
      </RangeDatepicker.Presets>
      <RangeDatepicker.Main>
        <RangeDatepicker.Calendars />
        <RangeDatepicker.Footer>
          <RangeDatepicker.Clear />
          <RangeDatepicker.Actions>
            <RangeDatepicker.Close />
            <RangeDatepicker.Apply onApply={console.log} />
          </RangeDatepicker.Actions>
        </RangeDatepicker.Footer>
      </RangeDatepicker.Main>
    </RangeDatepicker>
  ),
  args: {
    floating: {
      trigger: <Button>Open datepicker</Button>,
    },
  },
};

export const WithInitialDates: Story = {
  render: Template,
  args: {
    initialValue: [
      new Date('March 14, 2024 12:00:00'),
      new Date('March 19, 2024 18:30:00'),
    ],
  },
};

export const ResetOnMinMaxChange: Story = {
  render: (args, context) => {
    const [date1, setDate1] = useState('2024-02-15');
    const [date2, setDate2] = useState('2024-03-25');

    return (
      <Stack direction="column" gap={6}>
        <Stack gap={3}>
          <Input.Date
            label="Min date"
            onChange={event => setDate1(event.target.value)}
            value={date1}
          />
          <Input.Date
            label="Max date"
            onChange={event => setDate2(event.target.value)}
            value={date2}
          />
        </Stack>
        {Template(
          { ...args, max: new Date(date2), min: new Date(date1) },
          context,
        )}
      </Stack>
    );
  },
  args: {
    initialValue: [
      new Date('March 14, 2024 12:00:00'),
      new Date('March 19, 2024 18:30:00'),
    ],
  },
};
