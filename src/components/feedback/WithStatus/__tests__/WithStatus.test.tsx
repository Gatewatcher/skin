import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import { render, screen } from '@testing-library/react';

import type { WithStatusProps } from '..';
import WithStatus from '..';

describe('WithStatus', () => {
  const renderComponent = ({ children, ...props }: WithStatusProps) =>
    render(<WithStatus {...props}>{children}</WithStatus>);

  it('should render', async () => {
    renderComponent({
      children: 'Content',
      type: 'critical',
    });

    await expectToBeVisibleInTheDocument('status-indicator');
  });

  it('should render as h1', async () => {
    renderComponent({
      as: 'h1',
      children: 'Content',
      type: 'critical',
    });

    expect(screen.getByRole('heading', { level: 1 })).toBeVisible();
  });

  it('should render with an offset', async () => {
    renderComponent({
      children: 'Content',
      type: 'critical',
      offset: { x: 2, y: 2 },
    });

    const wrapper = screen.getByTestId('status-wrapper');

    expect(wrapper).toHaveStyle({
      top: '2px',
      right: '-2px',
    });
  });
});
