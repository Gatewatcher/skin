import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import type { UploaderProps } from '.';
import Uploader from '.';

type Story = StoryObj<typeof Uploader>;

export default {
  title: 'forms/inputs/Uploader',
  component: Uploader,
} as Meta<typeof Uploader>;

const Template: StoryFn<typeof Uploader> = (args: UploaderProps) => (
  <Uploader {...args} />
);

export const Default: Story = {
  render: Template,
  args: {
    uploadOptions: {
      endpoint: 'https://httpbin.org/post',
      method: 'POST',
      bodyType: 'formData',
    },
  },
};
