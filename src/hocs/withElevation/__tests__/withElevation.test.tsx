import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';

import type { Elevation } from '..';
import { withElevation } from '..';

describe('with Elevation', () => {
  const TEST_ID: TestId = 'base';
  const BaseComponent = <div data-testid={TEST_ID}>base</div>;

  const renderHoc = (elevation?: Elevation) =>
    render(withElevation(BaseComponent, elevation));

  it('should render with elevation', async () => {
    renderHoc(2);
    expect(await screen.findByTestId(TEST_ID)).toHaveClass('Elevation');
    expect(await screen.findByTestId(TEST_ID)).toHaveClass('Elevation2');
  });

  it('should not have elevation', async () => {
    renderHoc();
    expect(await screen.findByTestId(TEST_ID)).not.toHaveClass('Elevation');
  });
});
