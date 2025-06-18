import { download } from '@gatewatcher/bistoury/utils-api';
import { formatBytes, isFunction } from '@gatewatcher/bistoury/utils-lang';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import { useState } from 'react';

import { ButtonIcon } from '@/skin/actions';
import { Chip, Dropdown, Modal, TextIcon, Tooltip } from '@/skin/displays';
import { Stack } from '@/skin/layout';
import { List } from '@/skin/listings';
import { Text } from '@/skin/typography';
import { buildTestIds } from '@/utils/testIds';

import type { FileStatus } from '../../../forms/inputs/uploads/types';
import {
  DEFAULT_FILE_ERRORS,
  DEFAULT_FILE_STATUS,
  DEFAULT_WITH_DOWNLOAD,
  DEFAULT_WITH_SIZE,
  STATUS_ICONS,
  SUFFIX_TEST_IDS,
} from '../constants';

import styles from '../styles.module.scss';

export type FilesListItemProps = DataTestId & {
  confirmationText?: string | ((file: File) => string);
  downloadText?: string | ((file: File) => string);
  errors?: string[];
  file: File;
  fileType?: string;
  onDelete?: (file: File) => void;
  fileStatus?: FileStatus;
  withDownload?: boolean;
  withSize?: boolean;
};

const FilesListItem = ({
  confirmationText = file => `Are you sure to delete "${file.name}" ?`,
  'data-testid': testId = 'files-list-item',
  errors = DEFAULT_FILE_ERRORS,
  file,
  onDelete,
  fileStatus = DEFAULT_FILE_STATUS,
  fileType,
  withDownload = DEFAULT_WITH_DOWNLOAD,
  withSize = DEFAULT_WITH_SIZE,
}: FilesListItemProps) => {
  const testIds = buildTestIds(testId, SUFFIX_TEST_IDS);

  const size = formatBytes(file.size, 0);
  const confirmText = isFunction(confirmationText)
    ? confirmationText(file)
    : confirmationText;

  const [modalIsOpened, setModalIsOpened] = useState(false);
  const [dropdownIsOpened, setDropdownIsOpened] = useState(false);

  const handleDownload = () => {
    download(file, file.name);
    setDropdownIsOpened(false);
  };

  const handleDelete = () => {
    onDelete && onDelete(file);
  };

  return (
    <List.Item data-testid={testId}>
      <Stack className={styles.ItemModalTrigger}>
        <Stack
          alignItems="center"
          className={styles.ItemFull}
          justifyContent="space-between"
          padding={{ y: 7 }}
        >
          <Stack direction="column" gap={1}>
            <Stack alignItems="center">
              {fileStatus === 'error' && errors.length ? (
                <Tooltip
                  content={errors.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                >
                  <>{STATUS_ICONS[fileStatus]()}</>
                </Tooltip>
              ) : (
                STATUS_ICONS[fileStatus]()
              )}

              <Stack.Item margin={{ left: 2 }}>
                <Text
                  {...(fileStatus === 'error' && {
                    type: fileStatus,
                  })}
                  weight="medium"
                >
                  {file.name}
                </Text>
              </Stack.Item>
              {fileType && (
                <Stack.Item margin={{ left: 4 }}>
                  <Chip type="info">{fileType}</Chip>
                </Stack.Item>
              )}
            </Stack>

            {withSize && (
              <Stack data-testid={testIds.size} gap={4}>
                <Text size="small">{size}</Text>
              </Stack>
            )}
          </Stack>

          <Dropdown
            content={
              <>
                {withDownload && (
                  <Dropdown.Button
                    data-testid={testIds.download}
                    onClick={handleDownload}
                  >
                    <TextIcon startIcon="Download">Download</TextIcon>
                  </Dropdown.Button>
                )}
                <Dropdown.Button
                  data-testid={testIds.delete}
                  onClick={() => setModalIsOpened(opened => !opened)}
                >
                  <TextIcon startIcon="Delete" type="danger">
                    Delete
                  </TextIcon>
                </Dropdown.Button>
              </>
            }
            data-testid={testIds.options}
            isOpened={dropdownIsOpened && !modalIsOpened}
            offset={5}
            onClose={() => setDropdownIsOpened(false)}
            onOpen={() => setDropdownIsOpened(true)}
            placement="bottom-end"
            setIsOpened={setDropdownIsOpened}
            triggerOn="click"
          >
            <ButtonIcon
              icon="OverflowMenuHorizontal"
              type="neutral"
              variant="ghosted"
            />
          </Dropdown>
        </Stack>

        <Modal
          content={
            <Modal.Body>
              {confirmText && <Text>{confirmText}</Text>}
              <Modal.Footer>
                <Modal.BasicActions
                  onCancel={close}
                  onSave={handleDelete}
                  saveLabel="Delete"
                />
              </Modal.Footer>
            </Modal.Body>
          }
          data-testid={testIds.confirmation}
          isOpened={modalIsOpened}
          setIsOpened={setModalIsOpened}
          size="small"
        />
      </Stack>
    </List.Item>
  );
};

export default FilesListItem;
