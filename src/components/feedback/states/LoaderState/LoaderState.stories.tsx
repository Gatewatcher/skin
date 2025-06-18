import { faker } from '@faker-js/faker';
import { useToggle } from '@gatewatcher/bistoury/hooks';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import type { User } from '@/mocks/types';
import { Button } from '@/skin/actions';
import { Section } from '@/skin/displays';
import { Stack } from '@/skin/layout';

import type { LoaderStateProps } from '.';
import LoaderState from '.';
import { DEFAULT_PADDING } from '../constants';

type Story<T = User> = StoryObj<typeof LoaderState<T>>;

faker.seed(10);

export default {
  title: 'feedback/states/LoaderState',
  component: LoaderState,
  args: {
    children: faker.lorem.paragraphs(5),
    padding: DEFAULT_PADDING,
  },
  decorators: [
    (Story, { args }) => {
      const [isLoading, toggleIsLoading] = useToggle(false);
      return (
        <Section>
          <Section.Header>
            <Section.Title>With loader</Section.Title>
          </Section.Header>
          <Section.Body>
            <Stack direction="column" gap={4}>
              <Button onClick={toggleIsLoading}>Toggle</Button>
              <Story args={{ ...args, isLoading }} />
            </Stack>
          </Section.Body>
        </Section>
      );
    },
  ],
  parameters: {
    controls: { exclude: ['isLoading'] },
  },
} as Meta<typeof LoaderState<User>>;

const Template: StoryFn<typeof LoaderState<User>> = (
  args: LoaderStateProps<User>,
) => <LoaderState {...args} />;

export const Default: Story = {
  render: Template,
};

export const CustomLoader: Story = {
  render: Template,
  args: {
    loader: <div>Custom loader...</div>,
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
