import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { addInlineRadio } from '@/storybook';

import FileImage, { type FileImageProps } from '.';
import {
  DEFAULT_RATIO,
  DEFAULT_SIZE,
  FILE_IMAGE_RATIOS,
  FILE_IMAGE_SIZES,
} from './constants';

type Story = StoryObj<typeof FileImage>;

export default {
  title: 'forms/inputs/FileImage',
  component: FileImage,
  argTypes: {
    ...addInlineRadio<FileImageProps>('ratio', FILE_IMAGE_RATIOS),
    ...addInlineRadio<FileImageProps>('size', FILE_IMAGE_SIZES),
  },
  args: {
    label: 'Image file',
    ratio: DEFAULT_RATIO,
    size: DEFAULT_SIZE,
  },
} as Meta<typeof FileImage>;

const Template: StoryFn<typeof FileImage> = (args: FileImageProps) => {
  return <FileImage {...args} />;
};

export const Default: Story = {
  render: Template,
};
