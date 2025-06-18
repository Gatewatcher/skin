import { render, screen, waitFor } from '@testing-library/react';

import { ICON_SIZES_REM } from '@/constants';

import type { CircularLoaderProps } from '../index';
import CircularLoader, { buildCircularLoaderTestIds } from '../index';

describe('CircularLoader tests', () => {
  const TEST_ID = 'circular-loader';

  const renderComponent = (args: Partial<CircularLoaderProps> = {}) =>
    render(<CircularLoader data-testid={TEST_ID} {...args} />);

  const getCircularLoader = () => screen.getByTestId(TEST_ID);
  const getSvg = () =>
    screen.getByTestId(buildCircularLoaderTestIds(TEST_ID).svg);
  const getSvgPath = async () =>
    await screen.findByTestId(buildCircularLoaderTestIds(TEST_ID).path);

  it('renders the component with the default size', async () => {
    renderComponent();
    expect(getCircularLoader()).toBeInTheDocument();
    expect(getSvg()).toHaveStyle({ width: ICON_SIZES_REM['medium'] });
  });

  it('renders the component with a user-specified size class (small)', async () => {
    renderComponent({ size: 'small' });
    expect(getSvg()).toHaveStyle({ width: ICON_SIZES_REM['small'] });
  });

  it('renders the component with a user-specified size class (large)', async () => {
    renderComponent({ size: 'large' });
    expect(getSvg()).toHaveStyle({ width: ICON_SIZES_REM['large'] });
  });

  it('not have animation', async () => {
    renderComponent();
    await waitFor(
      async () => {
        await expect(await getSvgPath()).toHaveClass('worm');
        await expect(await getSvgPath()).not.toHaveClass('wormLongRunning');
      },
      { timeout: 10000 },
    );
  });
});
