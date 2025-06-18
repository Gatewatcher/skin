import {
  expectToBeVisibleInTheDocument,
  suffixTestId,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '@/skin/actions';
import { renderWithRouter } from '@/tests';

import type { FloatingActionsProps } from '..';
import FloatingActions from '..';

describe('FloatingActions', () => {
  const TEST_ID: TestId = 'floating-actions';

  const renderComponent = ({
    content = (
      <FloatingActions.Content>
        <FloatingActions.Actions>
          <FloatingActions.Button icon="Add" label="label" />
          <FloatingActions.Link to="/link" />
        </FloatingActions.Actions>
      </FloatingActions.Content>
    ),
    children = 'trigger',
    ...props
  }: Partial<FloatingActionsProps> = {}) =>
    renderWithRouter(
      <FloatingActions content={content} data-testid={TEST_ID} {...props}>
        {children}
      </FloatingActions>,
    );

  const user = userEvent.setup();

  const open = async () => {
    const trigger = await screen.findByTestId(suffixTestId(TEST_ID, 'trigger'));
    await user.click(trigger);
  };

  const triggerAction = async () => {
    await waitFor(async () => {
      const action = await screen.findByTestId('button-action');
      await user.click(action);
    });
  };

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument('floating-actions-trigger');
  });

  it('should render actions', async () => {
    renderComponent({
      content: 'content',
    });
    await open();
    await expectToBeVisibleInTheDocument(suffixTestId(TEST_ID, 'content'));
  });

  it('should render header', async () => {
    renderComponent({
      content: (
        <FloatingActions.Content>
          <FloatingActions.Header data-testid="header">
            header
          </FloatingActions.Header>
        </FloatingActions.Content>
      ),
    });
    await open();
    await expectToBeVisibleInTheDocument('header', screen.findByText);
    await expectToBeVisibleInTheDocument('header');
  });

  it('should render link', async () => {
    renderComponent({
      content: (
        <FloatingActions.Content>
          <FloatingActions.Actions>
            <FloatingActions.Link to="/" />
          </FloatingActions.Actions>
        </FloatingActions.Content>
      ),
    });
    await open();
    await waitFor(async () => {
      await expectToBeVisibleInTheDocument('floating-actions-link');
    });
  });

  it('should call action', async () => {
    const onClick = vi.fn();

    renderComponent({
      content: (
        <FloatingActions.Content>
          <FloatingActions.Actions>
            <FloatingActions.Button
              data-testid="button-action"
              icon="Add"
              onClick={onClick}
            />
          </FloatingActions.Actions>
        </FloatingActions.Content>
      ),
    });

    await open();
    await triggerAction();
    expect(onClick).toHaveBeenCalled();
  });

  it('should wrap header in Text if it is string', async () => {
    renderComponent({
      content: (
        <FloatingActions.Content>
          <FloatingActions.Header>header</FloatingActions.Header>
        </FloatingActions.Content>
      ),
    });

    await open();
    await waitFor(async () => {
      await expectToBeVisibleInTheDocument('text');
    });
  });

  it('should render button with icon if only one action', async () => {
    const onClick = vi.fn();

    renderComponent({
      content: (
        <FloatingActions.Content>
          <FloatingActions.Actions>
            <FloatingActions.Button
              data-testid="button-action"
              icon="Action"
              label="label"
              onClick={onClick}
            />
          </FloatingActions.Actions>
        </FloatingActions.Content>
      ),
    });

    await open();
    await waitFor(async () => {
      await expectToBeVisibleInTheDocument('label', screen.findByText);
    });

    await triggerAction();
    expect(onClick).toHaveBeenCalled();
  });

  it('should click on child button if with propagation', async () => {
    const onClick = vi.fn();

    renderComponent({
      children: <Button onClick={onClick}>trigger</Button>,
      triggerOn: 'hover',
      withStopPropagation: false,
      content: (
        <FloatingActions.Content>
          <FloatingActions.Header data-testid="header">
            header
          </FloatingActions.Header>
        </FloatingActions.Content>
      ),
    });
    const trigger = await screen.findByText('trigger');
    await user.hover(trigger);
    await waitFor(async () => {
      await expectToBeVisibleInTheDocument('header');
    });
    await user.click(trigger);
    expect(onClick).toHaveBeenCalled();
  });
});
