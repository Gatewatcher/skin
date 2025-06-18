import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import type { ButtonIconProps } from '..';
import ButtonIcon from '..';

describe('ButtonIcon', () => {
  const TEST_ID: TestId = 'button-icon';

  const renderComponent = (props: Partial<ButtonIconProps> = {}) => {
    return render(<ButtonIcon {...props} data-testid={TEST_ID} icon="Add" />);
  };

  const getBtn = async () => screen.findByRole('button');

  it('should have an icon', async () => {
    renderComponent();
    const icon = await screen.findByRole('img');
    expect(icon).toBeVisible();
  });

  it('should be neutral', async () => {
    renderComponent({ type: 'neutral' });
    expect(await screen.findByRole('button')).toHaveClass('containedNeutral');
  });

  it('should have small size', async () => {
    renderComponent({ size: 'small' });
    const btn = await getBtn();
    expect(btn).toHaveClass('sizeSmall');
  });
});
