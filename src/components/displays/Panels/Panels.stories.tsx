import type { Meta, StoryObj } from '@storybook/react';

import Panels from '.';

type Story = StoryObj<typeof Panels>;

export default {
  title: 'displays/Panels',
  decorators: [
    () => (
      <Panels>
        <Panels.Group direction="horizontal">
          <Panels.Item
            collapsible={true}
            data-testid="left"
            defaultSize={20}
            order={1}
          >
            Panel Item Left
          </Panels.Item>
          <Panels.ResizeHandle id="left-handle" />
          <Panels.Item data-testid="middle" defaultSize={60} order={2}>
            Panel Item Middle
          </Panels.Item>
          <Panels.ResizeHandle id="right-handle" />
          <Panels.Item
            collapsible={true}
            data-testid="right"
            defaultSize={20}
            order={3}
          >
            Panel Item Right
          </Panels.Item>
        </Panels.Group>
      </Panels>
    ),
  ],
  component: Panels,
} as Meta<typeof Panels>;

export const Default: Story = {};
