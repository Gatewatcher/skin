import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { ButtonCloseProps } from '..';
import ButtonClose from '..';

describe('ButtonClose', () => {
  const TEST_ID = 'button-close';

  const renderComponent = (props: ButtonCloseProps = {}) => {
    return {
      user: userEvent.setup(),
      ...render(<ButtonClose data-testid={TEST_ID} {...props} />),
    };
  };

  const getButton = () => screen.getByTestId(TEST_ID);

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should call mouse event callbacks', async () => {
    const onClick = vi.fn();
    const onMouseDown = vi.fn();
    const { user } = renderComponent({ onClick, onMouseDown });
    const button = getButton();

    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onMouseDown).toHaveBeenCalledTimes(1);
  });

  it('should call onTouchEnd()', async () => {
    const onTouchEnd = vi.fn();
    renderComponent({ onTouchEnd });
    const button = getButton();

    // can't trigger onTouchEnd with userEvent.pointer() for now.
    fireEvent.touchEnd(button);

    expect(onTouchEnd).toHaveBeenCalledTimes(1);
  });
});
