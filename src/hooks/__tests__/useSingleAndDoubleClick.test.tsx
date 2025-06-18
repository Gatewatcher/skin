import { render, renderHook, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSingleAndDoubleClick } from 'hooks/useSingleAndDoubleClick';

describe('useSingleAndDoubleClick', () => {
  it('should run onClick', async () => {
    const onClick = vi.fn();
    const onDoubleClick = vi.fn();

    const singleAndDoubleClickHookResult = renderHook(() => {
      return useSingleAndDoubleClick({
        onClick,
        onDoubleClick,
      });
    });

    const [singleClick, doubleClick] =
      singleAndDoubleClickHookResult.result.current;

    const { container } = render(
      <div onClick={singleClick} onDoubleClick={doubleClick} />,
    );

    if (container.firstElementChild) {
      await userEvent.click(container.firstElementChild);
    }

    await waitFor(async () => {
      expect(onClick).toHaveBeenCalled();
    });
  });

  it('should run onDoubleClick only', async () => {
    const onClick = vi.fn();
    const onDoubleClick = vi.fn();

    const singleAndDoubleClickHookResult = renderHook(() => {
      return useSingleAndDoubleClick({
        onClick,
        onDoubleClick,
      });
    });

    const [singleClick, doubleClick] =
      singleAndDoubleClickHookResult.result.current;

    const { container } = render(
      <div onClick={singleClick} onDoubleClick={doubleClick} />,
    );

    if (container.firstElementChild) {
      await userEvent.dblClick(container.firstElementChild);
    }

    await waitFor(async () => {
      expect(onDoubleClick).toHaveBeenCalled();
      expect(onClick).not.toHaveBeenCalled();
    });
  });
});
