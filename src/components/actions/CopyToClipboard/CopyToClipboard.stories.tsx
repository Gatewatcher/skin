import type { Meta, StoryObj } from '@storybook/react';

import { ICON_SIZES } from '@/constants';
import { Stack } from '@/skin/layout';
import { addInlineRadio } from '@/storybook';

import {
  COPY_TO_CLIPBOARD_GROWTHS,
  DEFAULT_LEAVE_TRANSITION_DELAY,
  DEFAULT_SUCCESS_DURATION,
  DEFAULT_TRANSITION_DURATION,
} from './constants';
import type { CopyToClipboardProps } from './index';
import CopyToClipboard from './index';

type Story = StoryObj<typeof CopyToClipboard>;

export default {
  title: 'actions/CopyToClipboard',
  component: CopyToClipboard,
  argTypes: {
    ...addInlineRadio<CopyToClipboardProps>('iconSize', ICON_SIZES),
    ...addInlineRadio<CopyToClipboardProps>('grow', COPY_TO_CLIPBOARD_GROWTHS),
  },
} as Meta<typeof CopyToClipboard>;

export const Default: Story = {
  args: {
    alwaysVisible: false,
    clipText: '192.168.1.247',
    delayLeaveTransition: DEFAULT_LEAVE_TRANSITION_DELAY,
    label: '192.168.1.247',
    grow: 'inside',
    iconSize: 'medium',
    successDuration: DEFAULT_SUCCESS_DURATION,
    tooltip: 'Copy to clipboard',
    tooltipPosition: 'right',
    tooltipSuccess: 'Copied',
    tooltipSuccessDuration: DEFAULT_SUCCESS_DURATION,
    transitionSpeed: DEFAULT_TRANSITION_DURATION,
  },
};

export const All: Story = {
  render: args => {
    const extraArgs: Partial<CopyToClipboardProps>[] = [
      { grow: 'inside' },
      { grow: 'outside' },
      { grow: 'inside', alwaysVisible: true },
      { grow: 'outside', alwaysVisible: true },
    ];

    return (
      <>
        {extraArgs.map((extraArgs, index) => (
          <Stack key={index}>
            <CopyToClipboard {...args} {...extraArgs} />
          </Stack>
        ))}
      </>
    );
  },

  args: { ...Default.args },
};
