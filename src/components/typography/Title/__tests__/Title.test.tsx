import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import type { TextProps } from '@/skin/typography';
import { Text } from '@/skin/typography';
import { renderWithThemeProvider } from '@/tests';

import type { TitleProps } from '..';
import Title from '..';

describe('Title', () => {
  const content = 'Title';

  const renderComponent = (props: Partial<TitleProps> = {}) =>
    renderWithThemeProvider(<Title {...props}>{content}</Title>);

  it('should render', async () => {
    renderComponent();
    const title = await screen.findByRole('heading');
    expect(title).toBeInTheDocument();
  });

  it('should have content', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(content, screen.findByText);
  });

  it('should render component according to as prop', async () => {
    renderComponent({ as: 'h2' });
    expect(
      await screen.findByRole('heading', { level: 2 }),
    ).toBeInTheDocument();
  });

  it('should render h1 if no as prop', async () => {
    renderComponent();
    expect(
      await screen.findByRole('heading', { level: 1 }),
    ).toBeInTheDocument();
  });

  it('should have title attribute', async () => {
    renderComponent({ title: 'my title' });
    const element = await screen.findByRole('heading');
    expect(element).toHaveAttribute('title', 'my title');
  });

  it('should have currentColor', async () => {
    renderComponent({ title: 'my title', currentColor: true });
    const element = await screen.findByRole('heading');
    expect(element).toHaveStyle({ color: 'currentColor' });
  });

  it('should have overflow wrap', async () => {
    renderComponent({ overflowWrap: 'anywhere' });
    const element = await screen.findByRole('heading');
    expect(element).toHaveClass('overflowWrapAnywhere');
  });

  it('should have word break', async () => {
    renderComponent({ wordBreak: 'break-all' });
    const element = await screen.findByRole('heading');
    expect(element).toHaveClass('wordBreakBreakAll');
  });
});

describe('Title with extra markup', () => {
  const content = 'Title';
  const TEST_ID: TestId = 'title';

  const renderComponent = (
    headingProps: Partial<TitleProps> = {},
    textProps: Partial<TextProps> = {},
  ) =>
    render(
      <Title data-testid={TEST_ID} {...headingProps}>
        <Text {...textProps}>{content}</Text>
      </Title>,
    );

  it('should render h1 and italic span', async () => {
    renderComponent({}, { italic: true });
    const heading = await screen.findByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    const text = heading.querySelector('span');

    expect(text).toBeInTheDocument();
    expect(text?.textContent).toBe(content);
    expect(text).toHaveClass('italic');
  });

  it('should have alignment center', async () => {
    renderComponent({ alignment: 'center' });
    const element = await screen.findByTestId(TEST_ID);
    expect(element).toHaveClass('alignmentCenter');
  });

  it('should have transform', async () => {
    renderComponent({ transform: 'uppercase' });
    const element = await screen.findByTestId(TEST_ID);
    expect(element).toHaveClass('transformUppercase');
  });
});
