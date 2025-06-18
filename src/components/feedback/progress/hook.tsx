import { useEffect, useState } from 'react';

import type { ProgressBaseProps } from './types';

export type UseProgressParams = Pick<
  ProgressBaseProps,
  'isInfinite' | 'percentage' | 'status'
>;

export const useProgress = ({
  isInfinite: isInfiniteProps,
  percentage,
  status: statusProps,
}: UseProgressParams) => {
  const [status, setStatus] = useState(statusProps);
  const [isInfinite, setIsInfinite] = useState(isInfiniteProps);

  useEffect(() => {
    if (percentage >= 100) {
      setStatus(statusProps ?? 'success');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentage]);

  useEffect(() => {
    setIsInfinite(isInfiniteProps);
  }, [isInfiniteProps]);

  useEffect(() => {
    if (statusProps) {
      setStatus(statusProps);
      setIsInfinite(false);
    }
  }, [statusProps]);

  return { status, isInfinite };
};
