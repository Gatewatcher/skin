import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen, waitFor } from '@testing-library/react';

import type { BackdropProps } from '..';
import Backdrop from '..';

describe('Backdrop', () => {
  const TEST_ID: TestId = 'backdrop';
  const content = 'content';

  const renderComponent = ({
    isMounted,
    slideTransition = {},
    ...props
  }: Partial<BackdropProps> = {}) =>
    render(
      <Backdrop
        data-testid={TEST_ID}
        isMounted={isMounted ?? true}
        slideTransition={slideTransition}
        {...props}
      >
        {content}
      </Backdrop>,
    );

  it('should render', async () => {
    renderComponent();
    await waitFor(async () => {
      await expectToBeVisibleInTheDocument(TEST_ID);
    });
  });

  it('should have content', async () => {
    renderComponent();
    await waitFor(async () => {
      await expectToBeVisibleInTheDocument(content, screen.findByText);
    });
  });

  it('should not be rendered if not isMounted', async () => {
    renderComponent({ isMounted: false });
    await expectNotToBeVisibleInTheDocument('backdrop');
  });

  it('should be transparent', async () => {
    renderComponent({ isTransparent: true });
    expect(await screen.findByTestId(TEST_ID)).toHaveClass('transparent');
  });

  it('should be scrollable', async () => {
    renderComponent();
    expect(await screen.findByTestId(TEST_ID)).toHaveClass('scrollable');
  });

  it('should not be scrollable', async () => {
    renderComponent({ isScrollable: false });
    expect(await screen.findByTestId(TEST_ID)).not.toHaveClass('scrollable');
  });
});
