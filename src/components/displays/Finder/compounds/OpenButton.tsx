import type { MouseEvent } from 'react';

import { Button, type ButtonProps } from '@/skin/actions';
import { useFinder } from '@/skin/displays/Finder/compounds/Provider';

type OpenButtonProps = ButtonProps;

const OpenButton = ({ children, ...buttonProps }: OpenButtonProps) => {
  const { setIsOpened } = useFinder();

  const handleOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    buttonProps?.onClick?.(event);
    setIsOpened(true);
  };

  return (
    <Button {...buttonProps} onClick={handleOnClick}>
      {children}
    </Button>
  );
};

export default OpenButton;
