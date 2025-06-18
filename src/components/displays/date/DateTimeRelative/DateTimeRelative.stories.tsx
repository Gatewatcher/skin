import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { mockDateDecorator } from 'storybook-mock-date-decorator';

import type { DateTimeRelativeProps } from '.';
import DateTimeRelative from '.';

type Story = StoryObj<typeof DateTimeRelative>;

export default {
  title: 'displays/date/DateTimeRelative',
  component: DateTimeRelative,
  args: {
    date: 1695387600123,
  },
  decorators: [mockDateDecorator],
  parameters: {
    controls: { include: ['date', 'format'] },
    date: new Date('November 3, 2023 12:00:00'),
  },
} as Meta<typeof DateTimeRelative>;

const Template: StoryFn<typeof DateTimeRelative> = (
  args: DateTimeRelativeProps,
) => <DateTimeRelative {...args} />;

export const Default: Story = {
  render: Template,
};
