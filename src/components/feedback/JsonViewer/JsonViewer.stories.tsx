import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '@/skin/actions';
import { Input } from '@/skin/forms';
import { Stack } from '@/skin/layout';

import type { JsonViewerProps } from '.';
import JsonViewer from '.';
import Toastr from '../Toastr';

const data = {
  emptyArray: [],
  label: 'value',
  user: {
    fullname: 'John doe',
    address: {
      city: 'Paris',
      appartment: false,
    },
    roles: ['admin', 'operator'],
  },
  arrayOfNumbers: [1],
  arrayOfStrings: [
    'LoremsdlkfjoisdjfkljsdfoielkdsfkljweoiLoremsdlkfjoisdjfkljsdfoielkdsfkljweoiLoremsdlkfjoisdjfkljsdfoielkdsfkljweoiLoremsdlkfjoisdjfkljsdfoielkdsfkljweoiLoremsdlkfjoisdjfkljsdfoielkdsfkljweoiLoremsdlkfjoisdjfkljsdfoielkdsfkljweoiLoremsdlkfjoisdjfkljsdfoielkdsfkljweoiLoremsdlkfjoisdjfkljsdfoielkdsfkljweoi',
    'Ipsum',
    'dolor',
    'sit amet',
  ],
  arrayOfObjects: [
    { label: 'first value', value: 'first value' },
    { label: 'second value', value: 'second value' },
  ],
  link: 'https://www.google.com',
  number: 1,
  boolean: false,
  nullValue: null,
};

type Story = StoryObj<typeof JsonViewer>;

export default {
  title: 'feedback/JsonViewer',
  component: JsonViewer,
  args: {
    withJmesPathDragging: false,
    data,
  },
  decorators: [
    Story => (
      <Toastr>
        <Story />
      </Toastr>
    ),
  ],
} as Meta<typeof JsonViewer>;

const Template: StoryFn<typeof JsonViewer> = (args: JsonViewerProps) => (
  <JsonViewer {...args} />
);

export const Default: Story = {
  render: Template,
};

export const Incident: Story = {
  render: Template,
  args: {
    data: {
      id: 40,
      name: 'incident_5_of_gcap_1.test.com_assigned_to_group_1_a_and_group_1_b_soc@test.com',
      updated_at: '2023-12-21T09:46:35.250282Z',
      aggregation_strategy: '',
      aggregation_value: '',
      risk: 100,
      status: 'PENDING',
      type: 'NETWORK',
      communication_type: 'INTERN_TO_INTERN',
      signature: 'signature_5_of_gcap_1.test.com',
      assignees: [
        {
          id: 48,
          full_name: 'group_1_a_and_group_1_b_soc@test.com',
          email: 'group_1_a_and_group_1_b_soc@test.com',
        },
      ],
      alert_counter: {
        total_count: 3,
        open_count: 2,
      },
      gcaps: [
        {
          id: 1,
          fqdn: 'gcap_1.test.com',
          gcenter: {
            id: 1,
            name: 'gcenter_for_group_1_a',
          },
        },
      ],
      group: {
        id: 1,
        name: 'group_1_a',
        organisation: {
          id: 1,
          name: 'organisation_1',
        },
      },
    },
  },
};

export const Sort: Story = {
  args: {
    sort: (a, b) => a.localeCompare(b),
  },
};

export const WithControl: Story = {
  render: props => {
    const [forceState, setForceState] = useState<'expanded' | 'collapsed'>();

    const handleExpandClick = () => {
      setForceState('expanded');
    };

    const handleNodeClick = () => {
      setForceState(undefined);
    };

    return (
      <Stack direction="column">
        <Stack>
          <Button onClick={handleExpandClick}>Expand</Button>
          <Button onClick={() => setForceState('collapsed')}>Collapse</Button>
        </Stack>
        <Template
          {...props}
          forceToState={forceState}
          onNodeClick={handleNodeClick}
        />
      </Stack>
    );
  },
};

export const WithJmesPathDragging: Story = {
  render: Template,
  args: {
    withJmesPathDragging: true,
  },
  decorators: [
    Story => (
      <Stack direction="column" gap={6}>
        <Input.Text
          onDrop={({ target }) => {
            if (target instanceof HTMLInputElement) {
              requestAnimationFrame(() => {
                target.setSelectionRange(
                  target.value.length,
                  target.value.length,
                );
              });
            }
          }}
          placeholder="Drop here"
          spellCheck={false}
        />
        <Story />
      </Stack>
    ),
  ],
};
WithJmesPathDragging.storyName = 'With JMESPath Dragging';
