import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-remix-react-router';

import { Link } from '@/skin/actions';
import { Dropdown, Icon } from '@/skin/displays';
import { Text } from '@/skin/typography';

import type { CardProps } from '.';
import Card from '.';

type Story = StoryObj<typeof Card>;

export default {
  title: 'displays/cards/Card',
  component: Card,
} as Meta<typeof Card>;

const Template: StoryFn<typeof Card> = ({ children, ...args }: CardProps) => (
  <Card {...args}>{children}</Card>
);

export const Default: Story = {
  render: Template,
  args: {
    children: (
      <>
        <Card.Header>
          <Card.Title>Card title</Card.Title>
        </Card.Header>
        <Card.Body>
          <Text>Some content</Text>
        </Card.Body>
      </>
    ),
  },
};

export const WithAction: Story = {
  render: Template,
  args: {
    children: (
      <>
        <Card.Header>
          <Card.Title>Card title</Card.Title>
          <Card.Button onClick={console.log}>action</Card.Button>
        </Card.Header>
        <Card.Body>
          <Text>Some content</Text>
        </Card.Body>
      </>
    ),
  },
};

export const WithActionButton: Story = {
  render: Template,
  args: {
    children: (
      <>
        <Card.Header>
          <Card.Title>Card title</Card.Title>
          <Card.ButtonActions
            actions={
              <Card.DropdownActionsContent>
                <Card.DropdownActionsButton>
                  Button 1
                </Card.DropdownActionsButton>
                <Card.DropdownActionsButton>
                  Button 2
                </Card.DropdownActionsButton>
              </Card.DropdownActionsContent>
            }
          />
        </Card.Header>
        <Card.Body>
          <Text>Some content</Text>
        </Card.Body>
      </>
    ),
  },
};

export const WithFooter: Story = {
  render: Template,
  args: {
    children: (
      <>
        <Card.Header>
          <Card.Title>Card title</Card.Title>
        </Card.Header>
        <Card.Body>
          <Text>Some content</Text>
        </Card.Body>
        <Card.Footer>Footer</Card.Footer>
      </>
    ),
  },
};

export const WithDropdown: Story = {
  render: Template,
  args: {
    children: (
      <>
        <Card.Header>
          <Card.Title>Card title</Card.Title>
          <Card.ButtonActions
            actions={
              <Card.DropdownActionsContent>
                <Card.DropdownActionsButton
                  endElement={<Icon color="info" name="Check" size="large" />}
                >
                  Item value
                </Card.DropdownActionsButton>
                <Card.DropdownActionsButton
                  endElement={<Icon color="info" name="Check" size="large" />}
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </Card.DropdownActionsButton>
              </Card.DropdownActionsContent>
            }
          />
        </Card.Header>
        <Card.Body>
          <Text>Some content</Text>
        </Card.Body>
      </>
    ),
  },
};

export const All: Story = {
  render: Template,
  args: {
    children: (
      <>
        <Card.Header>
          <Card.Title startElement={<Icon name="Wifi" />}>
            Card title
          </Card.Title>
          <Card.ButtonActions
            actions={[
              <Dropdown.Button
                key={1}
                endElement={<Icon color="info" name="Check" size="large" />}
              >
                Item value
              </Dropdown.Button>,
              <Dropdown.Button
                key={2}
                endElement={<Icon color="info" name="Check" size="large" />}
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </Dropdown.Button>,
            ]}
          />
        </Card.Header>
        <Card.Body>
          <Text>Some content</Text>
        </Card.Body>
        <Card.Footer justifyContent="space-between">
          <div>text</div>
          <div>text</div>
          <div>text</div>
        </Card.Footer>
      </>
    ),
  },
};

export const WithoutBorder: Story = {
  render: Template,
  args: {
    children: (
      <>
        <Card.Header withBorder={false}>
          <Card.Title>Card title</Card.Title>
        </Card.Header>
        <Card.Body>
          <Text>Some content</Text>
        </Card.Body>
        <Card.Footer>footer</Card.Footer>
      </>
    ),
  },
};

export const WithLink: Story = {
  render: Template,
  args: {
    children: (
      <>
        <Card.Header>
          <Card.Title>title</Card.Title>

          <Card.ButtonActions
            actions={
              <Card.DropdownActionsContent>
                <Card.DropdownActionsButton
                  icon="Add"
                  onClick={ev => console.log(ev, 'action')}
                >
                  action
                </Card.DropdownActionsButton>
              </Card.DropdownActionsContent>
            }
            onClick={ev => ev.preventDefault()}
          />
        </Card.Header>
        <Card.Body>
          <Text>Some content</Text>
        </Card.Body>
        <Card.Footer>footer</Card.Footer>
      </>
    ),
  },
  decorators: [
    Story => (
      <Link to="/test" variant="bared">
        <Story />
      </Link>
    ),
    withRouter,
  ],
};
