import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';
import type { CSSProperties } from 'react';

import { MAX_SPACING } from '@/constants';

import { withSpacing } from '..';
import type { Spacings } from '../types';

type Props = Spacings & {
  style?: CSSProperties;
};

describe('withSpacing', () => {
  const className = 'classname';
  const TEST_ID: TestId = 'testid';

  const renderComponent = ({ style, ...spacings }: Props) =>
    render(
      withSpacing(
        <div className={className} data-testid={TEST_ID} style={style}>
          content
        </div>,
        spacings,
      ),
    );

  const getComponent = async () => await screen.findByTestId(TEST_ID);

  it('should have base className', async () => {
    renderComponent({ margin: 12 });
    expect(await getComponent()).toHaveClass(className);
  });

  it('should have base style', async () => {
    renderComponent({ margin: 12, style: { background: 'red' } });
    expect(await getComponent()).toHaveStyle({
      background: 'red',
    });
  });

  it('should have styles variables for number', async () => {
    renderComponent({ margin: 12 });
    expect(await getComponent()).toHaveStyle({
      '--margin-xs': 'var(--spacing-12)',
    });
  });

  it('should clamp values', async () => {
    renderComponent({ margin: -2, padding: 20 });
    expect(await getComponent()).toHaveStyle({
      '--margin-xs': 'var(--spacing-0)',
      '--padding-xs': `var(--spacing-${MAX_SPACING})`,
    });
  });

  it('should works with breakpoints', async () => {
    renderComponent({ margin: { sm: 3, xl: 8 } });
    expect(await getComponent()).toHaveStyle({
      '--margin-sm': 'var(--spacing-3)',
      '--margin-xl': 'var(--spacing-8)',
    });
  });

  it('should work with top / bottom...', async () => {
    renderComponent({ margin: { top: 12, left: 4 } });
    expect(await getComponent()).toHaveStyle({
      '--margin-top-xs': 'var(--spacing-12)',
      '--margin-left-xs': 'var(--spacing-4)',
    });
  });

  it('should work with x / y', async () => {
    renderComponent({ margin: { x: 12, y: 4 } });
    expect(await getComponent()).toHaveStyle({
      '--margin-x-xs': 'var(--spacing-12)',
      '--margin-y-xs': 'var(--spacing-4)',
    });
  });

  it('should work with top / left and breakpoints', async () => {
    renderComponent({ margin: { top: { sm: 8, xl: 12 } } });
    expect(await getComponent()).toHaveStyle({
      '--margin-top-sm': 'var(--spacing-8)',
      '--margin-top-xl': 'var(--spacing-12)',
    });
  });

  it('should only received padding and margin properties', async () => {
    const props = { margin: 4, padding: 8, className: 4 };
    render(withSpacing(<div data-testid={TEST_ID}>test</div>, props));

    expect(await getComponent()).not.toHaveStyle({
      '--className-xs': 'var(--className-4)',
    });
    expect(await getComponent()).toHaveStyle({
      '--margin-xs': 'var(--spacing-4)',
      '--padding-xs': 'var(--spacing-8)',
    });
  });
});
