import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { mockDateDecorator } from 'storybook-mock-date-decorator';

import type { DateTimeProps } from '.';
import DateTime from '.';
import { DEFAULT_DATE_MODE } from './constants';

type Story = StoryObj<typeof DateTime>;

export default {
  title: 'displays/date/DateTime',
  component: DateTime,
  args: {
    date: 1695387600000,
    mode: DEFAULT_DATE_MODE,
  },
  decorators: [mockDateDecorator],
  parameters: {
    date: new Date('November 3, 2023 12:00:00'),
  },
} as Meta<typeof DateTime>;

const Template: StoryFn<typeof DateTime> = (args: DateTimeProps) => (
  <DateTime {...args} />
);

export const Default: Story = {
  render: Template,
};

export const Relative: Story = {
  render: Template,
  args: {
    mode: 'relative',
  },
};
