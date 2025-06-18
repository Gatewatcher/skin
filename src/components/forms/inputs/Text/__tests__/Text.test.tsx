import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockClipboardWriteText } from '@/utils/tests';

import type { TextProps } from '..';
import Text from '..';
import {
  expectHintsToBeInTheDocument,
  expectRequiredToBeInTheDocument,
  expectToBeReadonly,
  expectTypeNotToCallOnChange,
  expectTypeToCallOnChange,
} from '../../__tests__/utils';

describe('Text', () => {
  const TEST_ID: TestId = 'textbox';
  const ROLE = 'textbox';

  const renderComponent = ({ ...props }: Partial<TextProps> = {}) =>
    render(<Text data-testid={TEST_ID} {...props} />);

  const user = userEvent.setup({ writeToClipboard: true });

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should call onChange function', async () => {
    await expectTypeToCallOnChange<TextProps>(renderComponent, {}, async () =>
      screen.getByRole(ROLE),
    );
  });

  it('should be disabled and not call onChange function', async () => {
    await expectTypeNotToCallOnChange<TextProps>(
      renderComponent,
      {},
      async () => screen.getByRole(ROLE),
    );
  });

  it('should display label', async () => {
    renderComponent({ label: 'some-text' });
    expect(screen.getByText('some-text'));
  });

  it('should display required indicator', async () => {
    await expectRequiredToBeInTheDocument<TextProps>(renderComponent);
  });

  it('should display hints', async () => {
    await expectHintsToBeInTheDocument<TextProps>(renderComponent);
  });

  it('should be readonly', async () => {
    await expectToBeReadonly<TextProps>(renderComponent, {}, async () =>
      screen.getByRole(ROLE),
    );
  });

  it('should have custom readonly value', async () => {
    renderComponent({
      readonlyMode: {
        enabled: true,
        label: 'label',
        value: 'value',
      },
    });

    await expectToBeVisibleInTheDocument('value', screen.findByText);
  });

  it('should have a element before', async () => {
    const elementBefore = <div data-testid="element-before"></div>;

    renderComponent({ elementBefore });
    await expectToBeVisibleInTheDocument('element-before');
  });

  it('should have a element after', async () => {
    const elementAfter = <div data-testid="element-after"></div>;

    renderComponent({ elementAfter });
    await expectToBeVisibleInTheDocument('element-after');
  });

  it('should be required but not have * mark', async () => {
    renderComponent({
      label: 'label',
      required: true,
      withRequiredMark: false,
    });

    await expectToBeVisibleInTheDocument('label', screen.findByText);
    await expectNotToBeVisibleInTheDocument('label *', screen.queryByText);
  });

  it('should have copy suffix', async () => {
    renderComponent({
      elementAfter: <Text.CopySuffix clipText="lorem" />,
    });

    const copy = mockClipboardWriteText();

    await expectToBeVisibleInTheDocument('copy-suffix');
    await user.click(await screen.findByTestId('icon-Copy'));

    await waitFor(() => {
      expect(copy).toHaveBeenCalled();
    });
  });

  it('should not copy paste', async () => {
    renderComponent({ withCopyPaste: false });

    const input = await screen.findByRole('textbox');
    await user.click(input);
    await user.paste('copy paste');

    expect(input).not.toHaveValue('copy paste');
    expect(input).toHaveValue('');
  });
});
