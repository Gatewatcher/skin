import { faker } from '@faker-js/faker/locale/fr';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

import { Button } from '@/skin/actions';
import { Chip, Icon } from '@/skin/displays';
import { Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';
import { addElevations, addInlineRadio } from '@/storybook';

import type { DropdownProps } from '.';
import Dropdown from '.';
import { DEFAULT_VALUES, DURATIONS } from '../Floating/constants';
import { DEFAULT_DELAY } from './constants';

faker.seed(10);

const FakeAvatar = () => (
  <div
    style={{
      backgroundColor: faker.color.rgb(),
      borderRadius: '50%',
      color: 'white',
      fontSize: 'var(--font-size-extra-small)',
      height: 24,
      lineHeight: '24px',
      textAlign: 'center',
      verticalAlign: 'middle',
      width: 24,
    }}
  >
    GW
  </div>
);

type Story = StoryObj<typeof Dropdown>;

export default {
  title: 'displays/floating/Dropdown',
  component: Dropdown,
  args: {
    content: (
      <Dropdown.Content>
        <Text>Some dropdown content</Text>
      </Dropdown.Content>
    ),
    children: <Button>Trigger</Button>,
    ...DEFAULT_VALUES,
    placement: 'bottom-start',
    delay: DEFAULT_DELAY,
  },
  argTypes: {
    ...addElevations(),
    ...addInlineRadio<DropdownProps>('duration', DURATIONS),
    withBorder: {
      control: 'boolean',
      if: { arg: 'elevation', truthy: false },
    },
  },
  decorators: [
    Story => (
      <div
        style={{
          height: 400,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Dropdown>;

const Template: StoryFn<typeof Dropdown> = ({
  children,
  ...args
}: DropdownProps) => <Dropdown {...args}>{children}</Dropdown>;

export const Default: Story = {
  render: Template,
  args: {
    content: (
      <Dropdown.Content>
        <Dropdown.Button data-testid="dropdown-item-1">
          Button value
        </Dropdown.Button>
        <Dropdown.Button startElement={<Icon name="Devices" size="large" />}>
          Button value
        </Dropdown.Button>
        <Dropdown.Button
          endElement={<Icon color="info" name="Check" size="large" />}
        >
          Button value
        </Dropdown.Button>
        <Dropdown.Button
          endElement={<Icon color="info" name="Check" size="large" />}
          startElement={<Icon name="Devices" size="large" />}
        >
          Button value
        </Dropdown.Button>
        <Dropdown.Button
          endElement={<Icon color="info" name="Check" size="large" />}
          startElement={<FakeAvatar />}
        >
          <Stack gap={7}>
            Button value
            <Chip size="small" type="info">
              Chip
            </Chip>
          </Stack>
        </Dropdown.Button>
      </Dropdown.Content>
    ),
  },
};

export const WithLinks: Story = {
  render: Template,
  args: {
    content: (
      <Dropdown.Content>
        <Dropdown.Link
          to={{
            pathname: './',
            search: 'path=/story/displays-floating-dropdown--default',
          }}
        >
          Internal
        </Dropdown.Link>
        <Dropdown.Link to="https://www.google.com">Google</Dropdown.Link>
      </Dropdown.Content>
    ),
  },
  decorators: [withRouter],
};

export const Mix: Story = {
  render: Template,
  args: {
    content: (
      <Dropdown.Content>
        <Dropdown.Button>Button value</Dropdown.Button>
        <Dropdown.Button startElement={<Icon name="Devices" size="large" />}>
          Button value
        </Dropdown.Button>
        <Dropdown.Link to="https://www.google.com">link</Dropdown.Link>
        <Dropdown.Button
          endElement={<Icon color="info" name="Check" size="large" />}
          startElement={<FakeAvatar />}
        >
          <Stack gap={7}>
            Button value
            <Chip size="small" type="info">
              Chip
            </Chip>
          </Stack>
        </Dropdown.Button>
        <Dropdown.Button
          endElement={<Icon color="info" name="Check" size="large" />}
        >
          Button value
        </Dropdown.Button>
      </Dropdown.Content>
    ),
  },
  decorators: [withRouter],
};

export const Group: Story = {
  render: Template,
  args: {
    content: (
      <Dropdown.Content>
        <Dropdown.Group>
          <Dropdown.Button>Acknowledge</Dropdown.Button>
        </Dropdown.Group>
        <Dropdown.Group>
          <Dropdown.Button>Button 1</Dropdown.Button>
          <Dropdown.Button>Button 2</Dropdown.Button>
        </Dropdown.Group>
        <Dropdown.Group>
          <Dropdown.Button>Some action in group 2</Dropdown.Button>
          <Dropdown.Button>Some action in group 2</Dropdown.Button>
        </Dropdown.Group>
      </Dropdown.Content>
    ),
  },
};

export const Types: Story = {
  render: Template,
  args: {
    content: (
      <Dropdown.Content>
        <Dropdown.Button
          startElement={<Icon color="danger" name="Delete" />}
          type="danger"
        >
          Delete
        </Dropdown.Button>
        <Dropdown.Button
          startElement={<Icon color="warning" name="Warning" />}
          type="warning"
        >
          Warning
        </Dropdown.Button>
        <Dropdown.Button
          startElement={<Icon color="info" name="Phone" />}
          type="info"
        >
          Info
        </Dropdown.Button>
      </Dropdown.Content>
    ),
  },
};

export const WithManyItems: Story = {
  render: Template,
  args: {
    content: (
      <Dropdown.Content>
        {faker.helpers
          .multiple(() => faker.lorem.words(2), { count: 100 })
          .map(words => (
            <Dropdown.Button key={words}>{words}</Dropdown.Button>
          ))}
      </Dropdown.Content>
    ),
  },
};

export const MinWidthFit: Story = {
  render: Template,
  args: {
    minWidth: 'fit',
    content: (
      <Dropdown.Content>
        <Dropdown.Button>item</Dropdown.Button>
      </Dropdown.Content>
    ),
    children: (
      <Button>very long text button with dropdown that fit min width</Button>
    ),
  },
};
