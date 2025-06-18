import { Layout } from '@/skin/layout';

import Drawer from '..';
import { Card, drawerPersistence } from '../..';
import { useDrawerPersistence } from '../../panels/DrawerV2';
import { useDrawer } from '../hooks/useDrawer';

export type DrawerTestProps = {
  id: string;
};

export const DrawerTest = ({ id }: DrawerTestProps) => {
  return (
    <Drawer.Content>
      <Drawer.Header>
        <Drawer.Title>test</Drawer.Title>
        <Drawer.Actions>
          <Drawer.Close />
        </Drawer.Actions>
      </Drawer.Header>

      <Drawer.Body>{id}</Drawer.Body>
    </Drawer.Content>
  );
};

const useTestDrawer = () => {
  const { encode, clean } = useDrawerPersistence();

  return useDrawer<DrawerTestProps>('test', {
    closeOn: drawerPersistence.closeEverywhere,
    encode,
    clean: () => {
      console.log('clean');
      clean();
    },
  });
};

const Action = () => {
  const drawer = useTestDrawer();

  return (
    <Card.DropdownActionsButton
      onClick={() => {
        drawer.open({ id: 'id' });
      }}
    >
      open
    </Card.DropdownActionsButton>
  );
};

export const Test = () => {
  return (
    <Layout
      drawer={
        <Drawer
          matches={{
            test: (props: DrawerTestProps) => <DrawerTest {...props} />,
          }}
        />
      }
    >
      <Layout.Row>
        <Card>
          <Card.Header>
            <div>header</div>

            <Card.ButtonActions
              actions={
                <Card.DropdownActionsContent>
                  <Action />
                </Card.DropdownActionsContent>
              }
            />
          </Card.Header>

          <Card.Body>body</Card.Body>
        </Card>
      </Layout.Row>
    </Layout>
  );
};
