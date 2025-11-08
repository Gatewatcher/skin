import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentProps, useState } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { Stack } from '@/skin/layout';
import { SideNav } from '@/skin/navigation';
import { Title } from '@/skin/typography';

import DrawerLayout from '.';

const SIDENAV_ROUTES: ComponentProps<typeof SideNav.Link>[] = [
  { icon: 'GridMenu', children: 'Home', to: '/' },
  { icon: 'Overview', children: 'Overview', to: '/overview' },
  { icon: 'Network', children: 'Relations', to: '/relations' },
  { icon: 'WarningAlt', children: 'Alerts', to: '/alerts' },
  { icon: 'Target', children: 'Hunting', to: '/hunting' },
  { icon: 'Network2', children: 'Assets', to: '/assets' },
  { icon: 'Scan', children: 'GScan', to: '/gscan' },
];

const meta = {
  title: 'displays/panels/DrawerV2PanelLayout',
  component: DrawerLayout,
  render: args => {
    const [showDrawer, setShowDrawer] = useState(true);

    return (
      <Stack>
        <MemoryRouter>
          <SideNav>
            {SIDENAV_ROUTES.map(item => (
              <SideNav.Link key={item.icon} {...item} />
            ))}
          </SideNav>
        </MemoryRouter>
        <DrawerLayout
          {...args}
          onCloseDrawer={() => setShowDrawer(false)}
          showDrawer={args.showDrawer ?? showDrawer}
        />
      </Stack>
    );
  },
  args: {
    containerStyle: {
      height: 900,
      maxWidth: '100%',
      minWidth: 400,
      overflow: 'hidden',
      resize: 'both',
      width: '100%',
    },
    contentPanelMinWidth: 900,
    drawerContent: (
      <div style={{ height: 1500, width: 1200, padding: 15 }}>
        <Title>Drawer content</Title>
        <DrawerLayout.Maximize />
        <DrawerLayout.Close />
      </div>
    ),
    drawerMaxWidth: undefined,
    drawerMinWidth: undefined,
    initialDrawerWidth: 800,
    mainContent: (
      <div style={{ height: 1500, width: 1200, padding: 15 }}>
        <Title>Main content</Title>
      </div>
    ),
  },
  parameters: {
    controls: {
      exclude: [
        'containerClassName',
        'containerStyle',
        'drawerContent',
        'mainContent',
      ],
    },
  },
} satisfies Meta<typeof DrawerLayout>;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const WithMinAndMax = {
  args: {
    drawerMaxWidth: '75%',
    drawerMinWidth: 600,
  },
} satisfies Story;

export default meta;
