import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
  suffixTestId,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import type { CircularProgressProps } from '..';
import CircularProgress from '..';

describe('CircularProgress', () => {
  const TEST_ID: TestId = 'circular-progress';

  const renderComponent = ({
    percentage = 50,
    ...props
  }: Partial<CircularProgressProps> = {}) =>
    render(
      <CircularProgress
        data-testid={TEST_ID}
        percentage={percentage}
        {...props}
      />,
    );

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
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

  it('should render icon', async () => {
    renderComponent({ icon: 'Add' });
    await expectToBeVisibleInTheDocument('icon-Add');
  });

  it('should render custom div inside', async () => {
    renderComponent({ children: () => <div>inside</div> });
    await expectToBeVisibleInTheDocument('inside', screen.findByText);
  });

  it('should not render icon if children', async () => {
    renderComponent({ icon: 'Add', children: () => <div>inside</div> });
    await expectToBeVisibleInTheDocument('inside', screen.findByText);
    await expectNotToBeVisibleInTheDocument('icon');
  });

  it('should have small size', async () => {
    renderComponent({ size: 'small' });
    expect(await screen.findByTestId('progress-circular-line')).toHaveClass(
      'lineCircularSmall',
    );
  });

  it('should be infinite', async () => {
    renderComponent({ isInfinite: true });
    await expectToBeVisibleInTheDocument(suffixTestId(TEST_ID, 'infinite'));
  });
});
