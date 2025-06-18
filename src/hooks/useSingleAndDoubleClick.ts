import { useRef } from 'react';

export type UseSingleAndDoubleClickParams = {
  onClick?: () => void;
  onDoubleClick?: () => void;
  delay?: number;
};

export const useSingleAndDoubleClick = ({
  onClick,
  onDoubleClick,
  delay = 300,
}: UseSingleAndDoubleClickParams) => {
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSingleClick = () => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    } else {
      const timeout = setTimeout(() => {
        if (onClick) {
          onClick();
        }
        clickTimeoutRef.current = null;
      }, delay);
      clickTimeoutRef.current = timeout;
    }
  };

  const handleDoubleClick = () => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
    }

    if (onDoubleClick) {
      onDoubleClick();
    }
  };

  const singleClick = onClick && onDoubleClick ? handleSingleClick : onClick;
  const doubleClick =
    onClick && onDoubleClick ? handleDoubleClick : onDoubleClick;

  return [singleClick, doubleClick];
};
