import { faker } from '@faker-js/faker/locale/en';
import { generateUniqId } from '@gatewatcher/bistoury/utils-lang';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import type { ComponentProps, DragEvent } from 'react';
import { useRef, useState } from 'react';

import { withControlledValue } from '@/hocs';
import { ButtonIcon } from '@/skin/actions';
import { Stack } from '@/skin/layout';

import type { ChatBoxProps } from '.';
import ChatBox from '.';

faker.seed(10);

type FileWithId = {
  id: string;
  name: string;
  size: number;
  isLoading?: boolean;
  loadingProgress?: number;
};

type CustomAutoCompletionOption = {
  label: string;
  value: string;
  extraProp?: string;
};

type Story = StoryObj<typeof ChatBox>;

const formatFile = (file: File) => ({
  id: generateUniqId(),
  name: file.name,
  size: file.size,
});

export default {
  title: 'forms/inputs/ChatBox',
  component: ChatBox,
  argTypes: {},
  args: {
    required: true,
    meta: {
      helpers: ['helper text'],
    },
    disabled: false,
    placeholder: 'Placeholder',
  },
} as Meta<typeof ChatBox>;

const ControlledText = withControlledValue<
  ComponentProps<typeof ChatBox<FileWithId, CustomAutoCompletionOption>>
>(ChatBox<FileWithId, CustomAutoCompletionOption>, {
  valuePropName: 'value',
});

const Template: StoryFn<
  typeof ChatBox<FileWithId, CustomAutoCompletionOption>
> = (args: ChatBoxProps<FileWithId, CustomAutoCompletionOption>) => (
  <ControlledText {...args} />
);

export const Default: Story = {
  render: args => {
    const [files, setFiles] = useState<FileWithId[]>([]);

    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      const files = event.dataTransfer?.files;
      if (files) {
        setFiles([...files].map(formatFile));
      } else {
        setFiles([]);
      }
    };

    return <Template {...args} attachments={files} onDrop={handleDrop} />;
  },
};

const ACCEPTED_EXT_REGEXP = /\.(webp|png|jpg|jpeg)$/;

export const WithErrors: Story = {
  render: args => {
    const [files, setFiles] = useState<FileWithId[]>();

    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      const files = event.dataTransfer?.files;
      if (files) {
        setFiles([...files].map(formatFile));
      } else {
        setFiles([]);
      }
    };

    const handleFileError = (file: FileWithId) => {
      if (!file.name.match(ACCEPTED_EXT_REGEXP)) {
        return 'Bad file extension';
      }
      if (file.size > 1_000_000) {
        return 'File too heavy. Max size: 1Mo';
      }
    };

    return (
      <Template
        {...args}
        attachments={files}
        onAttachmentError={handleFileError}
        onDrop={handleDrop}
        placeholder="Max size: 1Mo. Ext: webp,png,jpg,jpeg"
      />
    );
  },
};

const DEFAULT_FILES: FileWithId[] = [
  new File(['(⌐□_□)'], 'chuckNorris.png', {
    type: 'image/png',
  }),
  new File(['(⌐□_□)'], 'jeanclaudevandamne.png', {
    type: 'image/png',
  }),
].map(formatFile);

export const WithDefaultFile: Story = {
  render: args => {
    const [files, setFiles] = useState<FileWithId[]>(DEFAULT_FILES);

    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      const files = event.dataTransfer?.files;
      if (files) {
        setFiles([...files].map(formatFile));
      } else {
        setFiles([]);
      }
    };

    const handleFileError = (file: FileWithId) => {
      if (!file.name.match(ACCEPTED_EXT_REGEXP)) {
        return 'Bad file extension';
      }
      if (file.size > 1_000_000) {
        return 'File too heavy. Max size: 1Mo';
      }
    };

    return (
      <Template
        {...args}
        attachments={files}
        onAttachmentError={handleFileError}
        onDrop={handleDrop}
        placeholder="Max size: 1Mo. Ext: webp,png,jpg,jpeg"
      />
    );
  },
};

const filesWithLongName: FileWithId[] = [
  new File(['(⌐□_□)'], 'chuckNorris.png', {
    type: 'image/png',
  }),
  new File(
    ['(⌐□_□)'],
    'sdfjkl sdjfkls dfjioew jfdslkjf aioej fklsdjfasdfsdf sdfjkl sdjfkls dfjioew jfdslkjf aioej fklsdjfasdfsdf sdflk asdfkl jsdfoij ewflk sd ksf sdfsd.png',
    {
      type: 'image/png',
    },
  ),
].map(formatFile);

