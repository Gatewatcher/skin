import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { screen } from '@testing-library/react';

import { renderWithThemeProvider } from '@/tests';

import type { TextProps } from '..';
import Text from '..';

describe('Text', () => {
  const content = 'Some content';
  const TEST_ID: TestId = 'text';

  const renderComponent = ({
    children = content,
    ...props
  }: Partial<TextProps> = {}) =>
    renderWithThemeProvider(
      <Text data-testid={TEST_ID} {...props}>
        {children}
      </Text>,
    );

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should have content', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(content, screen.findByText);
  });

  it('should render tag according to as props', async () => {
    renderComponent({ as: 'strong' });
    const element = await screen.findByTestId(TEST_ID);
    expect(element.tagName).toBe('STRONG');
  });

  it('should be underlined', async () => {
    renderComponent({ underline: true });
    const element = await screen.findByTestId(TEST_ID);
    expect(element).toHaveClass('underline');
  });

  it('should be italic', async () => {
    renderComponent({ italic: true });
    const element = await screen.findByTestId(TEST_ID);
    expect(element).toHaveClass('italic');
  });

  it('should be underlined and italic', async () => {
    renderComponent({ italic: true, underline: true });
    const element = await screen.findByTestId(TEST_ID);
    expect(element).toHaveClass('italic');
    expect(element).toHaveClass('underline');
  });

  it('should render text with small size', async () => {
    renderComponent({ size: 'small' });
    const element = await screen.findByTestId(TEST_ID);
    expect(element).toHaveClass('sizeSmall');
  });

  it('should render text with medium weight', async () => {
    renderComponent({ weight: 'medium' });
    const element = await screen.findByTestId(TEST_ID);
    expect(element).toHaveClass('weightMedium');
  });

  it('should capitalize', async () => {
    renderComponent({ children: 'my text', transform: 'capitalize' });
    const element = await screen.findByTestId(TEST_ID);
    expect(element).toHaveClass('transformCapitalize');
  });

  it('should center', async () => {
    renderComponent({ children: 'my text', alignment: 'center' });
    const element = await screen.findByTestId(TEST_ID);
    expect(element).toHaveClass('alignmentCenter');
  });

  it('should have title', async () => {
    renderComponent({ title: 'my title' });
    const element = await screen.findByTestId(TEST_ID);
    expect(element).toHaveAttribute('title', 'my title');
  });

  it('should have currentColor', async () => {
    renderComponent({ title: 'my title', currentColor: true });
    const element = await screen.findByTestId(TEST_ID);
    expect(element).toHaveStyle({ color: 'currentColor' });
  });

  it('should have alignment center', async () => {
    renderComponent({ alignment: 'center' });
    const element = await screen.findByTestId(TEST_ID);
    expect(element).toHaveClass('alignment', 'alignmentCenter');
  });

  it('should have transform', async () => {
    renderComponent({ transform: 'uppercase' });
    const element = await screen.findByTestId(TEST_ID);
    expect(element).toHaveClass('transformUppercase');
  });

  it('should have inline display', async () => {
    renderComponent({ display: 'inline' });
    const element = await screen.findByTestId(TEST_ID);
    expect(element).toHaveClass('displayInline');
  });

  it('should have no wrap white space', async () => {
    renderComponent({ whiteSpace: 'nowrap' });
    const element = await screen.findByTestId(TEST_ID);
    expect(element).toHaveClass('whiteSpaceNowrap');
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
