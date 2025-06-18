import { mockRequestAnimationFrame, renderDragHandle } from './utils';

describe('useDragHandle', () => {
  beforeAll(mockRequestAnimationFrame);
  afterAll(vi.restoreAllMocks);

  it('should go through onWillDrag to onDragSettled events, and keep the focus', async () => {
    const { element, spies, events } = renderDragHandle({
      keepFocusAfterSettled: true,
    });

    events.mouseDown(1, 1).mouseMove(1, 1).mouseMove(4, 2).mouseUp();

    expect(spies.onWillDrag).toHaveBeenCalled();
    expect(spies.onDragStart).toHaveBeenCalledWith({
      position: { x: 1, y: 1 },
    });
    expect(spies.onDrag).toHaveBeenCalledWith({
      offset: { x: 3, y: 1 },
      position: { x: 4, y: 2 },
      cancel: expect.any(Function),
      end: expect.any(Function),
    });
    expect(spies.onDragEnd).toHaveBeenCalledWith({
      position: { x: 4, y: 2 },
      settle: expect.any(Function),
    });
    expect(spies.onDragSettled).toHaveBeenCalled();
    expect(element).toHaveFocus();
  });

  it('should go through onWillDrag to onDragSettled events, and then blur', async () => {
    const { element, spies, events } = renderDragHandle();

    events.mouseDown(1, 1).mouseMove(4, 2).mouseUp();

    expect(spies.onWillDrag).toHaveBeenCalled();
    expect(spies.onDragStart).toHaveBeenCalledWith({
      position: { x: 1, y: 1 },
    });
    expect(spies.onDrag).toHaveBeenCalledWith(
      expect.objectContaining({
        offset: { x: 3, y: 1 },
        position: { x: 4, y: 2 },
      }),
    );
    expect(spies.onDragEnd).toHaveBeenCalledWith(
      expect.objectContaining({
        position: { x: 4, y: 2 },
      }),
    );
    expect(spies.onDragSettled).toHaveBeenCalled();
    expect(element).not.toHaveFocus();
  });

  it('should call onWillDrag, move, onDragCancel (by pressing Escape) and onDragSettled', async () => {
    const { spies, events } = renderDragHandle({ cancelOnEscape: true });

    events.mouseDown(1, 1).mouseMove(4, 2).pressEscape().mouseUp();

    expect(spies.onDragCancel).toHaveBeenCalledWith(
      expect.objectContaining({
        position: { x: 4, y: 2 },
      }),
    );
    expect(spies.onDragSettled).toHaveBeenCalled();
  });

  it('should not call onDragCancel on pressing Escape', async () => {
    const { spies, events } = renderDragHandle();

    events.mouseDown(1, 1).mouseMove(4, 2).pressEscape().mouseUp();

    expect(spies.onDragCancel).not.toHaveBeenCalled();
    expect(spies.onDragSettled).toHaveBeenCalled();
  });

  it('should call onWillDrag, move, onDragCancel (by opening the context menu) and onDragSettled', async () => {
    const { spies, events } = renderDragHandle({
      cancelOnContextMenu: true,
    });

    events.mouseDown(1, 1).mouseMove(4, 2).contextMenu().mouseUp();

    expect(spies.onDragCancel).toHaveBeenCalled();
    expect(spies.onDragSettled).toHaveBeenCalled();
  });

  it('should not onDragCancel on opening the context menu', async () => {
    const { spies, events } = renderDragHandle();

    events.mouseDown(1, 1).mouseMove(4, 2).contextMenu().mouseUp();

    expect(spies.onDragCancel).not.toHaveBeenCalled();
    expect(spies.onDragSettled).toHaveBeenCalled();
  });

  it('should call onWillDrag, move, onDragCancel (on losing the focus) and onDragSettled', async () => {
    const { spies, events } = renderDragHandle({ cancelOnFocusLost: true });

    events.mouseDown(1, 1).mouseMove(4, 2).blur().mouseUp();

    expect(spies.onDragCancel).toHaveBeenCalled();
    expect(spies.onDragSettled).toHaveBeenCalled();
  });

  it('should not call onDragCancel on losing the focus', async () => {
    const { spies, events } = renderDragHandle();

    events.mouseDown(1, 1).mouseMove(4, 2).blur().mouseUp();

    expect(spies.onDragCancel).not.toHaveBeenCalled();
    expect(spies.onDragSettled).toHaveBeenCalled();
  });

  it('should not call onDragCancel before the dragging has actually started', async () => {
    const { spies, events } = renderDragHandle();

    events.mouseDown(1, 1).blur();

    expect(spies.onDragCancel).not.toHaveBeenCalled();
  });

  it('should not drag while in the dead zone', async () => {
    const { spies, events } = renderDragHandle({ deadZoneRadius: 5 });

    events.mouseDown(1, 1).mouseMove(4, 5).mouseUp();

    expect(spies.onWillDrag).toHaveBeenCalled();
    expect(spies.onDragStart).not.toHaveBeenCalled();
    expect(spies.onDrag).not.toHaveBeenCalled();
  });

  it('should start dragging after leaving the dead zone', async () => {
    const { spies, events } = renderDragHandle({ deadZoneRadius: 4.9 });

    events.mouseDown(1, 1).mouseMove(4, 5).mouseUp();

    expect(spies.onWillDrag).toHaveBeenCalled();
    expect(spies.onDragStart).toHaveBeenCalled();
    expect(spies.onDrag).toHaveBeenCalledWith(
      expect.objectContaining({
        offset: { x: 3, y: 4 },
        position: { x: 4, y: 5 },
      }),
    );
  });

  it('should ignore the dead zone after the dragging started', async () => {
    const { spies, events } = renderDragHandle({ deadZoneRadius: 4.9 });

    events.mouseDown(1, 1).mouseMove(4, 5).mouseMove(2, 2).mouseUp();

    expect(spies.onWillDrag).toHaveBeenCalled();
    expect(spies.onDragStart).toHaveBeenCalled();
    expect(spies.onDrag).toHaveBeenCalledTimes(2);
    expect(spies.onDrag).toHaveBeenLastCalledWith(
      expect.objectContaining({
        offset: { x: 1, y: 1 },
        position: { x: 2, y: 2 },
      }),
    );
  });

  it('should move with speed adjustment (number)', async () => {
    const { spies, events } = renderDragHandle({ speed: 2 });

    events.mouseDown(1, 1).mouseMove(4, 2).mouseUp();

    expect(spies.onDrag).toHaveBeenCalledWith(
      expect.objectContaining({
        offset: { x: 6, y: 2 },
        position: { x: 4, y: 2 },
      }),
    );
  });

  it('should move with speed adjustment (2D)', async () => {
    const { spies, events } = renderDragHandle({ speed: { x: 2, y: 3 } });

    events.mouseDown(1, 1).mouseMove(4, 2).mouseUp();

    expect(spies.onDrag).toHaveBeenCalledWith(
      expect.objectContaining({
        offset: { x: 6, y: 3 },
        position: { x: 4, y: 2 },
      }),
    );
  });

  it('should call onDragCancel on calling cancel()', async () => {
    const { spies, events, cancel } = renderDragHandle();

    events.mouseDown(1, 1).mouseMove(4, 2);
    cancel();

    expect(spies.onDragCancel).toHaveBeenCalled();
  });

  it('should call onDragCancel on calling end()', async () => {
    const { spies, events, end } = renderDragHandle();

    events.mouseDown(1, 1).mouseMove(4, 2);
    end();

    expect(spies.onDragEnd).toHaveBeenCalled();
  });
});
