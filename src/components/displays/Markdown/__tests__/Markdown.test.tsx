import { render, screen } from '@testing-library/react';

import Markdown from '..';
import type { MarkdownProps } from '..';
import { DEFAULT_MARKDOWN } from '../constants';

describe('Markdown', () => {
  const renderComponent = ({ children }: Partial<MarkdownProps> = {}) =>
    render(<Markdown>{children || DEFAULT_MARKDOWN}</Markdown>);

  it('should render', async () => {
    renderComponent();
    expect(await screen.findByText('Title')).toBeInTheDocument();
  });

  it('should have a title', async () => {
    renderComponent();
    expect(await screen.findByText('Title')).toHaveClass('h2');
  });

  it('should have a text', async () => {
    renderComponent();
    expect(await screen.findByText('Text')).toHaveClass('Paragraph');
  });

  it('should have a link', async () => {
    renderComponent();
    expect(await screen.findByText('Link')).toHaveClass('LinkBase');
  });

  it('should render image', async () => {
    renderComponent({
      children: `![alt-image](path/to/image)`,
    });
    expect(await screen.findByAltText('alt-image')).toHaveAttribute(
      'src',
      'path/to/image',
    );
  });
});
