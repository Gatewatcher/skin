import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
  suffixTestId,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import type { LinearProgressProps } from '..';
import LinearProgress from '..';

describe('LinearProgress', () => {
  const TEST_ID: TestId = 'linear-progress';

  const renderComponent = ({
    percentage = 50,
    ...props
  }: Partial<LinearProgressProps> = {}) =>
    render(
      <LinearProgress
        data-testid={TEST_ID}
        percentage={percentage}
        {...props}
      />,
    );

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should not be inline', async () => {
    renderComponent();
    expect(await screen.findByTestId(TEST_ID)).toHaveStyle({
      '--stack-flex-direction-xs': 'column',
    });
  });

  it('should be inline', async () => {
    renderComponent({ isInline: true });
    expect(await screen.findByTestId(TEST_ID)).not.toHaveStyle({
      '--stack-flex-direction-xs': 'column',
    });
  });

  it('should have percent text', async () => {
    renderComponent({ percentage: 30 });
    await expectToBeVisibleInTheDocument('30%', screen.findByText);
  });

  it('should render label', async () => {
    renderComponent({ label: 'label' });
    await expectToBeVisibleInTheDocument('label', screen.findByText);
  });

  it('should render error label', async () => {
    renderComponent({ percentage: 30, labelError: 'error', status: 'error' });
    await expectToBeVisibleInTheDocument('error', screen.findByText);
  });

  it('should not render percent if isInfinite', async () => {
    renderComponent({ isInfinite: true, percentage: 10 });
    await expectNotToBeVisibleInTheDocument('10%', screen.queryByText);
  });

  it('should be infinite', async () => {
    renderComponent({ isInfinite: true });
    await expectNotToBeVisibleInTheDocument(suffixTestId(TEST_ID, 'infinite'));
  });
});
