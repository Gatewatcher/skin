import { faker } from '@faker-js/faker/locale/en';
import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { mockDateDecorator } from 'storybook-mock-date-decorator';

import { Link } from '@/skin/actions';
import { addInlineRadio } from '@/storybook';

import type { NotificationProps } from '.';
import Notification from '.';
import { DEFAULT_WITH_DIVIDER, NOTIFICATION_TYPES } from './constants';

faker.seed(10);

type Story = StoryObj<typeof Notification>;

export default {
  title: 'feedback/Notification',
  component: Notification,
  args: {
    onClose: () => alert('close'),
    content: faker.lorem.sentences(2),
    date: '10/02/23 17:32',
    dateFormat: 'L LT',
    link: <Link to="/">Details</Link>,
    title: 'Monitoring',
    type: 'critical',
    withDivider: DEFAULT_WITH_DIVIDER,
  },
  argTypes: {
    ...addInlineRadio<NotificationProps>('dateMode', ['absolute', 'relative']),
    ...addInlineRadio<NotificationProps>('type', NOTIFICATION_TYPES),
  },
  decorators: [withRouter, mockDateDecorator],
  parameters: {
    date: new Date('October 3, 2023 12:00:00'),
  },
} as Meta<typeof Notification>;

export const Default: Story = {};

export const WithAbsoluteDate: Story = {
  args: {
    dateMode: 'absolute',
  },
};

export const WithVeryLongContent: Story = {
  args: {
    content: faker.lorem.sentences(10),
  },
};
