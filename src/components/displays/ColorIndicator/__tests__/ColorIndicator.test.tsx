import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render } from '@testing-library/react';

import type { ColorIndicatorProps } from '..';
import ColorIndicator from '..';

describe('ColorIndicator', () => {
  const TEST_ID: TestId = 'color-indicator';

  const renderComponent = ({
    color = 'blue',
    ...props
  }: Partial<ColorIndicatorProps> = {}) =>
    render(<ColorIndicator color={color} data-testid={TEST_ID} {...props} />);

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });
});
