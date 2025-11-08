import { screen } from '@testing-library/react';

import {
  expectDrawerToBeClosed,
  expectDrawerToBeOpened,
  renderComponent,
} from './utils';

describe('DrawerV2', () => {
  describe('Provider', () => {
    it('should open drawer1', async () => {
      const { openDrawer } = renderComponent('drawer1');
      await openDrawer('drawer1');
      expectDrawerToBeOpened('drawer1', 'Drawer 1');
    });

    it('should initially open drawer1 with URL', async () => {
      renderComponent('drawer1', {
        routerOptions: { initialEntries: ['/?drawer=drawer1'] },
      });
      expectDrawerToBeOpened('drawer1', 'Drawer 1');
    });

    it('should open drawer2', async () => {
      const { openDrawer } = renderComponent('drawer2');
      await openDrawer('drawer2');
      expectDrawerToBeOpened('drawer2', 'Drawer 2');
    });

    it('should open drawer3', async () => {
      const { openDrawer } = renderComponent('drawer3');
      await openDrawer('drawer3');
      expectDrawerToBeOpened('drawer3', 'Drawer 3');
    });

    it('should open drawer4 with props', async () => {
      const { openDrawer } = renderComponent('drawer4', {
        props: { test: 'foo' },
      });
      await openDrawer('drawer4');
      expectDrawerToBeOpened('drawer4', 'Drawer 4 foo');
    });

    it('should initially open drawer4 with URL and props', async () => {
      renderComponent('drawer4', {
        routerOptions: {
          initialEntries: ['/?drawer=drawer4&drawer_test=foo'],
        },
      });
      expectDrawerToBeOpened('drawer4', 'Drawer 4 foo');
    });

    it('should not open drawer5 as it is disabled', async () => {
      const { openDrawer } = renderComponent('drawer5');
      await openDrawer('drawer5');
      await expectDrawerToBeClosed();
    });

    it("should not open drawer1000 as it doesn't exist", async () => {
      const { openDrawer } = renderComponent('drawer1000');
      await openDrawer('drawer1000');
      await expectDrawerToBeClosed();
    });

    it('should close a specific drawer', async () => {
      const { openDrawer, user } = renderComponent('drawer1');
      await openDrawer('drawer1');
      await user.click(screen.getByTestId('hook-close-drawer1'));
      await expectDrawerToBeClosed();
    });

    it('should close the current drawer (provider)', async () => {
      const { openDrawer, user } = renderComponent('drawer1');
      await openDrawer('drawer1');
      await user.click(screen.getByTestId('provider-close-current'));
      await expectDrawerToBeClosed();
    });

    it('should close the current drawer (hook)', async () => {
      const { openDrawer, user } = renderComponent('drawer1');
      await openDrawer('drawer1');
      await user.click(screen.getByTestId('hook-close-current'));
      await expectDrawerToBeClosed();
    });

    it('trying to close a random drawer should not close the others', async () => {
      const { openDrawer, user } = renderComponent('drawer1');
      await openDrawer('drawer1');
      await user.click(screen.getByTestId('close-random-drawer'));
      expectDrawerToBeOpened('drawer1', 'Drawer 1');
    });
  });
});
