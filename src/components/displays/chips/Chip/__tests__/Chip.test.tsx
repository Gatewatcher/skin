import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithThemeProvider } from '@/tests';

import Chip from '..';
import type { ChipBaseProps } from '../../ChipBase';

describe('ChipBase', () => {
  const TEST_ID: TestId = 'chip';
  const content = 'value';

  const renderComponent = ({ ...props }: Partial<ChipBaseProps> = {}) => {
    return renderWithThemeProvider(
      <Chip data-testid={TEST_ID} {...props}>
        {content}
      </Chip>,
    );
  };

  const user = userEvent.setup();
  const getChip = async () => await screen.findByTestId(TEST_ID);
  const getCloseButton = async () => await screen.findByRole('button');

  const clickClose = async () => {
    const button = await getCloseButton();
    await user.click(button);
  };

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should have content', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(content, screen.findByText);
  });

  it('should be small', async () => {
    renderComponent({ size: 'small' });
    expect(await getChip()).toHaveClass('sizeSmall');
  });

  it('should have close button', async () => {
    renderComponent({
      onClose: () => {},
    });
    const button = await getCloseButton();
    expect(button).toBeVisible();
  });

  it('should not have close button', async () => {
    renderComponent({});
    expect(screen.queryByRole('button')).toBeFalsy();
  });

  it('should call onClose', async () => {
    const onClose = vi.fn();
    renderComponent({
      onClose,
    });
    await clickClose();
    expect(onClose).toHaveBeenCalled();
  });

  it('should call onCloseButtonMouseDown', async () => {
    const mock = vi.fn();
    renderComponent({
      onCloseButtonMouseDown: mock,
    });
    await clickClose();
    expect(mock).toHaveBeenCalled();
  });

  it('should call onCloseButtonTouchEnd', async () => {
    const mock = vi.fn();
    renderComponent({
      onCloseButtonTouchEnd: mock,
    });
    const button = await getCloseButton();
    fireEvent.touchEnd(button);
    expect(mock).toHaveBeenCalled();
  });

  it('should call onClick', async () => {
    const onClick = vi.fn();
    renderComponent({ onClick });
    const chip = await getChip();
    await userEvent.click(chip);

    expect(chip).toHaveClass('clickable');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
