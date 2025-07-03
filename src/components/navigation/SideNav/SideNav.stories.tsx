import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-remix-react-router';

import { Layout as SkinLayout } from '@/skin/layout';

import SideNav from '.';

type Story = StoryObj<typeof SideNav>;

export default {
  title: 'navigation/SideNav',
  component: SideNav,
  args: {
    children: (
      <>
        <SideNav.Link icon="GridMenu" to="/">
          Home
        </SideNav.Link>
        <SideNav.Link icon="File" to="/knowledge">
          Knowledge Base
        </SideNav.Link>
        <SideNav.Link icon="Overview" to="/overview">
          Overview
        </SideNav.Link>
        <SideNav.Link icon="Network" to="/network">
          Relations
        </SideNav.Link>
        <SideNav.Link icon="WarningAlt" to="/alerts">
          Alerts
        </SideNav.Link>
        <SideNav.Link icon="Target" to="/target">
          Hunting
        </SideNav.Link>
        <SideNav.Link icon="Network2" to="/assets">
          Assets
        </SideNav.Link>
        <SideNav.Link icon="Users" to="/users">
          Users
        </SideNav.Link>
        <SideNav.Link icon="Scan" to="/scan">
          GScan
        </SideNav.Link>
      </>
    ),
    header: <SideNav.Header>Header</SideNav.Header>,
    footer: (
      <SideNav.Footer>
        <SideNav.Item
          content={
            <>
              <SideNav.ItemLink icon="View" to="/">
                View detail
              </SideNav.ItemLink>
              <SideNav.ItemLink icon="Settings" to="/">
                Settings
              </SideNav.ItemLink>
              <SideNav.ItemLink icon="Close" to="/">
                Disconnect
              </SideNav.ItemLink>
            </>
          }
        >
          <SideNav.Avatar username="El famoso" />
        </SideNav.Item>
      </SideNav.Footer>
    ),
  },
  decorators: [withRouter],
} as Meta<typeof SideNav>;

export const Default: Story = {
  args: {},
};

export const Layout: Story = {
  render: ({ children, ...args }) => (
    <SkinLayout sideNav={<SideNav {...args}>{children}</SideNav>}>
      <SkinLayout.Row>inside</SkinLayout.Row>
    </SkinLayout>
  ),
};
