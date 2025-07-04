import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-remix-react-router';

import { Button } from '@/skin/actions';
import { Toastr } from '@/skin/feedback';

import type { FloatingActionsProps } from '.';
import FloatingActions from '.';

type Story = StoryObj<typeof FloatingActions>;

export default {
  title: 'actions/FloatingActions',
  component: FloatingActions,
  args: {
    content: (
      <FloatingActions.Content>
        <FloatingActions.Actions>
          <FloatingActions.Button icon="Edit" label="label" />
          <FloatingActions.Button icon="Delete" label="Delete" type="danger" />
          <FloatingActions.CopyToClipboard clipText="Lorem ipsum" />
        </FloatingActions.Actions>
      </FloatingActions.Content>
    ),
    children: <Button variant="ghosted">cell</Button>,
  },
  decorators: [
    Story => (
      <Toastr>
        <Story />
      </Toastr>
    ),
  ],
} as Meta<typeof FloatingActions>;

const Template: StoryFn<typeof FloatingActions> = (
  args: FloatingActionsProps,
) => <FloatingActions {...args} />;

export const Default: Story = {
  render: Template,
};

export const WithPropagationOnChildren: Story = {
  render: Template,
  args: {
    withStopPropagation: false,
    triggerOn: 'hover',
  },
};

export const WithHeader: Story = {
  render: Template,
  args: {
    content: (
      <FloatingActions.Content>
        <FloatingActions.Header>some content</FloatingActions.Header>
        <FloatingActions.Actions>
          <FloatingActions.Button icon="Edit" label="Edit" />
          <FloatingActions.Button icon="Delete" label="Delete" type="danger" />
          <FloatingActions.CopyToClipboard clipText="Lorem ipsum" />
        </FloatingActions.Actions>
      </FloatingActions.Content>
    ),
  },
};

export const WithLink: Story = {
  render: Template,
  args: {
    content: (
      <FloatingActions.Content>
        <FloatingActions.Actions>
          <FloatingActions.Button icon="Edit" />
          <FloatingActions.Button icon="Delete" type="danger" />
          <FloatingActions.Link to="/link" />
        </FloatingActions.Actions>
      </FloatingActions.Content>
    ),
  },
  decorators: [withRouter],
};

export const OnlyOneAction: Story = {
  render: Template,
  args: {
    content: (
      <FloatingActions.Content>
        <FloatingActions.Actions>
          <FloatingActions.Button icon="Edit" label="edit" />
        </FloatingActions.Actions>
      </FloatingActions.Content>
    ),
  },
  decorators: [withRouter],
};
