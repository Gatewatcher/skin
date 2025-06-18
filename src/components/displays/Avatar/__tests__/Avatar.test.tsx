import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';

import type { AvatarProps } from '..';
import Avatar from '..';
import type { AvatarStackProps } from '../compounds/Stack';

describe('Avatar', () => {
  const TEST_ID: TestId = 'avatar';
  const STACK_TEST_ID = 'avatar-stack';
  const DEFAULT_USERNAME = 'John Doe';

  const renderComponentWithUsername = ({
    username = DEFAULT_USERNAME,
    ...props
  }: Partial<Omit<AvatarProps, 'image'>> = {}) =>
    render(<Avatar data-testid={TEST_ID} username={username} {...props} />);

  const renderComponentWithImage = ({
    image = 'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAErkJggg==',
    ...props
  }: Partial<Omit<AvatarProps, 'username'>> = {}) =>
    render(<Avatar data-testid={TEST_ID} image={image} {...props} />);

  const renderStack = ({
    children,
    ...props
  }: Partial<AvatarStackProps> = {}) =>
    render(
      <Avatar.Stack data-testid={STACK_TEST_ID} {...props}>
        {children || [
          <Avatar key="A" username="A" />,
          <Avatar key="B" username="B" />,
          <Avatar key="C" username="C" />,
          <Avatar key="D" username="D" />,
        ]}
      </Avatar.Stack>,
    );

  const user = userEvent.setup();

  it('should render', async () => {
    renderComponentWithUsername();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should render with image', async () => {
    renderComponentWithUsername();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should be medium', async () => {
    renderComponentWithUsername();
    const avatar = await screen.findByTestId(TEST_ID);
    expect(avatar).toHaveClass('sizeMedium');
  });

  it('should be large', async () => {
    renderComponentWithUsername({
      size: 'large',
    });
    const avatar = await screen.findByTestId(TEST_ID);
    expect(avatar).toHaveClass('sizeLarge');
  });

  it('should have intial', async () => {
    renderComponentWithUsername();
    await expectToBeVisibleInTheDocument('avatar-text');
    await expectToBeVisibleInTheDocument('J', screen.findByText);
  });

  it('should have img', async () => {
    renderComponentWithImage();
    await expectToBeVisibleInTheDocument('avatar-image');
  });

  it('should render with tooltip', async () => {
    renderComponentWithUsername({ username: 'Foo Bar' });
    await user.click(await screen.findByTestId('floating-trigger'));
    await waitFor(async () => {
      await expectToBeVisibleInTheDocument('Foo Bar', screen.findByText);
    });
  });

  it('should not render tooltip if no username', async () => {
    renderComponentWithImage();
    await expectNotToBeVisibleInTheDocument('floating-trigger');
  });

  describe('Stack', () => {
    it('should render stack', async () => {
      renderStack();
      await expectToBeVisibleInTheDocument(STACK_TEST_ID);
    });

    it('should have 3 items', async () => {
      renderStack();
      expect(await screen.findAllByTestId(TEST_ID)).toHaveLength(3);
    });

    it('should have 2 items', async () => {
      renderStack({ max: 2 });
      expect(await screen.findAllByTestId(TEST_ID)).toHaveLength(2);
    });

    it('should clamp max items', async () => {
      renderStack({ max: -3 });
      expect(await screen.findAllByTestId(TEST_ID)).toHaveLength(4);
    });

    it('should have more badge', async () => {
      renderStack();
      await expectToBeVisibleInTheDocument('avatar-stack-trigger');
      await expectToBeVisibleInTheDocument('+1', screen.findByText);
    });

    it('should render popover with 1 items', async () => {
      renderStack();
      await user.click(await screen.findByTestId('avatar-stack-trigger'));
      await waitFor(async () => {
        await expectToBeVisibleInTheDocument('avatar-stack-content');
        expect(
          await within(
            await screen.findByTestId('avatar-stack-content'),
          ).findAllByTestId('avatar-username'),
        ).toHaveLength(1);
      });
    });
  });
});
