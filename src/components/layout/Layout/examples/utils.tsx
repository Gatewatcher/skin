import type { ComponentProps } from 'react';

import {
  Section,
  drawerPersistence,
  useDrawer,
  useDrawerPersistence,
} from '@/skin/displays';
import Drawer from '@/skin/displays/Drawer';
import { Form, Input, SearchBar } from '@/skin/forms';
import { NavBar, NavigationItem, SideNav } from '@/skin/navigation';
import { ThemeSwitch } from '@/skin/navigation/Theme';

export const SIDENAV_ITEM_WIDTH = 60;

export const FakeDrawer = () => {
  return (
    <Drawer
      matches={{
        fakeDrawer: (
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Documentation</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body gap={8}>
              <Section>
                <Section.Header>
                  <Section.Title>Doc Section 1</Section.Title>
                </Section.Header>
                <Section.Body>Some doc</Section.Body>
              </Section>
              <Section>
                <Section.Header>
                  <Section.Title>Doc Section 2</Section.Title>
                </Section.Header>
                <Section.Body>Some doc</Section.Body>
              </Section>
              <Section>
                <Section.Header>
                  <Section.Title>Doc Section 3</Section.Title>
                </Section.Header>
                <Section.Body>Some doc</Section.Body>
              </Section>
              <Section>
                <Section.Header>
                  <Section.Title>Doc Section 4</Section.Title>
                </Section.Header>
                <Section.Body>Some doc</Section.Body>
              </Section>
            </Drawer.Body>
          </Drawer.Content>
        ),
      }}
    />
  );
};

export const FakeNavBar = () => {
  return (
    <NavBar
      endElement={
        <>
          <NavigationItem
            content={
              <NavigationItem.Group>
                <NavigationItem.Links>
                  <NavigationItem.Link to="/accounts/edit-profile">
                    Edit profile
                  </NavigationItem.Link>
                  <NavigationItem.Link to="/accounts/edit-password">
                    Change password
                  </NavigationItem.Link>
                </NavigationItem.Links>
              </NavigationItem.Group>
            }
          >
            <NavigationItem.Trigger icon="User">Admin</NavigationItem.Trigger>
          </NavigationItem>
          <ThemeSwitch />
        </>
      }
      startElement={<SearchBar withGrow />}
    />
  );
};

export const FakeSection = () => {
  const { encode } = useDrawerPersistence();
  const { open } = useDrawer('fakeDrawer', {
    encode,
    closeOn: drawerPersistence.closeEverywhere,
  });

  const handleClick = () => {
    open({});
  };

  return (
    <Section>
      <Section.Header>
        <Section.Title>Active</Section.Title>
        <Section.Button
          data-testid="open-drawer"
          onClick={handleClick}
          startIcon="ExternalLink"
        >
          Help
        </Section.Button>
      </Section.Header>

      <Section.Body>
        <Form.Field name="active_cti" valuePropName="checked">
          <Input.Switch endLabel="Enabled" />
        </Form.Field>
      </Section.Body>
    </Section>
  );
};

export const FakeList = () => {};

export const SIDENAV_ROUTES: ComponentProps<typeof SideNav.Link>[] = [
  { icon: 'GridMenu', children: 'Home', to: '/' },
  { icon: 'Overview', children: 'Overview', to: '/overview' },
  { icon: 'Network', children: 'Relations', to: '/relations' },
  { icon: 'WarningAlt', children: 'Alerts', to: '/alerts' },
  { icon: 'Target', children: 'Hunting', to: '/hunting' },
  { icon: 'Network2', children: 'Assets', to: '/assets' },
  { icon: 'Scan', children: 'GScan', to: '/gscan' },
];

export const FakeSideNav = () => {
  return (
    <SideNav>
      {SIDENAV_ROUTES.map(item => (
        <SideNav.Link key={item.icon} {...item} />
      ))}
    </SideNav>
  );
};
