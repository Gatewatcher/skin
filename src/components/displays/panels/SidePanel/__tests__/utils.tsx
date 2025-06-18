import { expectNotToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SidePanel from '..';
import {
  type SidePanelContext,
  type UseSidePanelInit,
  useSidePanel,
} from '../Provider';

export const renderComponent = ({ init }: { init?: UseSidePanelInit } = {}) => {
  const renderResult = render(
    <SidePanel.Provider>
      {provider => <Example init={init} provider={provider} />}
    </SidePanel.Provider>,
  );

  const user = userEvent.setup();

  return {
    ...renderResult,
    openUsingProvider: () => user.click(screen.getByTestId('open-provider')),
    openUsingHook: () => user.click(screen.getByTestId('open-hook')),
    closeUsingProvider: () => user.click(screen.getByTestId('close-provider')),
    closeUsingHook: () => user.click(screen.getByTestId('close-hook')),
    expectContentToBeDisplayed: () => {
      const providerContent = screen.getByTestId('content-provider');
      const hookContent = screen.getByTestId('content-provider');
      expect(providerContent).toHaveTextContent('Hello side panel!');
      expect(hookContent).toHaveTextContent('Hello side panel!');
    },
    expectContentNotToBeDisplayed: async () => {
      await expectNotToBeVisibleInTheDocument('content-provider');
      await expectNotToBeVisibleInTheDocument('content-provider');
    },
  };
};

const Example = ({
  init,
  provider,
}: {
  init: UseSidePanelInit;
  provider: SidePanelContext;
}) => {
  const sidePanel = useSidePanel(init);

  return (
    <>
      {provider.isOpened && (
        <div data-testid="content-provider">{provider.content}</div>
      )}
      {sidePanel.isOpened && (
        <div data-testid="content-hook">{sidePanel.content}</div>
      )}
      <button
        data-testid="open-provider"
        onClick={() => provider.open('Hello side panel!')}
      />
      <button
        data-testid="open-hook"
        onClick={() => sidePanel.open('Hello side panel!')}
      />
      <button data-testid="close-provider" onClick={provider.close} />
      <button data-testid="close-hook" onClick={sidePanel.close} />
    </>
  );
};
