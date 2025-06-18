import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { mockDateDecorator } from 'storybook-mock-date-decorator';

import { Button } from '@/skin/actions';

import type { SingleDatepickerProps } from '.';
import SingleDatepicker from '.';

type Story = StoryObj<typeof SingleDatepicker>;

export default {
  title: 'forms/datepicker/SingleDatepicker',
  component: SingleDatepicker,
  argTypes: { onClick: { action: 'clicked' } },
  args: {
    onChange: console.log,
  },
  decorators: [mockDateDecorator],
  parameters: {
    date: new Date('March 4, 2024 12:00:00'),
  },
} as Meta<typeof SingleDatepicker>;

const Template: StoryFn<typeof SingleDatepicker> = (
  args: SingleDatepickerProps,
) => (
  <SingleDatepicker {...args}>
    <SingleDatepicker.Calendar />
  </SingleDatepicker>
);

export const Default: Story = {
  render: Template,
};

export const MinMax: Story = {
  render: Template,
  args: {
    min: new Date('March 10, 2024 12:00:00'),
    max: new Date('March 19, 2024 12:00:00'),
  },
  parameters: {
    date: new Date('March 15, 2024 12:00:00'),
  },
};

export const Floating: Story = {
  render: args => (
    <SingleDatepicker {...args}>
      <SingleDatepicker.Main>
        <SingleDatepicker.Calendar />
        <SingleDatepicker.Footer>
          <SingleDatepicker.Clear />
          <SingleDatepicker.Actions>
            <SingleDatepicker.Close />
            <SingleDatepicker.Apply onApply={console.log} />
          </SingleDatepicker.Actions>
        </SingleDatepicker.Footer>
      </SingleDatepicker.Main>
    </SingleDatepicker>
  ),
  args: {
    floating: {
      trigger: <Button>Open datepicker</Button>,
    },
  },
};

export const WithInitialDate: Story = {
  render: Template,
  args: {
    initialValue: new Date('March 14, 2024 12:00:00'),
  },
};
