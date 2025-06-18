import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import type { PillProps } from '..';
import Pill from '..';

describe('Pill', () => {
  const TEST_ID: TestId = 'pill';

  const renderComponent = ({
    children = 'content',
    ...props
  }: Partial<PillProps> = {}) =>
    render(
      <Pill data-testid={TEST_ID} {...props}>
        {children}
      </Pill>,
    );

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
    await expectToBeVisibleInTheDocument('content', screen.findByText);
  });

  it('should render icon', async () => {
    renderComponent({ icon: 'Add' });
    await expectToBeVisibleInTheDocument('icon-Add');
  });

  it('should be active', async () => {
    renderComponent({ active: true });
    const pill = await screen.findByTestId(TEST_ID);
    expect(pill).toHaveClass('PillActive');
  });

  it('should be disabled', async () => {
    renderComponent({ disabled: true });
    const pill = await screen.findByTestId(TEST_ID);
    expect(pill).toHaveClass('PillDisabled');
  });
});
