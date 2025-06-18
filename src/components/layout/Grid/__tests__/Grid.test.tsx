import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import { MAX_SPACING } from '@/constants';
import { buildCssBreakpointVariables } from '@/utils';

import type { GridProps } from '../index';
import Grid from '../index';

const BREAKPOINTS = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5,
  xxl: 6,
};

const GAPS = {
  xs: 0,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
  xxl: 5,
};

describe('Grid', () => {
  const TEST_ID: TestId = 'grid';

  const renderComponent = ({ children, ...props }: Partial<GridProps> = {}) =>
    render(
      <Grid
        {...props}
        colSpan={BREAKPOINTS}
        columns={BREAKPOINTS}
        data-testid={TEST_ID}
        gap={GAPS}
        isContainer
        isItem
      >
        {children || (
          <Grid colSpan={BREAKPOINTS} rowSpan={BREAKPOINTS} isItem>
            Item
          </Grid>
        )}
      </Grid>,
    );

  const getGrid = () => screen.findByTestId('grid-container');
  const getItem = () => screen.findByTestId('grid-item');

  it('assigns numbers of columns to the container', async () => {
    renderComponent();
    const grid = await getGrid();

    expect(grid).toHaveStyle(
      buildCssBreakpointVariables('grid-columns', BREAKPOINTS),
    );
  });

  it('clamps columns so its value is at least 1', async () => {
    render(
      <Grid columns={-1} isContainer>
        some content
      </Grid>,
    );
    const grid = await getGrid();

    expect(grid).toHaveStyle('--grid-columns-xs: 1');
  });

  it('assigns column spans to the container', async () => {
    renderComponent();
    const grid = await getGrid();

    expect(grid).toHaveStyle(
      buildCssBreakpointVariables('grid-col-span', BREAKPOINTS),
    );
  });

  it('assigns column spans to the item', async () => {
    renderComponent();
    const item = await getItem();

    expect(item).toHaveStyle(
      buildCssBreakpointVariables('grid-col-span', BREAKPOINTS),
    );
  });

  it('assigns row spans to the item', async () => {
    renderComponent();
    const item = await getItem();

    expect(item).toHaveStyle(
      buildCssBreakpointVariables('grid-row-span', BREAKPOINTS),
    );
  });

  it('assigns gap sizes to the container', async () => {
    renderComponent();
    const grid = await getGrid();

    expect(grid).toHaveStyle({
      ...buildCssBreakpointVariables(
        'grid-gap-x',
        GAPS,
        value => `var(--spacing-${value})`,
      ),
      ...buildCssBreakpointVariables(
        'grid-gap-y',
        GAPS,
        value => `var(--spacing-${value})`,
      ),
    });
  });

  it('assigns a single 12 gap to the container', async () => {
    render(
      <Grid gap={12} isContainer>
        some content
      </Grid>,
    );
    const grid = await getGrid();

    expect(grid).toHaveStyle({
      '--grid-gap-x-xs': 'var(--spacing-12)',
      '--grid-gap-y-xs': 'var(--spacing-12)',
    });
  });

  it('clamps gaps between 0 and MAX_SPACING', async () => {
    render(
      <Grid gap={{ xs: -1, xxl: MAX_SPACING + 1 }} isContainer>
        some content
      </Grid>,
    );
    const grid = await getGrid();

    expect(grid).toHaveStyle({
      '--grid-gap-x-xs': 'var(--spacing-0)',
      '--grid-gap-x-xxl': `var(--spacing-${MAX_SPACING})`,
      '--grid-gap-y-xs': 'var(--spacing-0)',
      '--grid-gap-y-xxl': `var(--spacing-${MAX_SPACING})`,
    });
  });

  it('should have minmax className', async () => {
    render(
      <Grid columnsMinSize="300px" isContainer>
        <div>one</div>
        <div>two</div>
      </Grid>,
    );
    const grid = await getGrid();

    expect(grid).toHaveClass('minmax');
  });

  it('should have css variables with minmax', async () => {
    render(
      <Grid columnsMinSize="300px" isContainer>
        <div>one</div>
        <div>two</div>
      </Grid>,
    );

    const grid = await getGrid();
    expect(grid).toHaveStyle({
      '--grid-columns-min-size': '300px',
      '--grid-columns-max-size': '1fr',
      '--grid-repeat': 'auto-fit',
    });
  });

  it('should have gap with x and y', async () => {
    render(
      <Grid gap={{ x: 10, y: 5 }} isContainer>
        <div>one</div>
        <div>two</div>
      </Grid>,
    );

    const grid = await getGrid();
    expect(grid).toHaveStyle({
      '--grid-gap-x-xs': 'var(--spacing-10)',
      '--grid-gap-y-xs': 'var(--spacing-5)',
    });
  });

  it('should have gap with x and y breakpoints', async () => {
    render(
      <Grid gap={{ x: { lg: 12, xs: 4 }, y: 5 }} isContainer>
        <div>one</div>
        <div>two</div>
      </Grid>,
    );

    const grid = await getGrid();
    expect(grid).toHaveStyle({
      '--grid-gap-x-xs': 'var(--spacing-4)',
      '--grid-gap-x-lg': 'var(--spacing-12)',
      '--grid-gap-y-xs': 'var(--spacing-5)',
    });
  });

  it('should have css variables with auto-fill', async () => {
    render(
      <Grid columnsMinSize="300px" repeatAuto="fill" isContainer>
        <div>one</div>
        <div>two</div>
      </Grid>,
    );

    const grid = await getGrid();
    expect(grid).toHaveStyle({
      '--grid-columns-min-size': '300px',
      '--grid-repeat': 'auto-fill',
    });
  });

  it('should have col and row variables', async () => {
    render(
      <Grid columns={3} isContainer>
        <Grid column="2 3" row="2" isItem>
          item
        </Grid>
      </Grid>,
    );

    const item = await getItem();
    expect(item).toHaveStyle({
      '--grid-column-xs': '2 3',
      '--grid-row-xs': '2',
    });
  });

  it('should have col variables with breakpoints', async () => {
    render(
      <Grid columns={3} isContainer>
        <Grid column={{ xs: '2', lg: '4' }} isItem>
          item
        </Grid>
      </Grid>,
    );

    const item = await getItem();
    expect(item).toHaveStyle({
      '--grid-column-xs': '2',
      '--grid-column-lg': '4',
    });
  });

  it('should apply the align items and justify content styles to the container', async () => {
    renderComponent({ justifyContent: 'center', alignItems: 'center' });

    const grid = await getGrid();
    expect(grid).toHaveStyle('--grid-justify-content-xs: center');
    expect(grid).toHaveStyle('--grid-align-items-xs: center');
  });

  it('should apply align self', async () => {
    renderComponent({
      children: (
        <Grid alignSelf="flex-end" isItem>
          content
        </Grid>
      ),
    });

    const item = await getItem();
    expect(item).toHaveStyle('--grid-align-self-xs: flex-end');
  });

  it('should have custom className', async () => {
    renderComponent({ className: 'custom' });
    const grid = await getGrid();

    expect(grid).toHaveClass('custom');
  });

  it('should render a ul', async () => {
    renderComponent({ as: 'ul' });
    const grid = await getGrid();

    expect(grid.tagName).toBe('UL');
  });

  it('should have custom style', async () => {
    renderComponent({ style: { display: 'none' } });
    const grid = await getGrid();

    expect(grid).toHaveStyle({ display: 'none' });
  });

  it('should render as component', async () => {
    renderComponent({
      as: ({ children, ...props }) => (
        <small {...props} data-testid="user-component">
          {children}
        </small>
      ),
    });
    await expectToBeVisibleInTheDocument('user-component');
  });

  it('should not have fill className by default', async () => {
    renderComponent();

    const item = await getGrid();
    expect(item).not.toHaveClass('fill');
  });

  it('should have a fill className', async () => {
    renderComponent({ fill: true });

    const item = await getGrid();
    expect(item).toHaveClass('fill');
  });
});
