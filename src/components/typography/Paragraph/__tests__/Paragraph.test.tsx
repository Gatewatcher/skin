import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import { Text } from '@/skin/typography';
import { renderWithThemeProvider } from '@/tests';

import type { ParagraphProps } from '..';
import Paragraph from '..';

describe('Paragraph', () => {
  const content =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit molestias, dicta aliquam quis, ut iste accusantium possimus nam autem sed quam. Exercitationemz maxime, voluptates nulla accusamus repellendus itaque placeat optio.';
  const TEST_ID: TestId = 'paragraph';

  const renderComponent = (props: Partial<ParagraphProps> = {}) =>
    renderWithThemeProvider(
      <Paragraph data-testid={TEST_ID} {...props}>
        {content}
      </Paragraph>,
    );

  const getParagraph = () => screen.getByTestId(TEST_ID);

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should have content', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(content, screen.findByText);
  });

  it('should render with Text component', async () => {
    const textTestId: TestId = 'text';

    render(
      <Paragraph>
        <Text data-testid={textTestId}>{content}</Text>
      </Paragraph>,
    );

    await expectToBeVisibleInTheDocument(textTestId);
  });

  it('should have currentColor', async () => {
    renderComponent({ currentColor: true });
    const element = getParagraph();
    expect(element).toHaveStyle({ color: 'currentColor' });
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

  it('should have maxLines', async () => {
    renderComponent({ maxLines: 3 });
    const element = await screen.findByTestId(TEST_ID);
    expect(element).toHaveClass('maxLines');
    expect(element).toHaveStyle({ '-webkit-line-clamp': 3 });
  });
});
