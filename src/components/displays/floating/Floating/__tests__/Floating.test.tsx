import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
  suffixTestId,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '@/skin/actions';

import type {
  FloatingInternalProps,
  FloatingInternalSharedProps,
  FloatingProps,
} from '..';
import Floating from '..';
import { DEFAULT_MAX_HEIGHT } from '../constants';

describe('Floating', () => {
  const trigger = <span>Trigger</span>;
  const defaultContent = 'Content';

  const user = userEvent.setup();

  const renderComponent = ({
    children,
    content,
    type,
    ...props
  }: Partial<
    FloatingProps & FloatingInternalSharedProps & FloatingInternalProps
  > = {}) =>
    render(
      <Floating
        content={content || defaultContent}
        delay={0}
        role="tooltip"
        type={type || 'tooltip'}
        {...props}
      >
        {children || trigger}
      </Floating>,
    );

  const getTrigger = async (testId: TestId = 'floating') =>
    await screen.findByTestId(suffixTestId(testId, 'trigger'));

  it('should render trigger', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument('Trigger', screen.findByText);
  });

  it('should open floating on hover', async () => {
    renderComponent();
    await user.hover(await getTrigger());

    await waitFor(async () => {
      await expectToBeVisibleInTheDocument('floating-content');
    });
  });

  it('should render custom data-testid', async () => {
    renderComponent({ 'data-testid': 'custom' });
    await user.hover(await getTrigger('custom'));

    await waitFor(async () => {
      await expectToBeVisibleInTheDocument('custom-content');
    });
  });

  it('should not open floating when disabled', async () => {
    renderComponent({ isDisabled: true });
    await user.hover(await getTrigger());

    await waitFor(async () => {
      await expectNotToBeVisibleInTheDocument('floating-content');
    });
  });

  it('should open on click', async () => {
    renderComponent({
      children: <button>click me</button>,
    });
    await user.click(await getTrigger());

    await waitFor(async () => {
      await expectToBeVisibleInTheDocument('floating-content');
    });
  });

  it('should open on focus', async () => {
    renderComponent({
      children: <button>click me</button>,
    });
    await user.tab();
    expect(await getTrigger()).toHaveFocus();

    await waitFor(async () => {
      await expectToBeVisibleInTheDocument('floating-content');
    });
  });

  it('should not open on click', async () => {
    renderComponent({
      children: <button>click me</button>,
      triggerOn: [],
    });

    await user.click(await getTrigger());

    await waitFor(async () => {
      await expectNotToBeVisibleInTheDocument('floating-content');
    });
  });

  it('should have arrow', async () => {
    renderComponent();
    await user.click(await getTrigger());

    await waitFor(async () => {
      await expectToBeVisibleInTheDocument('floating-arrow');
    });
  });

  it('should not have arrow', async () => {
    renderComponent({ withArrow: false });
    await user.click(await getTrigger());

    await waitFor(async () => {
      await expectToBeVisibleInTheDocument('floating-content');
      await expectNotToBeVisibleInTheDocument('floating-arrow');
    });
  });

  it('should call onOpen', async () => {
    const spy = vi.fn();

    renderComponent({ onOpen: spy });
    await user.click(await getTrigger());

    await waitFor(async () => {
      await expectToBeVisibleInTheDocument('floating-content');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  it('should call onClose', async () => {
    const spy = vi.fn();

    renderComponent({ onClose: spy });
    await user.click(await getTrigger());

    await waitFor(async () => {
      await expectToBeVisibleInTheDocument('floating-content');
      expect(spy).not.toHaveBeenCalled();
    });

    await user.unhover(await getTrigger());

    await waitFor(async () => {
      await expectNotToBeVisibleInTheDocument('floating-content');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  it('should render with content method', async () => {
    renderComponent({
      type: 'popover',
      content: ({ opened }) => <div>{opened && 'opened'}</div>,
    });
    await user.click(await getTrigger());

    await waitFor(async () => {
      await expectToBeVisibleInTheDocument('floating-content');
      await expectToBeVisibleInTheDocument('opened', screen.findByText);
    });
  });

  it('should render classname for trigger element', async () => {
    renderComponent({
      triggerClassName: 'test',
      children: <>trigger</>,
    });

    expect(await getTrigger()).toHaveClass('test');
  });

  it('should be opened by default', async () => {
    renderComponent({
      initialIsOpened: true,
    });

    await waitFor(async () => {
      await expectToBeVisibleInTheDocument('floating-content');
    });
  });

  it('should not render children if it is fragment', async () => {
    renderComponent({
      children: <></>,
    });

    await expectNotToBeVisibleInTheDocument('floating-trigger');
  });

  it('should not trigger floating if content is falsy', async () => {
    render(
      <Floating content="" delay={0} role="tooltip" type="tooltip">
        <>Trigger</>
      </Floating>,
    );

    await user.click(await getTrigger());

    await waitFor(async () => {
      await expectNotToBeVisibleInTheDocument('floating-content');
    });
  });

  it('should call onClick() on the trigger and stop the propagation', async () => {
    const parentOnClick = vi.fn();
    const triggerOnClick = vi.fn();

    render(
      <div data-testid="parent" onClick={parentOnClick}>
        <Floating content="" role="tooltip" type="tooltip">
          <Button data-testid="trigger" onClick={triggerOnClick}>
            Trigger
          </Button>
        </Floating>
      </div>,
    );

    await user.click(screen.getByTestId('trigger'));

    expect(triggerOnClick).toHaveBeenCalledTimes(1);
    expect(parentOnClick).not.toHaveBeenCalled();
  });

  it('should call onClick() on the trigger and let the event propagate', async () => {
    const parentOnClick = vi.fn();
    const triggerOnClick = vi.fn();

    render(
      <div onClick={parentOnClick}>
        <Floating
          content=""
          role="tooltip"
          triggerOn="hover"
          type="tooltip"
          withStopPropagation={false}
        >
          <Button data-testid="trigger" onClick={triggerOnClick}>
            Trigger
          </Button>
        </Floating>
      </div>,
    );

    await user.click(screen.getByTestId('trigger'));

    expect(triggerOnClick).toHaveBeenCalledTimes(1);
    expect(parentOnClick).toHaveBeenCalled();
  });

  it('should have maxHeight without size middleware', async () => {
    render(
      <Floating
        content="content"
        maxHeight={500}
        role="tooltip"
        type="popover"
        withSizeMiddleware={false}
      >
        <>Trigger</>
      </Floating>,
    );

    await user.click(await getTrigger());
    const floatingContent = (await screen.findByTestId('floating-content'))
      .firstElementChild;

    expect(floatingContent).toHaveStyle({ maxHeight: '500px' });
  });

  it('should have maxHeight without size middleware - default', async () => {
    render(
      <Floating
        content="content"
        role="tooltip"
        type="popover"
        withSizeMiddleware={false}
      >
        <>Trigger</>
      </Floating>,
    );

    await user.click(await getTrigger());
    const floatingContent = (await screen.findByTestId('floating-content'))
      .firstElementChild;

    expect(floatingContent).toHaveStyle({
      maxHeight: `${DEFAULT_MAX_HEIGHT}px`,
    });
  });

  it('should stop propagation on floating click', async () => {
    const onClick = vi.fn();

    render(
      <div onClick={onClick}>
        <Floating content="content" role="tooltip" type="popover">
          <>Trigger</>
        </Floating>
      </div>,
    );

    await user.hover(await getTrigger());

    await waitFor(async () => {
      await expectToBeVisibleInTheDocument('floating-content');
      await user.click(await screen.findByTestId('floating-content'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });
});
