import { render, screen } from '@testing-library/react';

import type { BreakpointProp } from '@/types';

import type { StackProps } from '..';
import Stack from '..';
import type {
  StackAlignItems,
  StackDirection,
  StackJustifyContent,
  StackWrap,
} from '../types';

describe('Stack component', () => {
  const TEST_ID = 'stack';
  const renderComponent = (props: Partial<StackProps> = {}) =>
    render(<Stack data-testid={TEST_ID} {...props} />);

  it('should render children', () => {
    render(
      <Stack>
        <p>child 1</p>
        <p>child 2</p>
      </Stack>,
    );

    expect(screen.getByText('child 1')).toBeInTheDocument();
    expect(screen.getByText('child 2')).toBeInTheDocument();
  });

  it('should apply the flex direction, align items, justify content, and wrap styles to the container', () => {
    const alignContent = 'flex-start';
    const alignItems = 'center';
    const direction = 'column';
    const justifyContent = 'space-between';
    const wrap = 'wrap-reverse';

    render(
      <Stack
        alignContent={alignContent}
        alignItems={alignItems}
        direction={direction}
        justifyContent={justifyContent}
        wrap={wrap}
      >
        <p>child</p>
      </Stack>,
    );

    const container = screen.getByTestId('stack');
    expect(container).toHaveStyle(`--stack-align-content-xs: ${alignContent}`);
    expect(container).toHaveStyle(`--stack-align-items-xs: ${alignItems}`);
    expect(container).toHaveStyle(`--stack-flex-direction-xs: ${direction}`);
    expect(container).toHaveStyle(
      `--stack-justify-content-xs: ${justifyContent}`,
    );
    expect(container).toHaveStyle(`--stack-flex-wrap-xs: ${wrap}`);
  });

  it('should apply the flex direction, align items, justify content, and wrap styles to the container, for multiple breakpoints', () => {
    const alignContent: BreakpointProp<StackAlignItems> = {
      xs: 'flex-start',
      xxl: 'center',
    };
    const alignItems: BreakpointProp<StackAlignItems> = {
      xs: 'center',
      xxl: 'flex-end',
    };
    const direction: BreakpointProp<StackDirection> = {
      xs: 'column',
      xxl: 'row',
    };
    const justifyContent: BreakpointProp<StackJustifyContent> = {
      xs: 'space-between',
      xxl: 'center',
    };
    const wrap: BreakpointProp<StackWrap> = { xs: 'wrap-reverse', xxl: 'wrap' };

    render(
      <Stack
        alignContent={alignContent}
        alignItems={alignItems}
        direction={direction}
        justifyContent={justifyContent}
        wrap={wrap}
      >
        <p>child</p>
      </Stack>,
    );

    const container = screen.getByTestId('stack');
    expect(container).toHaveStyle(
      `--stack-align-content-xs: flex-start; --stack-align-content-xxl: center`,
    );
    expect(container).toHaveStyle(
      `--stack-align-items-xs: center; --stack-align-items-xxl: flex-end`,
    );
    expect(container).toHaveStyle(
      `--stack-flex-direction-xs: column; --stack-flex-direction-xxl: row`,
    );
    expect(container).toHaveStyle(
      `--stack-justify-content-xs: space-between; --stack-justify-content-xxl: center`,
    );
    expect(container).toHaveStyle(
      `--stack-flex-wrap-xs: wrap-reverse; --stack-flex-wrap-xxl: wrap`,
    );
  });

  it('should have div container', async () => {
    renderComponent();
    const elm = await screen.findByTestId(TEST_ID);

    expect(elm.tagName).toBe('DIV');
  });

  it('should have header container', async () => {
    renderComponent({ as: 'header' });
    const elm = await screen.findByTestId(TEST_ID);

    expect(elm.tagName).toBe('HEADER');
  });

  it('should have custom className', async () => {
    renderComponent({ className: 'custom' });
    expect(await screen.findByTestId(TEST_ID)).toHaveClass('custom');
  });

  it('should have shrink eq 0', async () => {
    renderComponent({
      children: (
        <Stack.Item data-testid="stack-item" flexShrink={0}>
          item
        </Stack.Item>
      ),
    });
    const elm = await screen.findByTestId('stack-item');
    expect(elm).toHaveStyle('--stack-flex-shrink-xs: 0');
  });

  it('should have classNames for every Stack property', async () => {
    renderComponent({
      wrap: 'wrap',
      alignContent: 'center',
      alignItems: 'center',
      direction: 'column',
      flexGrow: 1,
      gap: 2,
      justifyContent: 'center',
    });
    const elm = await screen.findByTestId(TEST_ID);

    expect(elm).toHaveClass(`
      Stack
      alignContent
      alignItems
      flexDirection
      flexWrap
      flexGrow
      gap
      justifyContent
    `);
  });

  it('should have classNames for every Stack.item property', async () => {
    renderComponent({
      children: (
        <Stack.Item
          alignSelf="center"
          data-testid="stack-item"
          flex="1"
          flexBasis="auto"
          flexGrow={1}
          flexShrink={1}
          order={1}
        >
          item
        </Stack.Item>
      ),
    });
    const elm = await screen.findByTestId('stack-item');

    expect(elm).toHaveClass(`
      alignSelf
      flex
      flexBasis
      flexGrow
      flexShrink
      order
    `);
  });
});
