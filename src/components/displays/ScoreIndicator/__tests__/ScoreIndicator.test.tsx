import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';

import type { Type } from '@/types';

import type { ScoreIndicatorProps } from '../';
import ScoreIndicator from '../';

describe('ScoreIndicator', () => {
  const TEST_ID: TestId = 'risk-indicator';
  const DEFAULT_SECTORS: Type[] = ['low', 'medium', 'high', 'critical'];

  const renderComponent = (
    props: ScoreIndicatorProps = {
      value: 42,
      sectors: DEFAULT_SECTORS,
    },
  ) => render(<ScoreIndicator {...props} data-testid={TEST_ID} />);

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should have correct attr with 1st quarter value', async () => {
    renderComponent({ value: 15, sectors: DEFAULT_SECTORS });
    expect(screen.getByTestId(`${TEST_ID}-sector-0`)).toHaveAttribute(
      'data-color',
      'low',
    );
    expect(screen.getByTestId(`${TEST_ID}-sector-1`)).toHaveAttribute(
      'data-color',
      'neutral',
    );
    expect(screen.getByTestId(`${TEST_ID}-sector-2`)).toHaveAttribute(
      'data-color',
      'neutral',
    );
    expect(screen.getByTestId(`${TEST_ID}-sector-3`)).toHaveAttribute(
      'data-color',
      'neutral',
    );
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should have correct attr with 2nd quarter value', async () => {
    renderComponent({ value: 42, sectors: DEFAULT_SECTORS });
    expect(screen.getByTestId(`${TEST_ID}-sector-0`)).toHaveAttribute(
      'data-color',
      'neutral',
    );
    expect(screen.getByTestId(`${TEST_ID}-sector-1`)).toHaveAttribute(
      'data-color',
      'medium',
    );
    expect(screen.getByTestId(`${TEST_ID}-sector-2`)).toHaveAttribute(
      'data-color',
      'neutral',
    );
    expect(screen.getByTestId(`${TEST_ID}-sector-3`)).toHaveAttribute(
      'data-color',
      'neutral',
    );
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should have correct attr with 3rd quarter value', async () => {
    renderComponent({ value: 65, sectors: DEFAULT_SECTORS });
    expect(screen.getByTestId(`${TEST_ID}-sector-0`)).toHaveAttribute(
      'data-color',
      'neutral',
    );
    expect(screen.getByTestId(`${TEST_ID}-sector-1`)).toHaveAttribute(
      'data-color',
      'neutral',
    );
    expect(screen.getByTestId(`${TEST_ID}-sector-2`)).toHaveAttribute(
      'data-color',
      'high',
    );
    expect(screen.getByTestId(`${TEST_ID}-sector-3`)).toHaveAttribute(
      'data-color',
      'neutral',
    );
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should have correct attr with 4th quarter value', async () => {
    renderComponent({ value: 90, sectors: DEFAULT_SECTORS });
    expect(screen.getByTestId(`${TEST_ID}-sector-0`)).toHaveAttribute(
      'data-color',
      'neutral',
    );
    expect(screen.getByTestId(`${TEST_ID}-sector-1`)).toHaveAttribute(
      'data-color',
      'neutral',
    );
    expect(screen.getByTestId(`${TEST_ID}-sector-2`)).toHaveAttribute(
      'data-color',
      'neutral',
    );
    expect(screen.getByTestId(`${TEST_ID}-sector-3`)).toHaveAttribute(
      'data-color',
      'critical',
    );
    await expectToBeVisibleInTheDocument(TEST_ID);
  });
});
