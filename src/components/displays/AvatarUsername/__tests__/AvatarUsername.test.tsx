import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import type { AvatarUsernameProps } from '..';
import AvatarUsername from '..';

describe('AvatarUsername', () => {
  const TEST_ID: TestId = 'avatar-username';
  const DEFAULT_USERNAME = 'John Doe';

  const renderComponent = ({
    username = DEFAULT_USERNAME,
    ...props
  }: Partial<AvatarUsernameProps> = {}) =>
    render(
      <AvatarUsername data-testid={TEST_ID} username={username} {...props} />,
    );

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should render avatar and username', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument('avatar');
    await expectToBeVisibleInTheDocument(DEFAULT_USERNAME, screen.findByText);
  });

  it('should not have tooltip', async () => {
    renderComponent();
    await expectNotToBeVisibleInTheDocument('floating-trigger');
  });

  it('should have size', async () => {
    renderComponent({ size: 'small' });
    expect(await screen.findByTestId('avatar')).toHaveClass('sizeSmall');
    expect(await screen.findByTestId('text')).toHaveClass('sizeSmall');
  });

  it('should render image', async () => {
    renderComponent({ image: 'image' });
    await expectToBeVisibleInTheDocument('avatar-image');
  });

  it('should render username in custom element', async () => {
    renderComponent({
      usernameElement: (username: string) => (
        <div data-testid="custom">{username}</div>
      ),
    });

    await expectToBeVisibleInTheDocument('custom');
    await expectToBeVisibleInTheDocument(DEFAULT_USERNAME, screen.findByText);
  });

  it('should not render tooltip', async () => {
    await expectNotToBeVisibleInTheDocument('floating-trigger');
  });
});
