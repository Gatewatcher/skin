import { expectNotToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { MemoryRouterProps } from 'react-router-dom';

import { renderWithRouter } from '@/tests';

import Provider from '..';
import { type DrawerMatches, useCurrentDrawer, useDrawerV2 } from '../..';

export const expectDrawerToBeOpened = (id: string, content: string) => {
  const providerIsOpened = screen.getByTestId('provider-is-opened');
  const drawerIsOpened = screen.getByTestId('drawer-is-opened');
  const currentDrawerIsOpened = screen.getByTestId('current-drawer-is-opened');
  const providerContent = screen.getByTestId('provider-content');
  const hookContent = screen.getByTestId('drawer-content');
  const currentId = screen.getByTestId('current-drawer-id');

  expect(providerIsOpened).toHaveTextContent('true');
  expect(drawerIsOpened).toHaveTextContent('true');
  expect(currentDrawerIsOpened).toHaveTextContent('true');
  expect(providerContent).toHaveTextContent(content);
  expect(hookContent).toHaveTextContent(content);
  expect(currentId).toHaveTextContent(id);
};

export const expectDrawerToBeClosed = async () => {
  const providerIsOpened = screen.getByTestId('provider-is-opened');
  const hookIsOpened = screen.getByTestId('drawer-is-opened');
  const currentIsOpened = screen.getByTestId('current-drawer-is-opened');

  expect(providerIsOpened).toHaveTextContent('false');
  await expectNotToBeVisibleInTheDocument('provider-content');
  expect(hookIsOpened).toHaveTextContent('false');
  await expectNotToBeVisibleInTheDocument('drawer-content');
  expect(currentIsOpened).toHaveTextContent('false');
};

export const renderComponent = (
  drawerId: string,
  args?: {
    props?: unknown;
    routerOptions?: MemoryRouterProps;
  },
) => {
  const user = userEvent.setup();

  const render = renderWithRouter(
    <Provider matches={drawerMatches}>
      {({ close, content, isOpened }) => (
        <>
          <Example drawerId={drawerId} props={args?.props} />
          <button data-testid="provider-close-current" onClick={close} />
          <span data-testid="provider-is-opened">{isOpened.toString()}</span>
          {content && <div data-testid="provider-content">{content}</div>}
        </>
      )}
    </Provider>,
    args?.routerOptions,
  );

  return {
    user,
    openDrawer: async (id: string) => {
      await user.click(screen.getByTestId(`hook-open-${id}`));
    },
    ...render,
  };
};

const Example = ({
  drawerId,
  props,
}: {
  drawerId: string;
  props?: unknown;
}) => {
  const drawer = useDrawerV2<unknown>(drawerId);
  const randomDrawer = useDrawerV2('random');
  const currentDrawer = useCurrentDrawer();

  return (
    <>
      <button
        data-testid={`hook-open-${drawerId}`}
        onClick={() => drawer.open(props)}
      />
      <button data-testid={`hook-close-${drawerId}`} onClick={drawer.close} />
      <button data-testid="hook-close-current" onClick={currentDrawer.close} />
      {currentDrawer.id && (
        <span data-testid="current-drawer-id">{currentDrawer.id}</span>
      )}
      <span data-testid="drawer-is-opened">{drawer.isOpened.toString()}</span>
      <span data-testid="current-drawer-is-opened">
        {currentDrawer.isOpened.toString()}
      </span>
      {currentDrawer.content && (
        <div data-testid="drawer-content">{currentDrawer.content}</div>
      )}
      <button data-testid="close-random-drawer" onClick={randomDrawer.close} />
    </>
  );
};

const drawerMatches: DrawerMatches = {
  drawer1: 'Drawer 1',
  drawer2: { content: 'Drawer 2' },
  drawer3: () => 'Drawer 3',
  drawer4: props => ({ content: `Drawer 4 ${props?.test}` }),
  drawer5: () => ({ content: 'Drawer 5', enabled: false }),
};
