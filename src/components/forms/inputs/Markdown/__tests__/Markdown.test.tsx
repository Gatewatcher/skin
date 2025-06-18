import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { MarkdownProps } from '..';
import Markdown from '..';

describe('Markdown', () => {
  const TEST_ID: TestId = 'input-markdown';

  const renderComponent = ({ ...props }: Partial<MarkdownProps> = {}) =>
    render(<Markdown data-testid={TEST_ID} {...props} />);

  const user = userEvent.setup();

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should call onChange', async () => {
    const onChange = vi.fn();

    renderComponent({
      onChange,
    });

    const input = await screen.findByRole('textbox');
    await user.type(input, '# Markdown title');

    expect(onChange).toHaveBeenCalled();
  });

  it('should have defaultValue', async () => {
    renderComponent({
      defaultValue: 'default value',
    });

    expect(await screen.findByRole('textbox')).toHaveValue('default value');
  });

  it('should call onValueChange', async () => {
    const onValueChange = vi.fn();

    renderComponent({
      defaultValue: 'value',
      onValueChange,
    });

    const input = await screen.findByRole('textbox');
    await user.type(input, 'e');

    expect(onValueChange).toHaveBeenNthCalledWith(1, 'valuee');
  });
});
