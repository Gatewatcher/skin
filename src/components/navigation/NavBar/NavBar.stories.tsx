import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-remix-react-router';

import { Layout as SkinLayout } from '@/skin/layout';
import { Text } from '@/skin/typography';

import NavBar from '.';
import NavigationItem from '../NavigationItem';

type Story = StoryObj<typeof NavBar>;

export default {
  title: 'navigation/NavBar',
  component: NavBar,
  decorators: [withRouter],
  args: {
    endElement: (
      <>
        <NavigationItem
          content={
            <NavigationItem.Grid>
              <NavigationItem.Group>
                <NavigationItem.Header color="turquoise" icon="Tag">
                  Monitoring
                </NavigationItem.Header>

                <NavigationItem.Links>
                  <NavigationItem.Link to="/">Lien 1</NavigationItem.Link>
                  <NavigationItem.Link to="/">Lien 2</NavigationItem.Link>
                </NavigationItem.Links>
              </NavigationItem.Group>
            </NavigationItem.Grid>
          }
        >
          <NavigationItem.Trigger icon="Health">Health</NavigationItem.Trigger>
        </NavigationItem>

        <NavigationItem
          content={
            <NavigationItem.Grid>
              <NavigationItem.Group>
                <NavigationItem.Header color="turquoise" icon="Tag">
                  Monitoring
                </NavigationItem.Header>

                <NavigationItem.Links>
                  <NavigationItem.Link to="/">Lien 1</NavigationItem.Link>
                  <NavigationItem.Link to="/">Lien 2</NavigationItem.Link>
                </NavigationItem.Links>
              </NavigationItem.Group>
            </NavigationItem.Grid>
          }
        >
          <NavigationItem.Trigger icon="Health">Health</NavigationItem.Trigger>
        </NavigationItem>

        <Text>Theme Toggle</Text>

        <NavigationItem
          content={
            <>
              <NavigationItem.AvatarDropdownLink icon="User" to="/">
                Profile
              </NavigationItem.AvatarDropdownLink>
              <NavigationItem.AvatarDropdownLink icon="Settings" to="/">
                Settings
              </NavigationItem.AvatarDropdownLink>
              <NavigationItem.AvatarDropdownButton icon="Logout">
                Logout
              </NavigationItem.AvatarDropdownButton>
            </>
          }
          padding={10}
          placement="bottom-end"
        >
          <NavigationItem.Avatar username="john" />
        </NavigationItem>
      </>
    ),
    startElement: <input placeholder="Press / to seatch" type="text" />,
  },
} as Meta<typeof NavBar>;

export const Default: Story = {
  args: {},
};

export const Layout: Story = {
  render: args => (
    <SkinLayout topNav={<NavBar {...args} />}>
      <SkinLayout.Row>
        <Text>inside</Text>
      </SkinLayout.Row>
    </SkinLayout>
  ),
};

export const WithLongNavigationElements: Story = {
  args: {
    endElement: (
      <>
        <NavigationItem content="">
          <NavigationItem.Trigger icon="Health">
            Long navigation trigger
          </NavigationItem.Trigger>
        </NavigationItem>

        <NavigationItem content="">
          <NavigationItem.Trigger icon="Health">
            Another long navigation trigger
          </NavigationItem.Trigger>
        </NavigationItem>

        <NavigationItem content="">
          <NavigationItem.Trigger icon="Health">
            Navigation trigger that is a bit too long
          </NavigationItem.Trigger>
        </NavigationItem>

        <NavigationItem content="">
          <NavigationItem.Trigger icon="Health">
            Navigation trigger
          </NavigationItem.Trigger>
        </NavigationItem>

        <NavigationItem content="">
          <NavigationItem.Trigger icon="Health">
            Navigation trigger
          </NavigationItem.Trigger>
        </NavigationItem>

        <NavigationItem content="">
          <NavigationItem.Trigger icon="Health">
            Navigation trigger
          </NavigationItem.Trigger>
        </NavigationItem>

        <Text>Theme Toggle</Text>
      </>
    ),
  },
};

export const WithoutStartElement: Story = {
  args: {
    startElement: null,
  },
};
