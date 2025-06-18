import { useCopyToClipboard } from '@gatewatcher/bistoury/hooks';
import type { UseCopyToClipboardOptions } from '@gatewatcher/bistoury/hooks';
import type { MouseEvent } from 'react';

import { useToasts } from '@/skin/feedback';

import FloatingActions from '../..';
import type { FloatingActionsButtonProps } from '../Button';

export type FloatingActionsCopyToClipboardProps =
  Partial<FloatingActionsButtonProps> &
    Partial<UseCopyToClipboardOptions> & {
      clipText: string;
    };

const FloatingActionsCopyToClipboard = ({
  clipText,
  'data-testid': testId = 'floating-actions-copy-to-clipboard',
  icon = 'Copy',
  label = 'Copy to clipboard',
  onClick,
  onError,
  onSuccess: onSuccessProps,
  ...rest
}: FloatingActionsCopyToClipboardProps) => {
  const { addToast } = useToasts();
  const onSuccess =
    onSuccessProps ||
    (() =>
      addToast({
        title: 'Copy to clipboard',
        content: 'Text copied',
        type: 'success',
      }));

  const copy = useCopyToClipboard(clipText, {
    onError,
    onSuccess,
  });

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    copy();
    onClick?.(event);
  };

  return (
    <FloatingActions.Button
      data-testid={testId}
      icon={icon}
      label={label}
      onClick={handleClick}
      {...rest}
    />
  );
};

export default FloatingActionsCopyToClipboard;
