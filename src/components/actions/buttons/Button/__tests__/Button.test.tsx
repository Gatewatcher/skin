import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import { ICON_SIZES_REM } from '@/constants';

import type { ButtonProps } from '..';
import Button from '..';

describe('Button', () => {
  const TEST_ID: TestId = 'button';
  const content = 'button';

  const renderComponent = (props: Partial<ButtonProps> = {}) => {
    return render(
      <Button data-testid={TEST_ID} {...props}>
        {content}
      </Button>,
    );
  };

  const getButton = async () => screen.findByRole('button');

  it('should be small', async () => {
    renderComponent({ size: 'small' });
    const button = await getButton();
    expect(button).toHaveClass('sizeSmall');
  });

  it('should have icon left', async () => {
    renderComponent({ startIcon: 'Add' });
    const icon = await screen.findByRole('img');
    expect(icon).toBeVisible();
  });

  it('should have icon on right', async () => {
    renderComponent({ startIcon: 'Add' });
    const icon = await screen.findByRole('img');
    expect(icon).toBeVisible();
  });

  it('should have icon on left and right', async () => {
    renderComponent({
      startIcon: 'Add',
      endIcon: 'ArrowDownLeft',
    });
    const icons = await screen.findAllByTestId('icon');
    expect(icons.length).toBe(2);

    expect(icons[0]).toBeVisible();
    expect(icons[1]).toBeVisible();
  });

  it('should be fill', async () => {
    renderComponent({
      fill: true,
    });

    const button = await getButton();
    expect(button).toHaveClass('fill');
  });

  it('should have icon size according to button size', async () => {
    renderComponent({
      startIcon: 'Action',
      size: 'small',
    });

    const icon = await screen.findByTestId('icon');
    expect(icon).toHaveStyle({ width: ICON_SIZES_REM.small });
  });
});
