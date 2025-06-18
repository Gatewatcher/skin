import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import type { HintProps } from '..';
import Hint from '..';

describe('Hint', () => {
  const TEST_ID: TestId = 'hint';
  const DEFAULT_CONTENT = 'hint';

  const renderComponent = ({
    children = DEFAULT_CONTENT,
    ...props
  }: Partial<HintProps> = {}) =>
    render(
      <Hint data-testid={TEST_ID} {...props}>
        {children}
      </Hint>,
    );

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should have content', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(DEFAULT_CONTENT, screen.findByText);
  });

  it('should not have content', async () => {
    renderComponent({ children: [] });
    await expectNotToBeVisibleInTheDocument(TEST_ID);
  });

  it('should be small by default', async () => {
    renderComponent({ size: 'small' });
    expect(await screen.findByTestId(TEST_ID)).toHaveClass('sizeSmall');
  });

  it('should be medium', async () => {
    renderComponent({ size: 'medium' });
    expect(await screen.findByTestId(TEST_ID)).toHaveClass('sizeMedium');
  });
});
