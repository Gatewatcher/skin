import type { Meta, StoryObj } from '@storybook/react';

import { Stack } from '@/skin/layout';
import { Title } from '@/skin/typography';

import SidePanel from '.';

const meta = {
  title: 'displays/panels/SidePanelLayout',
  component: SidePanel.Layout,
  render: args => <SidePanel.Layout {...args} />,
  args: {
    children: (
      <>
        <SidePanel.Panel width={500}>
          <SidePanel.Content>
            <SidePanel.Header>
              <SidePanel.Title>Side panel</SidePanel.Title>
            </SidePanel.Header>
            <SidePanel.Body>
              <SidePanel.Title>Body</SidePanel.Title>
            </SidePanel.Body>
            <SidePanel.Footer>
              <SidePanel.Title>Footer</SidePanel.Title>
            </SidePanel.Footer>
          </SidePanel.Content>
        </SidePanel.Panel>
        <Stack direction="column" margin={8}>
          <Title>Some content</Title>
        </Stack>
      </>
    ),
    style: {
      resize: 'both',
      height: 1000,
    },
  },
} satisfies Meta<typeof SidePanel.Layout>;

type Story = StoryObj<typeof SidePanel.Layout>;

export const Default = {} satisfies Story;

export default meta;
