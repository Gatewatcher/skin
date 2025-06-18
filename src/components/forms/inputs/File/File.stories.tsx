import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { withRouter } from 'storybook-addon-react-router-v6';

import { ICON_NAMES } from '@/constants';
import {
  BUTTON_TYPES,
  BUTTON_VARIANTS,
} from '@/skin/actions/buttons/ButtonBase/constants';
import FilesList from '@/skin/feedback/FilesList';
import type { StackProps } from '@/skin/layout';
import { Stack } from '@/skin/layout';
import { STACK_DIRECTIONS } from '@/skin/layout/Stack/constants';
import { addInlineRadio, addSelect } from '@/storybook';

import type { FileProps } from '.';
import File from '.';
import { DEFAULT_BUTTON_TYPE, DEFAULT_BUTTON_VARIANT } from './constants';

type Story = StoryObj<typeof File>;

export default {
  title: 'forms/inputs/File',
  component: File,
  argTypes: {
    onChange: { action: 'value changed' },
    ...addInlineRadio<FileProps>('type', BUTTON_TYPES),
    ...addInlineRadio<FileProps>('variant', BUTTON_VARIANTS),
    ...addSelect<FileProps>('endIcon', ICON_NAMES),
    ...addSelect<FileProps>('startIcon', ICON_NAMES),
  },
  args: {
    accept: '',
    disabled: false,
    label: 'Upload file(s)',
    multiple: false,
    required: false,
    type: DEFAULT_BUTTON_TYPE,
    variant: DEFAULT_BUTTON_VARIANT,
    endIcon: 'Download',
  },
  decorators: [withRouter],
} as Meta<typeof File>;

const Template: StoryFn<typeof File> = (args: FileProps) => {
  return <File {...args} />;
};

export const Default: Story = {
  render: Template,
};

export const WithList: Story = {
  render: ({
    direction = 'column',
    ...args
  }: FileProps & Pick<StackProps, 'direction'>) => {
    const [currentFiles, setCurrentFiles] = useState<File[]>([]);

    const handleChange = ({ files }: { files: File[] }) => {
      setCurrentFiles(files);
    };

    const handleDelete = (file: File) => {
      setCurrentFiles(prev => prev.filter(f => f.name !== file.name));
    };

    return (
      <Stack direction={direction} gap={6}>
        <File {...args} onChange={handleChange} />

        <FilesList files={currentFiles}>
          {file => (
            <FilesList.Item
              key={file.name}
              file={file}
              onDelete={handleDelete}
            />
          )}
        </FilesList>
      </Stack>
    );
  },

  argTypes: {
    ...addInlineRadio<StackProps>('direction', STACK_DIRECTIONS),
  },
};
