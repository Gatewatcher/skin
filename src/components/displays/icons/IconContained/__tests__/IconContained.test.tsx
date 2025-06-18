import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render } from '@testing-library/react';

import type { IconContainedProps } from '..';
import IconContained from '..';

describe('IconContained', () => {
  const TEST_ID: TestId = 'icon-contained';

  const renderComponent = ({
    color,
    ...props
  }: Partial<IconContainedProps> = {}) =>
    render(
      <IconContained
        color={color || 'blue'}
        data-testid={TEST_ID}
        name="Add"
        {...props}
      />,
    );

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });
});
