import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { screen } from '@testing-library/react';

import { ICON_SIZES_REM } from '@/constants';
import { renderWithThemeProvider } from '@/tests';

import type { IconProps } from '..';
import Icon from '..';

describe('Icon', () => {
  const TEST_ID: TestId = 'icon';

  const renderComponent = ({ ...props }: Partial<IconProps> = {}) =>
    renderWithThemeProvider(
      <Icon data-testid={TEST_ID} name="Add" {...props} />,
    );

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should be small', async () => {
    renderComponent({ size: 'small' });
    expect(await screen.findByTestId(TEST_ID)).toHaveStyle({
      width: ICON_SIZES_REM.small,
      height: ICON_SIZES_REM.small,
    });
  });

  it('should have class for default color', async () => {
    renderComponent();
    expect(await screen.findByRole('img')).toHaveClass('color');
  });

  it('should not have class for default color', async () => {
    renderComponent({ color: 'red' });
    expect(await screen.findByRole('img')).not.toHaveClass('color');
  });
});
