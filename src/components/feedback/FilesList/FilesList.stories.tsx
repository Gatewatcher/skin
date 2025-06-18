import { faker } from '@faker-js/faker';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { FILE_STATUS } from '@/skin/forms/inputs/uploads/constants';
import { addInlineRadio } from '@/storybook';

import type { FilesListProps } from '.';
import FilesList from '.';
import type { FilesListItemProps } from './compounds/Item';
import {
  DEFAULT_FILE_INFORMATION,
  DEFAULT_WITH_DOWNLOAD,
  DEFAULT_WITH_PADDING_ON_ENDS,
  DEFAULT_WITH_SIZE,
} from './constants';

faker.seed(10);

const file1 = new File([faker.lorem.paragraphs(50000)], 'img.png', {
  type: 'image/png',
});
const file2 = new File([faker.lorem.paragraphs(1000)], 'file.txt', {
  type: 'text/plain',
});

const file3 = new File([faker.lorem.paragraphs(1000)], 'texte.txt', {
  type: 'text/plain',
});

type Story = StoryObj<typeof FilesList>;

export default {
  title: 'feedback/FilesList',
  component: FilesList,
  args: {
    fileInformation: DEFAULT_FILE_INFORMATION,
    withDownload: DEFAULT_WITH_DOWNLOAD,
    withSize: DEFAULT_WITH_SIZE,
    files: [file1, file2],
    fileType: 'File type',
    withPaddingOnEnds: DEFAULT_WITH_PADDING_ON_ENDS,
  },
  argTypes: {
    ...addInlineRadio<FilesListItemProps>('fileStatus', FILE_STATUS),
  },
} as Meta<typeof FilesList & FilesListItemProps>;

const Template: StoryFn<typeof FilesList & FilesListItemProps> = ({
  files,
  withPaddingOnEnds,
  ...itemProps
}: FilesListProps & Omit<FilesListItemProps, 'file'>) => {
  return (
    <FilesList files={files} withPaddingOnEnds={withPaddingOnEnds}>
      {(file, rest) => (
        <FilesList.Item
          key={file.id || file.name}
          file={file}
          {...rest}
          {...itemProps}
        />
      )}
    </FilesList>
  );
};

export const Default: Story = {
  render: Template,
};

export const WithoutPaddingOnEnds: Story = {
  render: Template,

  args: {
    files: [file1, file2, file3],
    withPaddingOnEnds: false,
  },
};
