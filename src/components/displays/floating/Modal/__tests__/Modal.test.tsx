import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { ModalProps } from '..';
import Modal from '..';

describe('Modal', () => {
  const triggerElement = <>trigger</>;
  const user = userEvent.setup();

  const renderComponent = ({
    children,
    content,
    ...props
  }: Partial<ModalProps> = {}) =>
    render(
      <Modal content={content || <>content</>} {...props}>
        {children || triggerElement}
      </Modal>,
    );

  const trigger = async () => {
    const triggerElement = await screen.findByTestId('floating-trigger');
    await user.click(triggerElement);
  };

  const getModal = async () => await screen.findByRole('dialog');

  it('should render', async () => {
    renderComponent();
    await trigger();

    const modal = await getModal();
    expect(modal).toBeInTheDocument();
    expect(modal).toBeVisible();
  });

  it('should render with backdrop', async () => {
    renderComponent();
    await trigger();

    await waitFor(async () => {
      await expectToBeVisibleInTheDocument('backdrop');
    });
  });

  it('should render without backdrop (transparent)', async () => {
    renderComponent({ withBackdrop: false });
    await trigger();

    const backdrop = await screen.findByTestId('backdrop');
    expect(backdrop).toHaveClass('transparent');
  });

  it('should have large size', async () => {
    renderComponent({ size: 'large' });
    await trigger();

    const modal = await getModal();
    expect(modal).toHaveClass('sizeLarge');
  });

  it('should have medium size by default', async () => {
    renderComponent();
    await trigger();

    const modal = await getModal();
    expect(modal).toHaveClass('sizeMedium');
  });

  // Compound
  it('should have header', async () => {
    renderComponent({ content: <Modal.Header>header</Modal.Header> });
    await trigger();

    await waitFor(async () => {
      const modal = await getModal();
      expect(modal.firstElementChild?.tagName).toBe('HEADER');
      await expectToBeVisibleInTheDocument('header', screen.findByText);
    });
  });

  it('should close modal in header', async () => {
    renderComponent({
      content: (
        <Modal.Header>
          <Modal.Title>title</Modal.Title>
          <Modal.Close />
        </Modal.Header>
      ),
    });

    await trigger();

    const btn = await screen.findByRole('img');
    const modal = await getModal();
    await user.click(btn);

    await waitFor(async () => {
      expect(modal).not.toBeInTheDocument();
    });
  });

  it('should not have close in header', async () => {
    renderComponent({
      content: <Modal.Header withClose={false}>content</Modal.Header>,
    });

    await trigger();

    await waitFor(async () => {
      expect(await screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  it('should have body', async () => {
    renderComponent({ content: <Modal.Body>body</Modal.Body> });

    await trigger();

    await waitFor(async () => {
      await expectToBeVisibleInTheDocument('body', screen.findByText);
    });
  });

  it('should have footer', async () => {
    renderComponent({ content: <Modal.Footer>footer</Modal.Footer> });
    await trigger();

    await waitFor(async () => {
      const modal = await getModal();
      expect(modal.firstElementChild?.tagName).toBe('FOOTER');
      await expectToBeVisibleInTheDocument('footer', screen.findByText);
    });
  });

  it('should have basic actions', async () => {
    const save = vi.fn();
    const cancel = vi.fn();

    renderComponent({
      content: (
        <Modal.Footer>
          <Modal.BasicActions onCancel={cancel} onSave={save} type="danger" />
        </Modal.Footer>
      ),
    });

    await trigger();

    const buttons = await screen.findAllByRole('button');
    expect(buttons).toHaveLength(2);
    expect(buttons[1]).toHaveClass('containedDanger');
  });

  it('should call save action', async () => {
    const save = vi.fn();

    renderComponent({
      content: (
        <Modal.Footer>
          <Modal.BasicActions onSave={save} />
        </Modal.Footer>
      ),
    });

    await trigger();

    const saveBtn = await screen.findByText('Save');
    await user.click(saveBtn);

    expect(save).toHaveBeenCalledTimes(1);
  });

  it('should stack modal', async () => {
    const stackedTrigger = 'click me';

    renderComponent({
      content: (
        <Modal.Body>
          <Modal content="modal2">
            <>{stackedTrigger}</>
          </Modal>
        </Modal.Body>
      ),
    });

    await trigger();

    await waitFor(async () => {
      await expectToBeVisibleInTheDocument(stackedTrigger, screen.findByText);
    });
    const triggerModal2 = await screen.findByText(stackedTrigger);
    await user.click(triggerModal2);

    await waitFor(async () => {
      await expectToBeVisibleInTheDocument('modal2', screen.findByText);
    });
  });

  it('should be scrollable on modal', async () => {
    renderComponent();
    await trigger();

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toHaveClass('scrollOnModal');
  });

  it('should not close modal on backdrop click', async () => {
    renderComponent({
      content: (
        <Modal.Footer>
          <Modal.BasicActions onCancel={() => {}} onSave={() => {}} />
        </Modal.Footer>
      ),
    });

    await trigger();
    await user.click(await screen.findByTestId('backdrop'));

    expect(await getModal()).toBeInTheDocument();
  });

  it('should close modal on backdrop click', async () => {
    renderComponent();
    await trigger();
    await user.click(await screen.findByTestId('backdrop'));

    await waitFor(async () => {
      expect(await screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('should close modal on cancel click', async () => {
    const onCancel = vi.fn();
    renderComponent({
      content: (
        <Modal.Footer>
          <Modal.BasicActions onCancel={onCancel} />
        </Modal.Footer>
      ),
    });
    await trigger();

    await user.click(await screen.findByText(/cancel/i));
    expect(onCancel).toHaveBeenCalled();

    await waitFor(async () => {
      expect(await screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('should call onSave async on basic actions', async () => {
    const onSave = vi.fn();

    renderComponent({
      content: (
        <Modal.Footer>
          <Modal.BasicActions
            onSave={async () => {
              await onSave();
            }}
            onCancel={() => {}}
          />
        </Modal.Footer>
      ),
    });
    await trigger();
    await user.click(await screen.findByText(/save/i));
    expect(onSave).toHaveBeenCalled();
  });

  it('should not close modal on save click', async () => {
    renderComponent({
      content: (
        <Modal.Footer>
          <Modal.BasicActions withCloseOnActionEnd={false} />
        </Modal.Footer>
      ),
    });
    await trigger();

    expect(await screen.findByText(/cancel/i)).toBeInTheDocument();
  });

  it('should render custom labels for basic actions', async () => {
    const cancelLabel = 'cancel label';
    const saveLabel = 'save label';

    renderComponent({
      content: (
        <Modal.Footer>
          <Modal.BasicActions cancelLabel={cancelLabel} saveLabel={saveLabel} />
        </Modal.Footer>
      ),
    });

    await trigger();

    await waitFor(async () => {
      await expectToBeVisibleInTheDocument(cancelLabel, screen.findByText);
      await expectToBeVisibleInTheDocument(saveLabel, screen.findByText);
    });
  });

  it('should open through external state', async () => {
    renderComponent({ isOpened: true });

    const modal = await getModal();
    expect(modal).toBeInTheDocument();
  });

  it('should not render trigger element if it is a controlled modal', async () => {
    renderComponent({
      isOpened: true,
      setIsOpened: vi.fn(),
      children: <></>,
    });

    await expectNotToBeVisibleInTheDocument('floating-trigger');
  });
});
