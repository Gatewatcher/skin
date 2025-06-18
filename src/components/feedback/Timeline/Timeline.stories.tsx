import { faker } from '@faker-js/faker';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { mockDateDecorator } from 'storybook-mock-date-decorator';

import { OverflownText, Paragraph } from '@/skin/typography';

import type { TimelineProps } from '.';
import Timeline from '.';

faker.seed(10);

type Story = StoryObj<typeof Timeline>;

export default {
  title: 'feedback/Timeline',
  component: Timeline,
  decorators: [mockDateDecorator, withRouter],
  parameters: {
    date: new Date('January 21, 2024 14:00:00'),
  },
} as Meta<typeof Timeline>;

const Template: StoryFn<typeof Timeline> = (args: TimelineProps) => (
  <Timeline {...args}>
    <Timeline.Item icon="User">
      <Timeline.Title>Title</Timeline.Title>
      <Timeline.Body>
        <Paragraph size="small">{faker.lorem.paragraph()}</Paragraph>
      </Timeline.Body>
      <Timeline.Date date={faker.date.past({ refDate: Date.now() })} />
    </Timeline.Item>
    <Timeline.Item icon="User">
      <Timeline.Title>Title</Timeline.Title>
      <Timeline.Body>
        <Paragraph size="small">{faker.lorem.paragraph()}</Paragraph>
      </Timeline.Body>
      <Timeline.Date date={faker.date.past({ refDate: Date.now() })} />
    </Timeline.Item>
    <Timeline.Item icon="User">
      <Timeline.Title>Title</Timeline.Title>
      <Timeline.Body>
        <Paragraph size="small">{faker.lorem.paragraph()}</Paragraph>
      </Timeline.Body>
      <Timeline.Date date={faker.date.past({ refDate: Date.now() })} />
    </Timeline.Item>

    <Timeline.Item icon="User">
      <Timeline.Title>Title</Timeline.Title>
      <Timeline.Body direction="column">
        <OverflownText>
          {faker.lorem.sentence(20).replace(/ /g, '')}
        </OverflownText>
      </Timeline.Body>
      <Timeline.Date date={faker.date.past({ refDate: Date.now() })} />
    </Timeline.Item>

    <Timeline.Item icon="User">
      <Timeline.Title>Title</Timeline.Title>
      <Timeline.Body direction="column">
        <OverflownText>{faker.lorem.words()}</OverflownText>
      </Timeline.Body>
      <Timeline.Date date={faker.date.past({ refDate: Date.now() })} />
    </Timeline.Item>
  </Timeline>
);

export const Default: Story = {
  render: Template,
  decorators: [
    Story => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
};
