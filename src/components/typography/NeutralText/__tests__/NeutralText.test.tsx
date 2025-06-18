import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';

import type { NeutralTextProps } from '..';
import NeutralText from '..';

describe('NeutralText', () => {
  const TEST_ID: TestId = 'neutral-text';

  const renderComponent = ({
    children = 'some text',
    ...props
  }: Partial<NeutralTextProps> = {}) =>
    render(
      <NeutralText data-testid={TEST_ID} {...props}>
        {children}
      </NeutralText>,
    );

  const getText = async () => await screen.findByTestId(TEST_ID);

  it('should render', async () => {
    renderComponent();
    expect(await getText()).toHaveStyle({ color: 'var(--color-neutral)' });
  });

  it('should render with custom variant', async () => {
    renderComponent({ variant: 200 });
    expect(await getText()).toHaveStyle({ color: 'var(--color-neutral-200)' });
  });

  it('should have variant as function', async () => {
    const variant = vi.fn().mockReturnValue(300);
    renderComponent({ variant });
    expect(variant).toBeCalledTimes(1);
    expect(await getText()).toHaveStyle({ color: '--var(color-neutral-300' });
  });

  it('should have overflow wrap', async () => {
    renderComponent({ overflowWrap: 'anywhere' });
    const element = await screen.findByTestId(TEST_ID);
    expect(element).toHaveClass('overflowWrapAnywhere');
  });

  it('should have word break', async () => {
    renderComponent({ wordBreak: 'break-all' });
    const element = await screen.findByTestId(TEST_ID);
    expect(element).toHaveClass('wordBreakBreakAll');
  });
});
