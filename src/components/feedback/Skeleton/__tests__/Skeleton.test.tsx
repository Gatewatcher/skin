import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render } from '@testing-library/react';

import type { SkeletonProps } from '..';
import Skeleton from '..';

describe('Skeleton', () => {
  const TEST_ID: TestId = 'skeleton';

  const renderComponent = (props: Partial<SkeletonProps> = {}) =>
    render(<Skeleton data-testid={TEST_ID} {...props} />);

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });
});
