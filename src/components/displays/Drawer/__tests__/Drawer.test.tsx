import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Outlet, Route, Routes } from 'react-router-dom';

import { LinkInternal } from '@/skin/actions';
import { renderWithRouter } from '@/tests';

import type { DrawerProps } from '..';
import Drawer from '..';
import { drawerPersistence } from '../..';
import Panels from '../../Panels';
import { useDrawer } from '../hooks/useDrawer';
import DrawerProvider from '../provider';

describe('Drawer', () => {
  const TEST_ID: TestId = 'test-drawer';

  const user = userEvent.setup();
  const header = 'header';
  const body = 'body';

  const CustomDrawer = (props: Partial<DrawerProps>) => {
    const { open, close } = useDrawer<{ key: string }>('test', {
      closeOn: drawerPersistence.closeEverywhere,
    });

    const Open = () => (
      <button data-testid="open" onClick={() => open({ key: 'value' })}>
        Open
      </button>
    );
    const Close = () => (
      <button data-testid="close" onClick={close}>
        Close
      </button>
    );

    return (
      <div>
        <Drawer
          matches={{
            test: (
              <>
                <Drawer.Header data-testid="header">
                  <Drawer.Title data-testid="title">header</Drawer.Title>
                  <Drawer.Actions data-testid="actions">
                    <Drawer.Close data-testid="close-drawer" />
                  </Drawer.Actions>
                </Drawer.Header>
                <Drawer.Body data-testid="body">body</Drawer.Body>
                <Drawer.Footer data-testid="footer">footer</Drawer.Footer>
              </>
            ),
          }}
          data-testid={TEST_ID}
          {...props}
        />

        <Open />
        <Close />
      </div>
    );
  };

  const renderComponent = (props: Partial<DrawerProps> = {}) =>
    renderWithRouter(
      <DrawerProvider>
        <Panels.Group direction="horizontal">
          <CustomDrawer {...props} />
        </Panels.Group>
      </DrawerProvider>,
    );

  const openDrawer = async () => {
    const btn = await screen.findByTestId('open');
    await user.click(btn);
  };

  it('should render with header and content', async () => {
    renderComponent();

    await openDrawer();

    await expectToBeVisibleInTheDocument(TEST_ID);
    await expectToBeVisibleInTheDocument(header, screen.findByText);
    await expectToBeVisibleInTheDocument(body, screen.findByText);
  });

  it('should toggle drawer when clicked on close button', async () => {
    renderComponent();
    await openDrawer();

    await expectToBeVisibleInTheDocument(TEST_ID);
    await user.click(screen.getByTestId('close-drawer'));
    await expectNotToBeVisibleInTheDocument(TEST_ID);
  });

  it('should render compounds', async () => {
    renderComponent();
    await openDrawer();

    await expectToBeVisibleInTheDocument('header');
    await expectToBeVisibleInTheDocument('title');
    await expectToBeVisibleInTheDocument('actions');
    await expectToBeVisibleInTheDocument('close');
    await expectToBeVisibleInTheDocument('body');
    await expectToBeVisibleInTheDocument('footer');
  });

  it('should close on esc press', async () => {
    renderComponent();
    await openDrawer();
    await user.keyboard('{Escape}');

    await expectNotToBeVisibleInTheDocument('header');
  });

  it('should not close on esc press', async () => {
    renderComponent({ withEscape: false });
    await openDrawer();
    await user.keyboard('{Escape}');

    await expectToBeVisibleInTheDocument('header');
  });

  it('should works with closeOn options', async () => {
    const DrawerComponent = () => {
      const { open } = useDrawer('test', {
        closeOn: /^\/demo/,
      });

      const Open = () => (
        <button data-testid="open" onClick={() => open()}>
          Open
        </button>
      );

      return (
        <>
          <Outlet />
          <Open />

          <LinkInternal to="/settings">To settings</LinkInternal>
          <LinkInternal to="/users">To users</LinkInternal>
          <LinkInternal to="/demo">To demo</LinkInternal>
          <LinkInternal to="/demonstration">To demonstration</LinkInternal>

          <Drawer
            matches={{
              test: (
                <Drawer.Content>
                  <Drawer.Header data-testid="header">
                    <Drawer.Title data-testid="title">header</Drawer.Title>
                    <Drawer.Actions data-testid="actions">
                      <Drawer.Close data-testid="close-drawer" />
                    </Drawer.Actions>
                  </Drawer.Header>
                  <Drawer.Body data-testid="body">body</Drawer.Body>
                  <Drawer.Footer data-testid="footer">footer</Drawer.Footer>
                </Drawer.Content>
              ),
            }}
            data-testid={TEST_ID}
          />
        </>
      );
    };

    renderWithRouter(
      <DrawerProvider>
        <Panels.Group direction="horizontal">
          <Routes>
            <Route element={<DrawerComponent />} path="/">
              <Route element="settings route" path="/settings" />
              <Route element="users route" path="/users" />
              <Route element="demo route" path="/demo" />
              <Route element="demonstration route" path="/demonstration" />
            </Route>
          </Routes>
        </Panels.Group>
      </DrawerProvider>,
      { initialEntries: ['/settings'] },
    );

    await expectToBeVisibleInTheDocument('settings route', screen.findByText);
    await openDrawer();

    await expectToBeVisibleInTheDocument(TEST_ID);

    await user.click(await screen.findByText('To users'));
    await expectToBeVisibleInTheDocument('users route', screen.findByText);

    await expectToBeVisibleInTheDocument(TEST_ID);

    await user.click(await screen.findByText('To demo'));
    await expectToBeVisibleInTheDocument('demo route', screen.findByText);

    await expectNotToBeVisibleInTheDocument(TEST_ID);
  });
});
