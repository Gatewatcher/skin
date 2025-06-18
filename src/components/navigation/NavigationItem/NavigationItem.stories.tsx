import type { Meta, StoryObj } from '@storybook/react';
import {
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-react-router-v6';

import NavigationItem from '.';

type Story = StoryObj<typeof NavigationItem>;

export default {
  title: 'navigation/NavigationItem',
  component: NavigationItem,
  decorators: [
    Story => (
      <div
        style={{
          height: 100,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Story />
      </div>
    ),
    withRouter,
  ],
  parameters: {
    reactRouter: reactRouterParameters({
      location: { path: '/active' },
      routing: { path: '/active' },
    }),
  },
} as Meta<typeof NavigationItem>;

export const Default: Story = {
  args: {
    children: (
      <NavigationItem.Trigger icon="Tower">Trigger</NavigationItem.Trigger>
    ),
    content: (
      <NavigationItem.Grid>
        <NavigationItem.Group>
          <NavigationItem.Header color="turquoise" icon="Tag">
            Monitoring engine
          </NavigationItem.Header>

          <NavigationItem.Links>
            <NavigationItem.Link to="/">Lien 1</NavigationItem.Link>
            <NavigationItem.Link to="/active">Lien 2</NavigationItem.Link>
          </NavigationItem.Links>
        </NavigationItem.Group>

        <NavigationItem.Group>
          <NavigationItem.Header color="red" icon="Tag">
            IDS rules manager
          </NavigationItem.Header>

          <NavigationItem.Links>
            <NavigationItem.Link to="/">Lien 1</NavigationItem.Link>
            <NavigationItem.Link to="/">Lien 2</NavigationItem.Link>
            <NavigationItem.Link to="/">Lien 3</NavigationItem.Link>
          </NavigationItem.Links>
        </NavigationItem.Group>
        <NavigationItem.Group>
          <NavigationItem.Header color="orange" icon="Tag">
            Assets and users detection
          </NavigationItem.Header>

          <NavigationItem.Links>
            <NavigationItem.Link to="/">Lien 1</NavigationItem.Link>
          </NavigationItem.Links>
        </NavigationItem.Group>

        <NavigationItem.Group>
          <NavigationItem.Header color="pink" icon="Tag">
            Malware
          </NavigationItem.Header>

          <NavigationItem.Links>
            <NavigationItem.Link to="/">Lien 1</NavigationItem.Link>
            <NavigationItem.Link to="/">Lien 2</NavigationItem.Link>
          </NavigationItem.Links>
        </NavigationItem.Group>
      </NavigationItem.Grid>
    ),
  },
};

export const WithoutCloseOnLinkClick: Story = {
  args: {
    children: (
      <NavigationItem.Trigger icon="Tower">Trigger</NavigationItem.Trigger>
    ),
    content: (
      <NavigationItem.Grid>
        <NavigationItem.Group>
          <NavigationItem.Header color="turquoise" icon="Tag">
            Monitoring engine
          </NavigationItem.Header>
          <NavigationItem.Links>
            <NavigationItem.Link closeNavOnClick={false} to="/">
              Lien 1
            </NavigationItem.Link>
          </NavigationItem.Links>
        </NavigationItem.Group>
      </NavigationItem.Grid>
    ),
  },
};

export const MinWidthFit: Story = {
  args: {
    children: (
      <NavigationItem.Trigger icon="Tower">
        community_admin@test.com
      </NavigationItem.Trigger>
    ),
    content: (
      <NavigationItem.Group>
        <NavigationItem.Links>
          <NavigationItem.Link to="/">item</NavigationItem.Link>
        </NavigationItem.Links>
      </NavigationItem.Group>
    ),
  },
};
