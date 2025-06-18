import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import type { RangeProps } from '..';
import Range from '..';
import type { SliderLabelOptions } from '../../SliderBase/types';

describe('Range', () => {
  const TEST_ID: TestId = 'range';
  const defaultValues = [20, 50];

  const renderComponent = ({ value, ...props }: Partial<RangeProps> = {}) =>
    render(
      <Range data-testid={TEST_ID} value={value || defaultValues} {...props} />,
    );

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should render label with values', async () => {
    const value = [10, 70];
    const label = ({ value }: SliderLabelOptions) =>
      `value=${JSON.stringify(value)}`;
    renderComponent({ label, value });
    await expectToBeVisibleInTheDocument(`value=[10,70]`, screen.findByText);
  });
});
