import { fireEvent, render, renderHook, screen } from '@testing-library/react';

import { useDragHandle } from '..';
import type {
  UseDragHandleEventHandlers,
  UseDragHandleOptions,
} from '../types';

export const DATA_TESTID = 'drag-handle';

export const mockRequestAnimationFrame = () => {
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation(fn => {
    fn(0);
    return 0;
  });
};

export const getCallbackSpies = (): Required<UseDragHandleEventHandlers> => {
  return {
    onWillDrag: vi.fn(),
    onDragStart: vi.fn(),
    onDrag: vi.fn(),
    onDragEnd: vi.fn(),
    onDragCancel: vi.fn(),
    onDragSettled: vi.fn(),
  };
};

export const renderDragHandle = (options?: UseDragHandleOptions) => {
  const spies = getCallbackSpies();
  const { result } = renderHook(() =>
    useDragHandle<HTMLDivElement>({
      ...spies,
      ...options,
    }),
  );

  render(<div data-testid={DATA_TESTID} {...result.current.elementProps} />);

  const element = screen.getByTestId(DATA_TESTID);

  return {
    element,
    events: new EventsApi(element),
    spies,
    cancel: () => result.current.cancel(),
    end: () => result.current.end(),
  };
};

class EventsApi {
  constructor(private element: HTMLElement) {}

  blur() {
    fireEvent.blur(this.element);
    return this;
  }

  contextMenu() {
    fireEvent.contextMenu(document.documentElement);
    return this;
  }

  mouseDown(x = 0, y = 0) {
    fireEvent.mouseDown(this.element, { clientX: x, clientY: y });
    return this;
  }

  mouseMove(x: number, y: number) {
    fireEvent.mouseMove(this.element, { clientX: x, clientY: y });
    return this;
  }

  mouseUp() {
    fireEvent.mouseUp(this.element);
    return this;
  }

  pressEscape() {
    fireEvent.keyDown(this.element, { key: 'Escape' });
    return this;
  }
}
