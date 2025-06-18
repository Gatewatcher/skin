import type { MouseEvent } from 'react';

import type { ButtonAsyncProps } from '@/skin/actions';
import { ButtonAsync } from '@/skin/actions';
import { useBatchSelection } from '@/skin/listings/Listing/hooks';

export type BatchActionProps = Pick<
  ButtonAsyncProps,
  'data-testid' | 'type' | 'isLoading'
> &
  Required<Pick<ButtonAsyncProps, 'children' | 'startIcon' | 'onClick'>> & {
    withResetOnClick?: boolean;
  };

const BatchAction = ({
  onClick,
  withResetOnClick = true,
  ...rest
}: BatchActionProps) => {
  const { clear } = useBatchSelection();

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    await onClick(event);
    withResetOnClick && clear();
  };

  return (
    <ButtonAsync
      {...rest}
      onClick={handleClick}
      size="small"
      variant="transparent"
    />
  );
};

export default BatchAction;
