import { screen } from '@testing-library/react';

import { renderWithThemeProvider } from '@/tests';

import type { StatusIndicatorProps } from '..';
import StatusIndicator from '..';

describe('StatusIndicator', () => {
  const renderComponent = (props: StatusIndicatorProps) =>
    renderWithThemeProvider(<StatusIndicator {...props} />);
  const getStatusIndicator = () => screen.getByTestId('status-indicator');

  it('should have the `small` class by default', async () => {
    renderComponent({ type: 'info' });
    expect(getStatusIndicator()).toHaveClass('small');
  });

  it('should have the `large` class', async () => {
    renderComponent({ size: 'large', type: 'info' });
    expect(getStatusIndicator()).toHaveClass('large');
  });

  it('should have the `withPulse` class', async () => {
    renderComponent({ type: 'info', withPulse: true });
    expect(getStatusIndicator()).toHaveClass('withPulse');
  });
});
