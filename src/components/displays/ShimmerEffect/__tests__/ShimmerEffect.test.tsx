import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render } from '@testing-library/react';

import type { ShimmerEffectProps } from '..';
import ShimmerEffect from '..';

describe('ShimmerEffect', () => {
  const TEST_ID: TestId = 'SHIMMER_EFFECT';

  const renderComponent = ({ ...props }: Partial<ShimmerEffectProps> = {}) =>
    render(
      <ShimmerEffect data-testid={TEST_ID} {...props}>
        Searching in 3 websites
      </ShimmerEffect>,
    );

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });
});
