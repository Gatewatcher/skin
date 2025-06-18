import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import { memo } from 'react';

import { Stack } from '@/skin/layout';
import type { ListProps } from '@/skin/listings';
import { List } from '@/skin/listings';

import type { UploadFile } from '../../forms/inputs/uploads/types';
import FilesListItem from './compounds/Item';
import { DEFAULT_LIST_FILES, DEFAULT_WITH_PADDING_ON_ENDS } from './constants';

import styles from './styles.module.scss';

export type FilesListProps = DataTestId & {
  children: ListProps<UploadFile>['children'];
  files?: UploadFile[];
  withPaddingOnEnds?: boolean;
};

const FilesList = ({
  children,
  'data-testid': testId = 'files-list',
  files = DEFAULT_LIST_FILES,
  withPaddingOnEnds = DEFAULT_WITH_PADDING_ON_ENDS,
}: FilesListProps) => {
  return (
    <Stack.Item
      className={classNames(!withPaddingOnEnds && styles.withoutPadding)}
      data-testid={testId}
      flexGrow={1}
    >
      <List<UploadFile>
        columns={1}
        data={files}
        gap={0}
        initialPerPage={0}
        loadMoreType="infiniteScroll"
      >
        {(file, rest) => children(file, rest)}
      </List>
    </Stack.Item>
  );
};

FilesList.Item = memo(FilesListItem);
export default FilesList;
