import { faker } from '@faker-js/faker';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { User } from '@/mocks/types';
import { Button } from '@/skin/actions';
import { Section } from '@/skin/displays';
import { Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';

import type { ComponentBoundariesProps } from '.';
import ComponentBoundaries from '.';
import type { Status } from '../types';

type Story<T = User> = StoryObj<typeof ComponentBoundaries<T>>;

faker.seed(10);

export default {
  title: 'feedback/states/ComponentBoundaries',
  component: ComponentBoundaries,
  args: {
    children: faker.lorem.paragraphs(5),
  },
  parameters: {
    controls: { exclude: ['status'] },
  },
} as Meta<typeof ComponentBoundaries<User>>;

const Template: StoryFn<typeof ComponentBoundaries<User>> = (
  args: ComponentBoundariesProps<User>,
) => <ComponentBoundaries {...args} />;

export const Default: Story = {
  render: Template,
  args: {
    data: undefined,
  },
  decorators: [
    (Story, { args }) => {
      const [status, setStatus] = useState<Status>();

      return (
        <Section>
          <Section.Header>
            <Section.Title>With ComponentBoundaries</Section.Title>
          </Section.Header>
          <Section.Body>
            <Stack direction="column" gap={4}>
              <Stack gap={8}>
                <Button onClick={() => setStatus('loading')}>
                  Set loading
                </Button>
                <Button onClick={() => setStatus('error')}>Set error</Button>
                <Button onClick={() => setStatus('success')}>
                  Set success
                </Button>
                <Button onClick={() => setStatus(undefined)}>Reset</Button>
              </Stack>
              <Story args={{ ...args, status }} />
            </Stack>
          </Section.Body>
        </Section>
      );
    },
  ],
};

export const RenderFunction: Story = {
  render: Template,
  args: {
    data: {
      age: 28,
      avatar: '',
      email: 'john@doe.com',
      firstname: 'John',
      id: 1,
      lastname: 'Doe',
    },
    children: data => (
      <div data-testid="user">{`${data.firstname} ${data.lastname}`}</div>
    ),
  },
  decorators: [
    (Story, { args }) => {
      const [status, setStatus] = useState<Status>();

      return (
        <Section>
          <Section.Header>
            <Section.Title>With ComponentBoundaries</Section.Title>
          </Section.Header>
          <Section.Body>
            <Stack direction="column" gap={4}>
              <Stack gap={8}>
                <Button onClick={() => setStatus('loading')}>
                  Set loading
                </Button>
                <Button onClick={() => setStatus('error')}>Set error</Button>
                <Button onClick={() => setStatus('success')}>
                  Set success
                </Button>
                <Button onClick={() => setStatus(undefined)}>Reset</Button>
              </Stack>
              <Story args={{ ...args, status }} />
            </Stack>
          </Section.Body>
        </Section>
      );
    },
  ],
};

const ThrowError = () => {
  throw Error('throw');
};

export const RenderThrow: Story = {
  render: Template,
  args: {
    children: () => <ThrowError />,
  },
  decorators: [
    (Story, { args }) => {
      return <Story args={{ ...args }} />;
    },
  ],
};

export const MultipleStatuses: Story = {
  render: Template,
  decorators: [
    (Story, { args }) => {
      const [status, setStatus] = useState<Status>();
      const [status2, setStatus2] = useState<Status>();

      return (
        <Section>
          <Section.Header>
            <Section.Title>With ComponentBoundaries</Section.Title>
          </Section.Header>
          <Section.Body>
            <Stack direction="column" gap={4}>
              <Stack alignItems="center" gap={8}>
                <Button onClick={() => setStatus('loading')}>
                  Set loading 1
                </Button>
                <Button onClick={() => setStatus('error')}>Set error 1</Button>
                <Button onClick={() => setStatus('success')}>
                  Set success 1
                </Button>
                <Button onClick={() => setStatus(undefined)}>Reset 1</Button>
                <Text>Status 1 : {status || '-'}</Text>
              </Stack>

              <Stack alignItems="center" gap={8}>
                <Button onClick={() => setStatus2('loading')}>
                  Set loading 2
                </Button>
                <Button onClick={() => setStatus2('error')}>Set error 2</Button>
                <Button onClick={() => setStatus2('success')}>
                  Set success 2
                </Button>
                <Button onClick={() => setStatus2(undefined)}>Reset 2</Button>
                <Text>Status 2 : {status2 || '-'}</Text>
              </Stack>

              <Story args={{ ...args, status: [status, status2] }} />
            </Stack>
          </Section.Body>
        </Section>
      );
    },
  ],
};
