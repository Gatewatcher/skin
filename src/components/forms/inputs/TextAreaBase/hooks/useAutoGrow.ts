import { debounce } from '@gatewatcher/bistoury/utils-event';
import { type RefObject, useEffect } from 'react';

type UseAutoGrowOptions = {
  enabled?: boolean;
  minHeight?: number;
  maxHeight?: number;
};

export const useAutoGrow = (
  ref: RefObject<HTMLTextAreaElement>,
  options: UseAutoGrowOptions = {},
) => {
  const { enabled = true, minHeight = 10, maxHeight } = options;

  useEffect(() => {
    if (!enabled || !ref.current) return;
    const textarea = ref.current;

    const resize = () => {
      textarea.style.height = 'auto';
      const newHeight = textarea.scrollHeight;

      if (maxHeight && newHeight > maxHeight) {
        textarea.style.height = `${maxHeight}px`;
        textarea.style.overflowY = 'auto';
      } else {
        textarea.style.height = `${Math.max(newHeight, minHeight)}px`;
        textarea.style.overflowY = 'hidden';
      }
    };

    const debouncedResize = debounce(resize, 300);
    resize();

    const container = textarea.parentElement;
    const observer = new ResizeObserver(debouncedResize);
    if (container) {
      observer.observe(container);
    }

    textarea.addEventListener('input', resize);
    window.addEventListener('resize', debouncedResize);

    return () => {
      textarea.removeEventListener('input', resize);
      window.removeEventListener('resize', debouncedResize);
      observer.disconnect();
    };
  }, [enabled, ref, minHeight, maxHeight]);
};
