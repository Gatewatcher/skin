import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
  suffixTestId,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockClipboardWriteText } from 'utils/tests';

import { Toastr } from '@/skin/feedback';

import { DEFAULT_TEST_ID } from '../constants';
import type { CopyToClipboardProps } from '../index';
import CopyToClipboard from '../index';

describe('CopyToClipboard', () => {
  const TEST_ID: TestId = DEFAULT_TEST_ID;
  const ERROR_TOAST_TITLE = 'Copy to clipboard error';

  const renderComponent = (
    { clipText = '', label = '', ...props }: Partial<CopyToClipboardProps> = {},
    { secureContext = true }: { secureContext?: boolean } = {},
  ) => {
    const user = userEvent.setup();

    Object.assign(window, {
      isSecureContext: secureContext,
    });

    return {
      user,
      ...render(
        <Toastr>
          <CopyToClipboard
            clipText={clipText}
            data-testid={TEST_ID}
            errorToastTitle={ERROR_TOAST_TITLE}
            label={label}
            {...props}
          />
        </Toastr>,
      ),
    };
  };

  const getElement = () => screen.findByTestId(TEST_ID);
  const getButton = () => screen.findByTestId(suffixTestId(TEST_ID, 'button'));

  const expectCheckIconVisibility = async (
    icon: 'copy' | 'check',
    shouldBeVisible: boolean,
  ) => {
    const expectVisibility = shouldBeVisible
      ? await expectToBeVisibleInTheDocument
      : await expectNotToBeVisibleInTheDocument;

    await waitFor(async () => {
      await expectVisibility(icon === 'copy' ? 'copy-icon' : 'success-icon');
    });
  };

  it('should call window.navigator.clipboard.writeText()', async () => {
    const { user } = renderComponent();
    const writeTextMock = mockClipboardWriteText();

    await user.hover(await getElement());
    await user.click(await getButton());

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalled();
    });
  });

  it('should call onSuccess()', async () => {
    const onSuccessMock = vi.fn();
    const { user } = renderComponent({ onSuccess: onSuccessMock });

    await user.hover(await getElement());
    await user.click(await getButton());

    await waitFor(() => {
      expect(onSuccessMock).toHaveBeenCalled();
    });
  });

  it('should call onError()', async () => {
    const onErrorMock = vi.fn();
    const { user } = renderComponent({ onError: onErrorMock });
    mockClipboardWriteText(() => {
      throw new Error('Oops');
    });

    await user.hover(await getElement());
    await user.click(await getButton());

    await waitFor(() => {
      expect(onErrorMock).toHaveBeenCalledWith('Oops');
    });

    const toast = screen.getByTestId('toast-error');
    expect(toast).toHaveTextContent(ERROR_TOAST_TITLE);
    expect(toast).toHaveTextContent('Oops');
  });

  it('should display the copy icon', async () => {
    const { user } = renderComponent();

    await user.hover(await getElement());

    await expectCheckIconVisibility('copy', true);
  });

  it('should not display the copy icon', async () => {
    const { user } = renderComponent({}, { secureContext: false });

    await user.hover(await getElement());

    await expectCheckIconVisibility('copy', false);
  });

  it('should display the success icon after the copy', async () => {
    const { user } = renderComponent({
      successDuration: 2000,
      alwaysVisible: true,
    });

    await user.hover(await getElement());
    await user.click(await getButton());

    await expectCheckIconVisibility('check', true);
  });
});
