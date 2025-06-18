import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';

import { MAX_SPACING } from '@/constants';
import { Button } from '@/skin/actions';

import type { ToastrProps } from '..';
import Toastr from '..';
import { useToasts } from '../hook';
import type { Toast as ToastProps } from '../types';

describe('Toastr', () => {
  const renderComponent = ({
    children,
    ...props
  }: Partial<ToastrProps & ToastProps> = {}) => {
    const ChildrenComp = ({ children }: { children: ReactNode }) => {
      const { addToast } = useToasts();

      return (
        <>
          <Button
            data-testid="add"
            onClick={() => addToast({ title: 'title', ...props })}
          >
            add toast
          </Button>
          {children}
        </>
      );
    };

    render(
      <Toastr {...props}>{<ChildrenComp>{children}</ChildrenComp>}</Toastr>,
    );
  };

  const user = userEvent.setup();

  const getContainer = async () => await screen.findByTestId('toasts');

  const addToast = async () => {
    const button = await screen.findByTestId('add');
    await user.click(button);
  };

  it('should render', async () => {
    renderComponent();
    expect(await screen.findByRole('button', {})).toBeInTheDocument();
  });

  it('should render container', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument('toasts');
  });

  it('should render one toast on button click', async () => {
    renderComponent();
    await addToast();

    const toasts = await screen.findAllByTestId(/toast(?!s)/);
    expect(toasts).toHaveLength(1);
  });

  it('should render toast with data-testid according to type', async () => {
    renderComponent({ type: 'error' });
    await addToast();

    await waitFor(async () => {
      await expectToBeVisibleInTheDocument('toast-error');
    });
  });

  it('should render custom test-id', async () => {
    renderComponent({ 'data-testid': 'testid' });
    await addToast();

    await waitFor(async () => {
      await expectToBeVisibleInTheDocument('testid');
    });
  });

  it('should render toast with title and content', async () => {
    renderComponent({ type: 'info', title: 'title', content: 'content' });
    await addToast();

    await waitFor(async () => {
      await expectToBeVisibleInTheDocument('title', screen.findByText);
      await expectToBeVisibleInTheDocument('content', screen.findByText);
    });
  });

  it('should render custom content', async () => {
    renderComponent({ content: <div data-testid="custom">custom</div> });
    await addToast();

    await waitFor(async () => {
      await expectToBeVisibleInTheDocument('custom');
    });
  });

  it('should disappear after duration', async () => {
    renderComponent({ duration: 1000 });
    await addToast();

    await waitFor(
      async () => {
        await expectNotToBeVisibleInTheDocument('toast');
      },
      { timeout: 3000 },
    );
  });

  it('should disappear on close click', async () => {
    renderComponent();
    await addToast();

    const closeBtn = await screen.findByTestId('close');
    await user.click(closeBtn);

    await waitFor(async () => {
      await expectNotToBeVisibleInTheDocument('toast');
    });
  });

  it('should close toast programmatically', async () => {
    const Children = () => {
      const { removeToast } = useToasts();

      return (
        <button data-testid="remove" onClick={() => removeToast('id')}>
          remove
        </button>
      );
    };

    renderComponent({ id: 'id', children: <Children /> });
    await addToast();

    const removeBtn = await screen.findByTestId('remove');
    await user.click(removeBtn);

    await waitFor(async () => {
      await expectNotToBeVisibleInTheDocument('toast');
    });
  });

  it('should close all toasts', async () => {
    const Children = () => {
      const { clearAllToasts } = useToasts();

      return (
        <button data-testid="clear-all" onClick={clearAllToasts}>
          clear
        </button>
      );
    };

    renderComponent({ children: <Children /> });
    await addToast();
    await addToast();

    const toasts = await screen.findAllByTestId('toast');
    expect(toasts).toHaveLength(2);

    const btn = await screen.findByTestId('clear-all');
    await user.click(btn);

    await waitFor(async () => {
      await expectNotToBeVisibleInTheDocument('toast');
    });
  });

  it('should be positioned at bottom-right', async () => {
    renderComponent();
    const container = await getContainer();
    expect(container).toHaveStyle({
      bottom: 'var(--spacing-9)',
      right: 'var(--spacing-9)',
    });
  });

  it('should be positioned at top-left', async () => {
    renderComponent({ position: 'top-left' });
    const container = await getContainer();
    expect(container).toHaveStyle({
      top: 'var(--spacing-9)',
      left: 'var(--spacing-9)',
    });
  });

  it('should have custom offset', async () => {
    renderComponent({ offset: { x: 1, y: 3 } });
    const container = await getContainer();
    expect(container).toHaveStyle({
      bottom: 'var(--spacing-1)',
      right: 'var(--spacing-3)',
    });
  });

  it('should clamp custom offset', async () => {
    renderComponent({ offset: { x: -1, y: 30 } });
    const container = await getContainer();
    expect(container).toHaveStyle({
      bottom: 'var(--spacing-0)',
      right: `var(--spacing-${MAX_SPACING})`,
    });
  });

  it('should call onDuration on duration end', async () => {
    const onDurationEnd = vi.fn();
    renderComponent({
      onDurationEnd,
      duration: 1000,
    });
    await addToast();

    await waitFor(
      async () => {
        expect(onDurationEnd).toHaveBeenCalledTimes(1);
        await expectNotToBeVisibleInTheDocument('toast');
      },
      { timeout: 3000 },
    );
  });

  it('should not call onClose on duration end', async () => {
    const onClose = vi.fn();
    const onDurationEnd = vi.fn();

    renderComponent({
      onClose,
      onDurationEnd,
      duration: 1000,
    });
    await addToast();

    await waitFor(
      async () => {
        expect(onClose).not.toHaveBeenCalled();
        await expectNotToBeVisibleInTheDocument('toast');
      },
      { timeout: 3000 },
    );
  });

  it('should call onClose on close click', async () => {
    const onClose = vi.fn();
    renderComponent({ onClose });
    await addToast();

    await user.click(await screen.findByTestId('close'));
    await waitFor(async () => {
      expect(onClose).toHaveBeenCalledTimes(1);
      await expectNotToBeVisibleInTheDocument('toast');
    });
  });
});