export const WithLongFileNameAndSubmitButton: Story = {
  render: args => {
    const [files, setFiles] = useState<FileWithId[]>(filesWithLongName);

    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      const files = event.dataTransfer?.files;
      if (files) {
        setFiles([...files].map(formatFile));
      } else {
        setFiles([]);
      }
    };

    const handleFileError = (file: FileWithId) => {
      if (!file.name.match(ACCEPTED_EXT_REGEXP)) {
        return 'Bad file extension';
      }
      if (file.size > 1_000_000) {
        return 'File too heavy. Max size: 1Mo';
      }
    };

    const handleDelete = (file: FileWithId) => {
      setFiles(prev => prev.filter(({ id }) => id !== file.id));
    };

    return (
      <Template
        {...args}
        elementAfter={
          <Stack.Item alignSelf="flex-end">
            <ButtonIcon icon="SendFilled" variant="ghosted" />
          </Stack.Item>
        }
        attachments={files}
        onAttachmentDelete={handleDelete}
        onAttachmentError={handleFileError}
        onDrop={handleDrop}
        placeholder="Max size: 1Mo. Ext: webp,png,jpg,jpeg"
      />
    );
  },
};

const DEFAULT_LOADING_FILES = DEFAULT_FILES.map(file => ({
  ...file,
  isLoading: true,
}));

export const WithLoadingAttachment: Story = {
  render: args => {
    return <Template {...args} attachments={DEFAULT_LOADING_FILES} />;
  },
};

export const WithDelete: Story = {
  render: args => {
    const [files, setFiles] = useState<FileWithId[]>(DEFAULT_FILES);

    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      const files = event.dataTransfer?.files;
      if (files) {
        setFiles([...files].map(formatFile));
      } else {
        setFiles([]);
      }
    };

    const handleDelete = (file: FileWithId) => {
      setFiles(prev => prev.filter(({ id }) => id !== file.id));
    };

    return (
      <Template
        {...args}
        attachments={files}
        onAttachmentDelete={handleDelete}
        onDrop={handleDrop}
      />
    );
  },
};

export const WithRef: Story = {
  render: args => {
    const [files, setFiles] = useState<FileWithId[]>(DEFAULT_FILES);
    const ref = useRef<HTMLTextAreaElement>(null);

    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      const files = event.dataTransfer?.files;
      if (files) {
        setFiles([...files].map(formatFile));
      } else {
        setFiles([]);
      }
      if (ref?.current) {
        ref.current.focus();
      }
    };

    return (
      <ChatBox
        {...args}
        ref={ref}
        attachments={files}
        onDrop={handleDrop}
        placeholder="Max size: 1Mo. Ext: webp,png,jpg,jpeg"
      />
    );
  },
};

export const WithAutoCompletion: Story = {
  render: args => {
    const [files, setFiles] = useState<FileWithId[]>(filesWithLongName);

    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      const files = event.dataTransfer?.files;
      if (files) {
        setFiles([...files].map(formatFile));
      } else {
        setFiles([]);
      }
    };

    const handleFileError = (file: FileWithId) => {
      if (!file.name.match(ACCEPTED_EXT_REGEXP)) {
        return 'Bad file extension';
      }
      if (file.size > 1_000_000) {
        return 'File too heavy. Max size: 1Mo';
      }
    };

    const handleDelete = (file: FileWithId) => {
      setFiles(prev => prev.filter(({ id }) => id !== file.id));
    };

    const handleOptionSelect = (option: { label: string; value: string }) => {
      console.log('option', option);
    };

    return (
      <Template
        {...args}
        autoCompletionSettings={{
          options: [
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
            {
              label: 'action4',
              value: 'action4',
            },
            {
              label: 'action5',
              value: 'action5',
            },
          ],
          onSelect: handleOptionSelect,
          filterOptions: (options, { lastWord }) =>
            options.filter(option => option.value.startsWith(lastWord)),
        }}
        elementAfter={
          <Stack.Item alignSelf="flex-end">
            <ButtonIcon icon="SendFilled" variant="ghosted" />
          </Stack.Item>
        }
        attachments={files}
        onAttachmentDelete={handleDelete}
        onAttachmentError={handleFileError}
        onDrop={handleDrop}
        placeholder="Max size: 1Mo. Ext: webp,png,jpg,jpeg"
      />
    );
  },
};
