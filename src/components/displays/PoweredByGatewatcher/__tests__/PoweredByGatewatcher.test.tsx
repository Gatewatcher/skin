import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import type { PoweredByGatewatcherProps } from '..';
import PoweredByGatewatcher from '..';

describe('PoweredByGatewatcher', () => {
  const TEST_ID: TestId = 'powered-by-gatewatcher';

  const renderComponent = ({
    ...props
  }: Partial<PoweredByGatewatcherProps> = {}) =>
    render(<PoweredByGatewatcher data-testid={TEST_ID} {...props} />);

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should render customer label', async () => {
    renderComponent({ label: 'custom label' });
    await expectToBeVisibleInTheDocument('custom label', screen.findByText);
  });
});
