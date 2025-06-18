import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/skin/actions';
import { Stack } from '@/skin/layout';
import { addInlineRadio, addText } from '@/storybook';

import AutoSave from '.';
import { DEFAULT_LABELS, STATUSES } from './constants';
import type { Status } from './types';

type Story = StoryObj<typeof AutoSave>;

const meta: Meta<typeof AutoSave> = {
  title: 'feedback/AutoSave',
  component: AutoSave,
  args: {
    labels: DEFAULT_LABELS,
    errorDetail: '',
  },
  argTypes: {
    ...addInlineRadio('status', STATUSES),
    ...addText('errorDetail', {
      if: { arg: 'status', eq: 'error' },
    }),
  },
};

export default meta;

export const Default: Story = {
  args: {
    status: 'idle',
  },
};

export const All: Story = {
  render: args => {
    return (
      <>
        {STATUSES.map(status => (
          <AutoSave key={status} status={status} />
        ))}
        <AutoSave {...args} status="error" />
      </>
    );
  },
  args: { errorDetail: 'Custom error message' },
  parameters: { controls: { exclude: /.*/ } },
};

export const Auto: Story = {
  render: args => {
    const [status, setStatus] = useState<Status>('success');
    const nextRef = useRef<Status>('success');

    useEffect(() => {
      if (status === 'loading') {
        setTimeout(() => {
          setStatus(nextRef.current);
        }, 2000);
      }
    }, [status]);

    const handleSaveToSuccess = () => {
      setStatus('loading');
      nextRef.current = 'success';
    };

    const handleSaveToError = () => {
      setStatus('error');
      nextRef.current = 'error';
    };

    return (
      <>
        <AutoSave {...args} status={status} />
        <Stack gap={3} margin={{ top: 9 }}>
          <Button onClick={handleSaveToSuccess}>Save to success</Button>
          <Button onClick={handleSaveToError} type="danger">
            Save to error
          </Button>
        </Stack>
      </>
    );
  },
  parameters: { controls: { exclude: ['status'] } },
};
