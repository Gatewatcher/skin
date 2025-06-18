import { useCopyToClipboard, useTimeout } from '@gatewatcher/bistoury/hooks';
import type { UseCopyToClipboardOptions } from '@gatewatcher/bistoury/hooks';
import { useState } from 'react';

import { useToasts } from '@/skin/feedback';
import { DEFAULT_DURATION } from '@/skin/feedback/Toastr/constants';

export type UseCopyToClipboardParams = UseCopyToClipboardOptions & {
  clipText: string;
  errorToastTitle?: string;
  successDuration?: number;
};
const DEFAULT_ERROR_TITLE = 'Copy to clipboard error';

export const useCopyToClipboardWithFeedback = ({
  clipText,
  errorToastTitle = DEFAULT_ERROR_TITLE,
  onError,
  onSuccess,
  successDuration,
}: UseCopyToClipboardParams) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [setSuccessTimeout, clearSuccessTimeout] = useTimeout();
  const { addToast } = useToasts();

  const handleSuccess = () => {
    setIsSuccess(true);
    clearSuccessTimeout();

    setSuccessTimeout(() => {
      setIsSuccess(false);
    }, successDuration);

    if (onSuccess) {
      onSuccess();
    }
  };

  const handleError = (reason: string) => {
    addToast({
      content: reason,
      duration: DEFAULT_DURATION,
      title: errorToastTitle,
      type: 'error',
    });

    if (onError) {
      onError(reason);
    }
  };

  const copyToClipboard = useCopyToClipboard(clipText, {
    onError: handleError,
    onSuccess: handleSuccess,
  });

  return {
    copyToClipboard,
    isSuccess,
    setIsSuccess,
  };
};
