import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  expectClickNotToCallOnChange,
  expectClickToCallOnChange,
} from '@/skin/forms/inputs/__tests__/utils';

import type { ColorPaletteProps } from '..';
import ColorPalette from '..';

describe('ColorPalette', () => {
  const TEST_ID: TestId = 'color-palette';
  const ROLE = 'radio';

  const user = userEvent.setup();

  const renderComponent = ({ ...props }: Partial<ColorPaletteProps> = {}) =>
    render(<ColorPalette data-testid={TEST_ID} {...props} />);

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should call onChange function', async () => {
    await expectClickToCallOnChange<ColorPaletteProps>(
      renderComponent,
      {},
      async () => screen.getAllByRole(ROLE)[0],
    );
  });

  it('should be disabled and not call onChange function', async () => {
    await expectClickNotToCallOnChange<ColorPaletteProps>(
      renderComponent,
      {},
      async () => screen.getAllByRole(ROLE)[0],
    );
  });

  it('should call onColorChange', async () => {
    const onColorChange = vi.fn();

    renderComponent({ onColorChange });
    const inputs = await screen.findAllByRole(ROLE);
    await user.click(inputs[4]);

    expect(onColorChange).toHaveBeenCalled();
  });
});
