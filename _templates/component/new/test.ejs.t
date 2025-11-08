---
to: <%= componentPath %><%= componentName %>/__tests__/<%= componentName %>.test.tsx
---
import { render } from '@testing-library/react';

import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import { TestId } from '@gatewatcher/bistoury/utils-types';

import <%= componentName %>, { <%= componentName %>Props } from '..';

describe('<%= componentName %>', () => {
  const TEST_ID: TestId = 'CHANGE_THIS';

  const renderComponent = ({ ...props }: Partial<<%= componentName %>Props> = {}) =>
    render(
      <<%= componentName %> data-testid={TEST_ID} {...props} />
    );

  it('should render', async () => {
    renderComponent();
  });
});
