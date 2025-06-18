import { faker } from '@faker-js/faker';
import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
  suffixTestId,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockURLmethods } from '@/tests';
import { buildTestIds } from '@/utils/testIds';

import type { FilesListProps } from '..';
import FilesList from '..';
import type { FilesListItemProps } from '../compounds/Item';
import { SUFFIX_TEST_IDS } from '../constants';

describe('FilesList', () => {
  const file1 = new File([faker.lorem.paragraphs(50000)], 'img.png', {
    type: 'image/png',
  });
  const file2 = new File([faker.lorem.paragraphs(1000)], 'file.txt', {
    type: 'text/plain',
  });

  const TEST_ID: TestId = 'files-list';
  const TEST_ID_ITEM: TestId = 'files-list-item';

  const user = userEvent.setup();

  const itemTestIds = buildTestIds(TEST_ID_ITEM, SUFFIX_TEST_IDS);

  const renderComponent = ({
    children,
    files = [file1],
    withPaddingOnEnds,
    ...itemProps
  }: Partial<FilesListProps & Omit<FilesListItemProps, 'file'>> = {}) =>
    render(
      <FilesList
        data-testid={TEST_ID}
        files={files}
        withPaddingOnEnds={withPaddingOnEnds}
      >
        {children ||
          (file => (
            <FilesList.Item
              key={file.name}
              data-testid={TEST_ID_ITEM}
              file={file}
              {...itemProps}
            />
          ))}
      </FilesList>,
    );

  const openOptions = async () => {
    const btn = await screen.findByTestId(
      suffixTestId(itemTestIds.options, 'trigger'),
    );
    await user.click(btn);
  };

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should render two items', async () => {
    renderComponent({ files: [file1, file2] });
    const items = await screen.findAllByTestId(TEST_ID_ITEM);
    expect(items).toHaveLength(2);
  });

  it('should not render size', async () => {
    renderComponent({ withSize: false });
    await expectNotToBeVisibleInTheDocument(itemTestIds.size);
  });

  it('should open options', async () => {
    renderComponent();
    await openOptions();
    await expectToBeVisibleInTheDocument(
      suffixTestId(itemTestIds.options, 'content'),
    );
  });

  it('should not have download button', async () => {
    renderComponent({ withDownload: false });
    await openOptions();
    await expectToBeVisibleInTheDocument(
      suffixTestId(itemTestIds.options, 'content'),
    );
    await expectNotToBeVisibleInTheDocument(itemTestIds.download);
  });

  it('should close dropdown on download', async () => {
    mockURLmethods();
    renderComponent();
    await openOptions();
    await user.click(await screen.findByTestId(itemTestIds.download));

    await waitFor(async () => {
      await expectNotToBeVisibleInTheDocument(
        suffixTestId(itemTestIds.options, 'content'),
      );
    });
  });

  it('should render confirmation modal', async () => {
    renderComponent();
    await openOptions();
    const button = await screen.findByText('Delete');
    await user.click(button);
    await expectToBeVisibleInTheDocument(
      suffixTestId(itemTestIds.confirmation, 'content'),
    );
  });

  it('should render custom confirmation modal text', async () => {
    renderComponent({ confirmationText: 'confirm' });
    await openOptions();
    const button = await screen.findByText('Delete');
    await user.click(button);
    await screen.findByText('confirm');
  });

  it('should not have dropdown opened if confirmation modal is opened', async () => {
    renderComponent();
    await openOptions();
    const button = await screen.findByText('Delete');
    await user.click(button);

    await waitFor(async () => {
      await expectNotToBeVisibleInTheDocument(
        suffixTestId(itemTestIds.options, 'content'),
      );
    });
  });

  it('should call onDelete', async () => {
    const onDelete = vi.fn();
    renderComponent({ onDelete });
    await openOptions();
    const deleteButton = await screen.findByTestId(itemTestIds.delete);
    await user.click(deleteButton);
    await user.click(await screen.findByText('Delete'));
    expect(onDelete).toHaveBeenNthCalledWith(1, file1);
  });

  it('should be uploading', async () => {
    renderComponent({ fileStatus: 'uploading' });
    await expectToBeVisibleInTheDocument('circular-loader');
  });

  it('should be on error', async () => {
    renderComponent({ fileStatus: 'error' });
    await expectToBeVisibleInTheDocument('icon-Warning');
  });

  it('should have type', async () => {
    renderComponent({ fileType: 'File type' });
    await expectToBeVisibleInTheDocument('File type', screen.findByText);
  });

  it('should remove ends padding', async () => {
    renderComponent({ withPaddingOnEnds: false });
    const elm = await screen.findByTestId(TEST_ID);
    expect(elm).toHaveClass('withoutPadding');
  });
});
