import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { ICON_DEFAULT_SIZE, ICON_SIZES } from '@/constants';
import { Stack } from '@/skin/layout';
import { addInlineRadio } from '@/storybook';

import type { IconAttachmentProps } from '.';
import IconAttachment from '.';

type Story = StoryObj<typeof IconAttachment>;

export default {
  title: 'displays/icons/IconAttachment',
  component: IconAttachment,
  args: {
    size: ICON_DEFAULT_SIZE,
  },
  argTypes: {
    ...addInlineRadio<IconAttachmentProps>('size', ICON_SIZES),
  },
} as Meta<typeof IconAttachment>;

const Template: StoryFn<typeof IconAttachment> = (
  args: IconAttachmentProps,
) => <IconAttachment {...args} />;

export const Default: Story = {
  render: Template,
  args: {
    extension: 'pdf',
  },
};

export const All: Story = {
  render: Template,
  decorators: [
    (Story, { args }) => (
      <Stack gap={7}>
        {[
          'png',
          'doc',
          'pdf',
          'txt',
          'xls',
          'ppt',
          'zip',
          'mp3',
          'html',
          'sql',
          'obj',
          'ai',
          'exe',
          'ttf',
          'notfound',
        ].map(extension => (
          <Story key={extension} args={{ ...args, extension }} />
        ))}
      </Stack>
    ),
  ],
  parameters: {
    controls: { exclude: ['extension'] },
  },
};
