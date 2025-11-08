import { faker } from '@faker-js/faker';
import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import MetricsText, { type MetricsTextProps } from '..';

faker.seed(10);

describe('MetricsText', () => {
  const TEST_ID: TestId = 'metrics-text';

  const renderComponent = ({
    children = 'lorem ipsum',
    ...props
  }: Partial<MetricsTextProps> = {}) =>
    render(
      <MetricsText data-testid={TEST_ID} {...props}>
        {children}
      </MetricsText>,
    );

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should have large size', async () => {
    renderComponent({ size: 'large' });
    const element = await screen.findByTestId(TEST_ID);
    expect(element).toHaveClass('sizeLarge');
  });
});
