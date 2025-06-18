import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { ButtonActionsProps } from '..';
import ButtonActions from '..';

describe('ButtonActions', () => {
  const TEST_ID: TestId = 'button-actions';

  const renderComponent = ({
    actions,
    children = 'trigger',
    ...props
  }: Partial<ButtonActionsProps> = {}) =>
    render(
      <ButtonActions
        actions={
          actions || [
            <ButtonActions.Button key={1}>Action 1</ButtonActions.Button>,
            <ButtonActions.Button key={2}>Action 2</ButtonActions.Button>,
          ]
        }
        data-testid={TEST_ID}
        {...props}
      >
        {children}
      </ButtonActions>,
    );

  const user = userEvent.setup();

  const open = async () => {
    const button = await screen.findByTestId('button-actions-trigger');
    await user.click(button);
  };

  const getContent = async () =>
    await screen.findByTestId('button-actions-content');

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument('button-actions-trigger');
  });

  it('should open actions', async () => {
    renderComponent();

    await open();
    await expectToBeVisibleInTheDocument('button-actions-content');
  });

  it('should have 2 elements', async () => {
    renderComponent();

    await open();
    const buttons = await within(await getContent()).findAllByRole('button');
    expect(buttons).toHaveLength(2);
  });

  it('should call onClick and close dropdown', async () => {
    const onClick = vi.fn();

    renderComponent({
      actions: [
        <ButtonActions.Button key="1" data-testid="action" onClick={onClick}>
          action
        </ButtonActions.Button>,
      ],
    });

    await open();
    const action = await screen.findByTestId('action');
    await user.click(action);

    expect(onClick).toHaveBeenCalledTimes(1);

    await waitFor(async () => {
      await expectNotToBeVisibleInTheDocument('button-actions-content');
    });
  });

  it('should not open menu on disabled state', async () => {
    renderComponent({ disabled: true });
    await expect(await screen.findByTestId('button')).toBeDisabled();

    await open();
    await expectNotToBeVisibleInTheDocument('button-actions-content');
  });

  it('should call onOpen on open', async () => {
    const onOpen = vi.fn();
    renderComponent({ onOpen });

    await open();
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it('should call onClose on close', async () => {
    const onClose = vi.fn();
    renderComponent({
      onClose,
      actions: [
        <ButtonActions.Button key="1" data-testid="action">
          action
        </ButtonActions.Button>,
      ],
    });

    await open();
    const action = await screen.findByTestId('action');
    await user.click(action);

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
