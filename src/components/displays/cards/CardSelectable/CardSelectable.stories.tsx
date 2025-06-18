import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Form } from '@/skin/forms';
import { Stack } from '@/skin/layout';

import type { CardSelectableProps } from '.';
import CardSelectable from '.';

type Story = StoryObj<typeof CardSelectable>;

export default {
  title: 'displays/cards/CardSelectable',
  component: CardSelectable,
} as Meta<typeof CardSelectable>;

const Template: StoryFn<typeof CardSelectable> = ({
  children,
  ...args
}: CardSelectableProps) => (
  <CardSelectable {...args}>{children}</CardSelectable>
);

export const Default: Story = {
  render: Template,
  args: {
    children: (
      <>
        <CardSelectable.Header>
          <CardSelectable.Title>Selectable Card</CardSelectable.Title>
          <CardSelectable.InputRadio />
        </CardSelectable.Header>

        <CardSelectable.Body>body</CardSelectable.Body>
      </>
    ),
  },
};

export const Selected: Story = {
  render: Template,
  args: {
    selected: true,
    children: (
      <>
        <CardSelectable.Header>
          <CardSelectable.Title>Selectable Card</CardSelectable.Title>
          <CardSelectable.InputRadio checked />
        </CardSelectable.Header>

        <CardSelectable.Body>body</CardSelectable.Body>
      </>
    ),
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    disabled: true,
    children: (
      <>
        <CardSelectable.Header>
          <CardSelectable.Title>Selectable Card</CardSelectable.Title>
          <CardSelectable.InputRadio />
        </CardSelectable.Header>

        <CardSelectable.Body>body</CardSelectable.Body>
      </>
    ),
  },
};

export const AsForm: Story = {
  render: Template,
  decorators: [
    (Story, { args }) => {
      const [currentUser, setCurrentUser] = useState<string | undefined>();

      return (
        <Form onValuesChange={console.log}>
          <Form.Field name="user">
            {(control, meta) => (
              <Stack gap={9}>
                {['John', 'Alice', 'Bob'].map(user => (
                  <Story
                    key={user}
                    args={{
                      ...args,
                      selected: currentUser === user,
                      children: (
                        <>
                          <CardSelectable.Header>
                            <CardSelectable.Title>{user}</CardSelectable.Title>
                            <CardSelectable.InputRadio
                              onChange={event =>
                                setCurrentUser(event.target.value)
                              }
                              meta={meta}
                              value={user}
                            />
                          </CardSelectable.Header>

                          <CardSelectable.Body>body</CardSelectable.Body>
                        </>
                      ),
                    }}
                  />
                ))}
              </Stack>
            )}
          </Form.Field>
        </Form>
      );
    },
  ],
};
