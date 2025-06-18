import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { ButtonAsyncProps } from '..';
import ButtonAsync from '..';

describe('ButtonAsync', () => {
  const TEST_ID: TestId = 'button-async';
  const defaultChildren = 'button';

  const user = userEvent.setup();

  const renderComponent = ({
    children,
    onClick,
    ...props
  }: Partial<ButtonAsyncProps> = {}) =>
    render(
      <ButtonAsync
        onClick={
          onClick ||
          (() => new Promise<void>(resolve => setTimeout(resolve, 3000)))
        }
        data-testid={TEST_ID}
        {...props}
      >
        {children || defaultChildren}
      </ButtonAsync>,
    );

  const click = async () => {
    const button = await screen.findByRole('button');
    await user.click(button);
  };

  it('should render', async () => {
    renderComponent();
    expect(await screen.findByRole('button')).toBeInTheDocument();
  });

  it('should render children', async () => {
    renderComponent({ children: 'text' });
    await expectToBeVisibleInTheDocument('text', screen.findByText);
  });

  it('should call on click', async () => {
    const onClick = vi.fn();
    renderComponent({ onClick });
    await click();
    expect(onClick).toBeCalledTimes(1);
  });

  it('should call on click once', async () => {
    const onClick = vi.fn();
    renderComponent({ onClick });

    await click();
    await waitFor(() => {
      click();
    });

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should have loader', async () => {
    renderComponent({ isLoading: true });
    await click();

    await waitFor(async () => {
      await expectToBeVisibleInTheDocument('circular-loader');
    });
  });

  it('should replace startIcon', async () => {
    const { rerender } = renderComponent({ startIcon: 'Add' });
    await click();
    rerender(<ButtonAsync isLoading={true}>button</ButtonAsync>);

    await waitFor(async () => {
      const icons = await screen.queryAllByTestId('icon');
      expect(icons).toHaveLength(0);
    });
  });

  it('should have endIcon', async () => {
    renderComponent({ endIcon: 'Add' });
    await expectToBeVisibleInTheDocument('icon');

    await click();
    await expectToBeVisibleInTheDocument('icon');
  });

  it('should be disabled when loading', async () => {
    renderComponent({ isLoading: true });
    expect(screen.getByTestId(TEST_ID)).toBeDisabled();
  });

  it('should not be disabled is specified otherwise', async () => {
    renderComponent({ isLoading: true, disabled: false });
    expect(screen.getByTestId(TEST_ID)).not.toBeDisabled();
  });
});
