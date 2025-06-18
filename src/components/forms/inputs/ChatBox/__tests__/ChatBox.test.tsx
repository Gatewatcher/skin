import {
  expectToBeVisibleInTheDocument,
  suffixTestId,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Ref } from 'react';

import type { ChatBoxProps } from '..';
import InputChatBox from '..';

const file = { id: 'id', name: 'chuckNorris.png', size: 102, loading: false };

describe('InputChatBox', () => {
  const TEST_ID: TestId = 'input-chat-box';
  const PREVIEW_TEST_ID = suffixTestId(TEST_ID, 'attachment');
  const ERROR_TEST_ID = suffixTestId(PREVIEW_TEST_ID, 'error');
  const DELETE_BUTTON_TEST_ID = suffixTestId(PREVIEW_TEST_ID, 'delete');
  const INPUT_TEST_ID = suffixTestId(TEST_ID, 'input');
  const OPTIONS_LIST_ID = suffixTestId(TEST_ID, 'options');
  const OPTION_LABEL_ID = suffixTestId(TEST_ID, 'option-label');

  const options = [
    {
      label: 'action1',
      value: 'action1',
    },
    {
      label: 'action2',
      value: 'action2',
    },
    {
      label: 'action3',
      value: 'action3',
    },
  ];

  const renderComponent = ({
    onChange = () => {},
    ...props
  }: Partial<
    ChatBoxProps<typeof file, typeof options[0]> & {
      ref: Ref<HTMLTextAreaElement>;
    }
  > = {}) =>
    render(
      <InputChatBox data-testid={TEST_ID} onChange={onChange} {...props} />,
    );

  it('should render an input', async () => {
    renderComponent();

    await expectToBeVisibleInTheDocument(TEST_ID);
    expect(screen.getByTestId(INPUT_TEST_ID)).toBeVisible();
  });

  it('should select a file', async () => {
    renderComponent({ attachments: [file] });

    expect(screen.getByTestId(PREVIEW_TEST_ID)).toBeVisible();
    expect(screen.getByText('chuckNorris')).toBeVisible();
    expect(screen.getByText('.png')).toBeVisible();
  });

  it('should display error file', async () => {
    renderComponent({
      attachments: [file],
      onAttachmentError: () => 'I dont want this file',
    });

    expect(screen.getByTestId(PREVIEW_TEST_ID)).toBeVisible();
    expect(screen.getByTestId(ERROR_TEST_ID)).toBeVisible();
    expect(screen.getByText('I dont want this file')).toBeVisible();
  });

  it('should not display delete button', async () => {
    renderComponent({ attachments: [{ ...file, loading: true }] });

    expect(screen.getByTestId(PREVIEW_TEST_ID)).toBeVisible();
    expect(screen.queryByTestId(DELETE_BUTTON_TEST_ID)).not.toBeInTheDocument();
    await userEvent.hover(screen.getByTestId(PREVIEW_TEST_ID));
    expect(screen.queryByTestId(DELETE_BUTTON_TEST_ID)).not.toBeInTheDocument();
  });

  it('should display second option only', async () => {
    const firstOption = options[0];
    const secondOption = options[1];
    const thirdOption = options[2];
    renderComponent({
      value: secondOption.label,
      autoCompletionSettings: { options },
    });
    const FIRST_OPTION_LABEL_ID = suffixTestId(
      OPTION_LABEL_ID,
      firstOption.value,
    );
    const SECOND_OPTION_LABEL_ID = suffixTestId(
      OPTION_LABEL_ID,
      secondOption.value,
    );
    const THIRD_OPTION_LABEL_ID = suffixTestId(
      OPTION_LABEL_ID,
      thirdOption.value,
    );

    expect(screen.queryByTestId(OPTIONS_LIST_ID)).not.toBeInTheDocument();

    await userEvent.click(screen.getByTestId(INPUT_TEST_ID));

    expect(screen.getByTestId(SECOND_OPTION_LABEL_ID)).toBeVisible();

    expect(screen.queryByTestId(FIRST_OPTION_LABEL_ID)).not.toBeInTheDocument();
    expect(screen.queryByTestId(THIRD_OPTION_LABEL_ID)).not.toBeInTheDocument();
  });
});
