import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import type { ButtonFloatProps } from '..';
import ButtonFloat from '..';

describe('ButtonFloat', () => {
  const TEST_ID: TestId = 'button-float';

  const renderComponent = (props: Partial<ButtonFloatProps> = {}) => {
    return render(
      <ButtonFloat {...props} data-testid={TEST_ID} icon="ChevronDown" />,
    );
  };

  const getBtn = async () => screen.findByRole('button');

  it('should have an icon', async () => {
    renderComponent();
    const icon = await screen.findByRole('img');
    expect(icon).toBeVisible();
  });

  it('should be disabled', async () => {
    renderComponent({ disabled: true });
    expect(await screen.findByRole('button')).toBeDisabled();
  });

  it('should have small size', async () => {
    renderComponent({ size: 'small' });
    const btn = await getBtn();
    expect(btn).toHaveClass('buttonFloatSmall');
  });
});
