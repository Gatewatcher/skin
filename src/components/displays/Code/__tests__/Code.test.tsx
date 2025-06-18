import { render, screen } from '@testing-library/react';

import type { CodeProps } from '@/skin/displays/Code';
import Code from '@/skin/displays/Code';

describe('Code unit tests', () => {
  const renderComponent = ({
    children = '',
    ...props
  }: Partial<CodeProps> = {}) => {
    return render(<Code {...props}>{children}</Code>);
  };

  const getCodeElement = () => screen.getByTestId('code');

  it('should render a code element with some content', async () => {
    renderComponent({ children: 'some code', inline: true });
    const codeElement = screen.getByText('some code')?.closest('code');
    expect(codeElement).toBeVisible();
  });

  it('should be wrapped in a Text when inline', async () => {
    renderComponent({ children: 'some code', inline: true });
    const codeElement = getCodeElement();
    expect(codeElement.closest('.Text')).toBeVisible();
  });

  it('should be rendered as block when multiline', async () => {
    renderComponent({
      children: 'some code',
      inline: false,
    });
    const codeElement = getCodeElement();
    expect(codeElement).toHaveClass('block');
  });

  it('should be wrapped in a Paragraph when multiline', () => {
    renderComponent({
      children: 'some code',
      inline: false,
      language: 'javascript',
    });
    const codeElement = getCodeElement();
    expect(codeElement.closest('.Paragraph')).toBeVisible();
    expect(codeElement).toHaveClass('language-javascript');
  });

  it('should have a language class', async () => {
    renderComponent({
      children: 'some code',
      inline: false,
      language: 'javascript',
    });
    const codeElement = getCodeElement();
    expect(codeElement).toHaveClass('language-javascript');
  });
});
