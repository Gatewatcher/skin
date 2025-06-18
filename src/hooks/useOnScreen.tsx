import type { RefObject } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

export type UseOnScreenOptions = Omit<IntersectionObserverInit, 'root'> & {
  selector?: string;
};

export const useOnScreen = (
  ref: RefObject<HTMLElement>,
  options?: UseOnScreenOptions,
): boolean | undefined => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isOnScreen, setIsOnScreen] = useState<boolean>();

  const callback = useCallback((entries: IntersectionObserverEntryInit[]) => {
    const [target] = entries;

    setIsOnScreen(target.isIntersecting);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(callback, options);
  }, [callback, options]);

  useEffect(() => {
    if (ref.current) {
      const item = options?.selector
        ? ref.current.querySelector(options.selector)
        : ref.current;

      observerRef.current?.observe(item || ref.current);
    }

    return () => observerRef.current?.disconnect();
  }, [ref, options?.selector]);

  return isOnScreen;
};
