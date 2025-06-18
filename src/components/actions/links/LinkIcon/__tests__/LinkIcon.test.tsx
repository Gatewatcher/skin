import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render } from '@testing-library/react';

import type { LinkIconProps } from '..';
import LinkIcon from '..';

describe('LinkIcon', () => {
  const TEST_ID: TestId = 'link-icon';

  const renderComponent = ({
    to = 'https://www.google.com',
    icon = 'Action',
    ...props
  }: Partial<LinkIconProps> = {}) =>
    render(<LinkIcon data-testid={TEST_ID} icon={icon} to={to} {...props} />);

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument('link-icon');
  });

  it('should have icon', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument('icon-Action');
  });
});
