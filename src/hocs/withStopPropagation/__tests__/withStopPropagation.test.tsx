import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { withStopPropagation } from '..';

describe('withStopPropagation', () => {
  const user = userEvent.setup();

  const renderHoc = ({
    containerOnClick,
    onClick,
  }: {
    containerOnClick: () => void;
    onClick: () => void;
  }) => {
    render(
      <div data-testid="container" onClick={containerOnClick}>
        {withStopPropagation(
          <button data-testid="button" onClick={onClick}>
            click me
          </button>,
        )}
      </div>,
    );
  };

  it('should call button onClick', async () => {
    const onClick = vi.fn();
    const containerOnClick = vi.fn();

    renderHoc({ containerOnClick, onClick });
    await user.click(await screen.findByTestId('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should call container onClick', async () => {
    const onClick = vi.fn();
    const containerOnClick = vi.fn();

    renderHoc({ containerOnClick, onClick });
    await user.click(await screen.findByTestId('container'));
    expect(containerOnClick).toHaveBeenCalledTimes(1);
  });

  it('should stop propagation', async () => {
    const onClick = vi.fn();
    const containerOnClick = vi.fn();

    renderHoc({ containerOnClick, onClick });
    await user.click(await screen.findByTestId('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(containerOnClick).not.toHaveBeenCalled();
  });
});
