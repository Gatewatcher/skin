import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';

import FileContent from '.';

faker.seed(10);

type Story = StoryObj<typeof FileContent>;

export default {
  title: 'displays/FileContent',
  component: FileContent,
  args: {
    file: new File([faker.lorem.paragraphs(10)], 'filename.txt'),
    name: '',
  },
} as Meta<typeof FileContent>;

export const Default: Story = {
  args: {},
};

export const NoData: Story = {
  args: {
    file: undefined,
    name: 'filename',
  },
};

export const WithLoader: Story = {
  args: {
    file: new File([faker.lorem.sentences(200000)], 'file.txt'),
  },
};

export const WithError: Story = {
  args: {
    file: 'Bootstrap is wonderful' as unknown as File,
    name: 'filename',
  },
};

export const WithCustomErrorPlaceholder: Story = {
  args: {
    file: 'Bootstrap is wonderful' as unknown as File,
    name: 'filename',
    errorPlaceholder: () => <div>Some error message</div>,
  },
};
