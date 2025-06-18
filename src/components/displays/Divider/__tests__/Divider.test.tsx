import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import type { DividerProps } from '..';
import Divider from '..';

describe('Divider', () => {
  const TEST_ID: TestId = 'divider';

  const renderComponent = ({ ...props }: Partial<DividerProps> = {}) =>
    render(<Divider data-testid={TEST_ID} {...props} />);

  const getDivider = async () => await screen.findByTestId(TEST_ID);

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should render in horizontal direction', async () => {
    renderComponent();
    expect(await getDivider()).toHaveClass('directionHorizontal');
  });

  it('should render in vertical direction', async () => {
    renderComponent({ direction: 'vertical' });
    expect(await getDivider()).toHaveClass('directionVertical');
  });

  it('should have margin', async () => {
    renderComponent({ margin: 4 });
    expect(await getDivider()).toHaveStyle({
      '--margin-xs': 'var(--spacing-4)',
    });
  });
});
