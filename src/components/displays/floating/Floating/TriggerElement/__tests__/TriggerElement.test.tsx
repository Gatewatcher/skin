import {
  expectToBeVisibleInTheDocument,
  suffixTestId,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import type { TriggerElementProps } from '..';
import TriggerElement from '..';

describe('TriggerElement', () => {
  const TEST_ID: TestId = 'floating';
  const content = <>Trigger</>;

  const renderComponent = ({
    children,
    ...props
  }: Partial<TriggerElementProps> = {}) =>
    render(
      <TriggerElement data-testid={TEST_ID} {...props}>
        {children || content}
      </TriggerElement>,
    );

  it('should render with fragment', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(suffixTestId(TEST_ID, 'trigger'));
  });

  it('should render with html element', async () => {
    renderComponent({ children: <div>Trigger</div> });
    await expectToBeVisibleInTheDocument(suffixTestId(TEST_ID, 'trigger'));
  });

  it('should render classname', async () => {
    renderComponent({ className: 'test' });
    const element = await screen.findByTestId(suffixTestId(TEST_ID, 'trigger'));
    expect(element).toHaveClass('test');
  });
});
