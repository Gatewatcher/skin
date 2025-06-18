import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { UseCopyToClipboardParams } from 'hooks';
import { useCopyToClipboardWithFeedback } from 'hooks';
import { memo } from 'react';

import type { ButtonProps } from '@/skin/actions';
import { Button } from '@/skin/actions';
import { DEFAULT_SIZE } from '@/skin/actions/buttons/Button/constants';

import { AnimatedCheck } from './AnimatedCheckIcon';
import { DEFAULT_SUCCESS_DURATION, DEFAULT_TEST_ID } from './constants';

import styles from './styles.module.scss';

export type ButtonCopyToClipboardProps = DataTestId &
  UseCopyToClipboardParams &
  Omit<
    ButtonProps,
    'behavior' | 'endElement' | 'icon' | 'onClick' | 'startElement' | 'styles'
  >;

const ButtonCopyToClipboard = ({
  clipText,
  children,
  'data-testid': testId = DEFAULT_TEST_ID,
  endIcon = 'Copy',
  errorToastTitle,
  onError,
  onSuccess,
  size = DEFAULT_SIZE,
  successDuration = DEFAULT_SUCCESS_DURATION,
  variant = 'ghosted',
  ...rest
}: ButtonCopyToClipboardProps) => {
  const { copyToClipboard, isSuccess } = useCopyToClipboardWithFeedback({
    clipText,
    errorToastTitle,
    onError,
    onSuccess,
    successDuration,
  });

  return (
    <Button
      endElement={
        <AnimatedCheck endIcon={endIcon} isSuccess={isSuccess} size={size} />
      }
      className={styles.ButtonCopyToClipboard}
      data-testid={testId}
      endIcon={!isSuccess ? endIcon : undefined}
      onClick={copyToClipboard}
      size={size}
      variant={variant}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default memo(ButtonCopyToClipboard);
