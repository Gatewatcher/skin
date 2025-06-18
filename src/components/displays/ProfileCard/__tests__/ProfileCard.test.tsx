import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render } from '@testing-library/react';

import type { ProfileCardProps } from '..';
import ProfileCard from '..';

describe('ProfileCard', () => {
  const TEST_ID: TestId = 'PROFILE_CARD';

  const renderComponent = ({ ...props }: Partial<ProfileCardProps> = {}) =>
    render(
      <ProfileCard
        data-testid={TEST_ID}
        email="alex_smith@gatewatcher.com"
        fullname="Alex Smith"
        username="alex_smith"
        {...props}
      />,
    );

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });
});
