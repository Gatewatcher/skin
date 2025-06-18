import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import type { ButtonActionsProps } from '.';
import ButtonActions from '.';

type Story = StoryObj<typeof ButtonActions>;

export default {
  title: 'actions/buttons/ButtonActions',
  component: ButtonActions,
} as Meta<typeof ButtonActions>;

const Template: StoryFn<typeof ButtonActions> = (args: ButtonActionsProps) => (
  <ButtonActions {...args} />
);

export const Default: Story = {
  render: Template,
  args: {
    actions: (
      <ButtonActions.Actions>
        <ButtonActions.Button onClick={() => console.log('action1')}>
          Action 1
        </ButtonActions.Button>
        <ButtonActions.Button>Another Action</ButtonActions.Button>
      </ButtonActions.Actions>
    ),
    children: 'actions',
    startIcon: 'MaintenanceTools',
  },
};

export const WithLinks: Story = {
  render: Template,
  args: {
    actions: (
      <ButtonActions.Actions>
        <ButtonActions.Button onClick={() => console.log('action1')}>
          Action 1
        </ButtonActions.Button>
        <ButtonActions.Button>Another Action</ButtonActions.Button>
        <ButtonActions.Link icon="ExternalLink" to="https://www.google.com">
          Link to google
        </ButtonActions.Link>
      </ButtonActions.Actions>
    ),
    children: 'actions',
    startIcon: 'MaintenanceTools',
  },
};

export const SmallSize: Story = {
  render: Template,
  args: {
    actions: (
      <ButtonActions.Actions>
        <ButtonActions.Button
          onClick={() => console.log('action1')}
          size="small"
        >
          Action 1
        </ButtonActions.Button>
        <ButtonActions.Button size="small">Another Action</ButtonActions.Button>
        <ButtonActions.Link
          icon="ExternalLink"
          size="small"
          to="https://www.google.com"
        >
          Link to google
        </ButtonActions.Link>
      </ButtonActions.Actions>
    ),
    children: 'actions',
    startIcon: 'MaintenanceTools',
  },
};
