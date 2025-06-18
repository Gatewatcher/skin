import { faker } from '@faker-js/faker';
import { useToggle } from '@gatewatcher/bistoury/hooks';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import type { User } from '@/mocks/types';
import { Button } from '@/skin/actions';
import { Section } from '@/skin/displays';
import { Stack } from '@/skin/layout';

import type { ErrorStateProps } from '.';
import ErrorState from '.';
import { DEFAULT_PADDING } from '../constants';

faker.seed(10);

type Story<T = User> = StoryObj<typeof ErrorState<T>>;

export default {
  title: 'feedback/states/ErrorState',
  component: ErrorState,
  args: {
    children: faker.lorem.paragraphs(5),
    error: { detail: 'Something went wrong', statusCode: 404 },
    padding: DEFAULT_PADDING,
  },
  decorators: [
    (Story, { args }) => {
      const [isError, toggleIsError] = useToggle(false);
      return (
        <Section>
          <Section.Header>
            <Section.Title>With Error</Section.Title>
          </Section.Header>
          <Section.Body>
            <Stack direction="column" gap={4}>
              <Button onClick={toggleIsError}>Toggle</Button>
              <Story args={{ ...args, isError }} />
            </Stack>
          </Section.Body>
        </Section>
      );
    },
  ],
  parameters: {
    controls: { exclude: ['isError'] },
  },
} as Meta<typeof ErrorState>;

const Template: StoryFn<typeof ErrorState<User>> = (
  args: ErrorStateProps<User>,
) => <ErrorState {...args} />;

export const Default: Story = {
  render: Template,
};

export const CustomError: Story = {
  render: Template,
  args: {
    errorComponent: <div>Custom error</div>,
  },
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
};
