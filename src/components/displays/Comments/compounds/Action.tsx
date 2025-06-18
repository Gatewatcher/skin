import type { ButtonIconProps } from '@/skin/actions';
import { ButtonIcon } from '@/skin/actions';

import Tooltip from '../../floating/Tooltip';

export type CommentsActionProps = Omit<
  ButtonIconProps,
  'size' | 'variant' | 'type'
> & {
  label: string;
};

const Action = ({
  'data-testid': testId = 'comments-action',
  label,
  ...rest
}: CommentsActionProps) => {
  return (
    <Tooltip content={label}>
      <ButtonIcon
        data-testid={testId}
        size="small"
        type="neutral"
        variant="ghosted"
        {...rest}
      />
    </Tooltip>
  );
};

export default Action;
