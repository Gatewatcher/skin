import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { ICON_NAMES } from '@/constants';
import { Toastr } from '@/skin/feedback';
import { addSelect } from '@/storybook';

import type { ButtonCopyToClipboardProps } from '.';
import ButtonCopyToClipboard from '.';
import { DEFAULT_SUCCESS_DURATION } from './constants';

type Story = StoryObj<typeof ButtonCopyToClipboard>;

export default {
  title: 'actions/buttons/ButtonCopyToClipboard',
  component: ButtonCopyToClipboard,
  argTypes: {
    ...addSelect('endIcon', ['-', ...ICON_NAMES], { defaultValue: 'Copy' }),
    ...addSelect('startIcon', ['-', ...ICON_NAMES], {
      defaultValue: '-',
    }),
  },
} as Meta<typeof ButtonCopyToClipboard>;

const Template: StoryFn<typeof ButtonCopyToClipboard> = ({
  children,
  endIcon,
  startIcon,
  ...args
}: ButtonCopyToClipboardProps) => {
  const _startIcon = (startIcon as unknown) === '-' ? undefined : startIcon;
  const _endIcon = (endIcon as unknown) === '-' ? undefined : endIcon;

  return (
    <Toastr>
      <ButtonCopyToClipboard
        endIcon={_endIcon}
        startIcon={_startIcon}
        {...args}
      >
        {children}
      </ButtonCopyToClipboard>
    </Toastr>
  );
};

export const Default: Story = {
  render: Template,

  args: {
    clipText: 'Value to copy to the clipboard',
    children: 'copy to clipboard',
    disabled: false,
    size: 'large',
    successDuration: DEFAULT_SUCCESS_DURATION,
    type: 'primary',
    variant: 'ghosted',
  },
};
