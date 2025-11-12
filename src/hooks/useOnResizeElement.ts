import { useCallback, useEffect, useRef } from 'react';

export const useOnResizeElement = (onResize?: (rect?: DOMRect) => void) => {
  const onResizeRef = useRef(onResize);

  useEffect(() => {
    onResizeRef.current = onResize;
  }, [onResize]);

  const setElement = useCallback((node: HTMLElement | null) => {
    const observer = new ResizeObserver(() => {
      onResizeRef.current?.(node?.getBoundingClientRect());
    });

    if (node) {
      observer.observe(node);
    } else {
      observer.disconnect();
    }
  }, []);

  return { setElement };
};
