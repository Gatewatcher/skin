import { useEffect, useState } from 'react';

import { BREAKPOINTS_MAP } from '@/constants';
import type { Breakpoint } from '@/types';

type UseBreakpointParams = {
  breakpoints?: Breakpoint[];
};

const breakpointsInDescendingOrder = Object.entries(BREAKPOINTS_MAP).sort(
  (a, b) => b[1] - a[1],
) as [Breakpoint, number][];

export const useBreakpoint = ({ breakpoints }: UseBreakpointParams = {}) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('xl');

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      const newBreakpoint =
        breakpointsInDescendingOrder.find(([key, value]) => {
          if (breakpoints?.length) {
            return width >= value && breakpoints.includes(key);
          } else {
            return width >= value;
          }
        })?.[0] || (breakpoints?.length ? breakpoints[0] : 'xs');
      setCurrentBreakpoint(newBreakpoint);
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, [breakpoints]);

  return {
    currentBreakpoint,
  };
};
