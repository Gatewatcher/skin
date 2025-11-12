import type { Meta, StoryObj } from '@storybook/react';
import {
  reactRouterOutlets,
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-remix-react-router';

import { Button, LinkInternal } from '@/skin/actions';
import {
  useCurrentDrawer,
  useDrawerPersistence,
  useDrawerV2,
} from '@/skin/displays';
import { Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';

import Provider from '.';
import { DRAWER_KEEP_EVERYWHERE } from '../constants';

const Example = () => {
  const persistence = useDrawerPersistence();
  const currentDrawer = useCurrentDrawer();
  const drawer1 = useDrawerV2('drawer1', { ...persistence, closeOn: /.*/ });
  const drawer2 = useDrawerV2('drawer2', {
    ...persistence,
    closeOn: /\/close/,
  });
  const drawer3 = useDrawerV2<{ data: string }>('drawer3', {
    ...persistence,
    keepOn: DRAWER_KEEP_EVERYWHERE,
  });

  return (
    <Stack direction="column" gap={8} padding={8}>
      <Stack gap={6}>
        <LinkInternal to={{ pathname: '/' }}>Home</LinkInternal>
        <LinkInternal to={{ pathname: '/keep' }}>Keep</LinkInternal>
        <LinkInternal to={{ pathname: '/close' }}>Close</LinkInternal>
      </Stack>
      <Stack gap={6}>
        <Stack direction="column" gap={4}>
          <Button onClick={() => drawer1.open()}>
            Open 1 (close anywhere)
          </Button>
          <Button onClick={() => drawer2.open()}>
            Open 2 (close on /close)
          </Button>
          <Button onClick={() => drawer3.open({ data: 'Data for drawer3' })}>
            Open 3 (keep anywhere)
          </Button>
        </Stack>
        <Stack direction="column" gap={4}>
          <Button onClick={() => drawer1.close()} variant="outlined">
            Close 1
          </Button>
          <Button onClick={() => drawer2.close()} variant="outlined">
            Close 2
          </Button>
          <Button onClick={() => drawer3.close()} variant="outlined">
            Close 3
          </Button>
          <Button onClick={() => currentDrawer.close()} variant="outlined">
            Close any
          </Button>
        </Stack>
      </Stack>
      {currentDrawer.content}
    </Stack>
  );
};

const meta = {
  title: 'displays/panels/DrawerV2Provider',
  component: Provider,
  render: args => <Provider {...args} />,
  args: {
    children: <Example />,
    matches: {
      drawer1: 'Hello drawer1!',
      drawer2: <Text>Hello drawer2!</Text>,
      drawer3: ({ data }: { data: string }) => ({
        content: `Hello drawer3 ({ data: "${data}" })!`,
        enabled: true,
      }),
    },
  },
  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterOutlets([
        {
          path: '/',
          element: 'Home',
        },
        {
          path: '/keep',
          element: 'keep',
        },
        {
          path: '/close',
          element: 'close',
        },
      ]),
      location: {
        path: '/',
        searchParams: {
          drawer: 'drawer3',
          drawer_data: 'Data for drawer3',
        },
      },
    }),
  },
  decorators: [withRouter],
} satisfies Meta<typeof Provider>;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export default meta;
