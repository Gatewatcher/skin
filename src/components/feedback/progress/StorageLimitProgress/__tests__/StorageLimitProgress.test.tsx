import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
  suffixTestId,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import type { StorageLimitProgressProps } from '..';
import StorageLimitProgress from '..';

describe('StorageLimitProgress', () => {
  const TEST_ID: TestId = 'storage-limit-progress';
  const ICON_TEST_ID: TestId = `${TEST_ID}-icon`;
  const LINEAR_PROGRESS_TEST_ID: TestId = `${TEST_ID}-linear-progress`;

  const renderComponent = ({
    completedPercentage = 70,
    ...props
  }: Partial<StorageLimitProgressProps> = {}) =>
    render(
      <StorageLimitProgress
        completedPercentage={completedPercentage}
        data-testid={TEST_ID}
        {...props}
      />,
    );

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('icon should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(ICON_TEST_ID);
  });

  it('linear progress should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(LINEAR_PROGRESS_TEST_ID);
  });

  it('should not be inline', async () => {
    renderComponent();
    expect(await screen.findByTestId(LINEAR_PROGRESS_TEST_ID)).toHaveStyle({
      '--stack-flex-direction-xs': 'column',
    });
  });

  it('should be inline', async () => {
    renderComponent({
      isInline: true,
    });
    expect(await screen.findByTestId(LINEAR_PROGRESS_TEST_ID)).not.toHaveStyle({
      '--stack-flex-direction-xs': 'column',
    });
  });

  it('should have percent text', async () => {
    renderComponent({
      completedPercentage: 30,
    });
    await expectToBeVisibleInTheDocument('30%', screen.findByText);
  });

  it('should render label', async () => {
    renderComponent({
      label: 'label',
    });
    await expectToBeVisibleInTheDocument('label', screen.findByText);
  });

  it('should render error label', async () => {
    renderComponent({
      status: 'error',
      labelError: 'error',
      completedPercentage: 30,
    });
    await expectToBeVisibleInTheDocument('error', screen.findByText);
  });

  it('should not render percent if isInfinite', async () => {
    renderComponent({
      isInfinite: true,
      completedPercentage: 10,
    });
    await expectNotToBeVisibleInTheDocument('10%', screen.queryByText);
  });

  it('should be infinite', async () => {
    renderComponent({
      isInfinite: true,
    });
    await expectNotToBeVisibleInTheDocument(suffixTestId(TEST_ID, 'infinite'));
  });
});
