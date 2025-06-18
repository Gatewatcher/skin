import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { mockDateDecorator } from 'storybook-mock-date-decorator';

import { addInlineRadio } from '@/storybook';

import type { DateTimeAbsoluteProps } from '.';
import DateTimeAbsolute from '.';
import { DEFAULT_FORMAT, FORMATS } from './constants';

type Story = StoryObj<typeof DateTimeAbsolute>;

export default {
  title: 'displays/date/DateTimeAbsolute',
  component: DateTimeAbsolute,
  args: {
    date: 1695387600123,
    format: DEFAULT_FORMAT,
  },
  argTypes: {
    ...addInlineRadio<DateTimeAbsoluteProps>('format', FORMATS),
  },
  decorators: [mockDateDecorator],
  parameters: {
    controls: { include: ['date', 'format'] },
    date: new Date('November 3, 2023 12:00:00'),
  },
} as Meta<typeof DateTimeAbsolute>;

const Template: StoryFn<typeof DateTimeAbsolute> = (
  args: DateTimeAbsoluteProps,
) => <DateTimeAbsolute {...args} />;

export const Default: Story = {
  render: Template,
};

export const Overflown: Story = {
  args: {
    withEllipsis: true,
  },
  decorators: [
    (Story, { args }) => {
      return (
        <div style={{ backgroundColor: 'grey', width: '50px' }}>
          <Story {...args} />
        </div>
      );
    },
  ],
};
