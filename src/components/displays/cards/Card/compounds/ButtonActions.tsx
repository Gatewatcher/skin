import type { ButtonActionsProps } from '@/skin/actions';
import { ButtonActions as SkinButtonActions } from '@/skin/actions';
import { Card } from '@/skin/displays';

type CardButtonActionsProps = Omit<ButtonActionsProps, 'children'>;

const ButtonActions = ({
  'data-testid': testId = 'card-button-actions',
  onClick,
  ...rest
}: CardButtonActionsProps) => {
  return (
    <SkinButtonActions data-testid={testId} {...rest}>
      <Card.ButtonIcon
        icon="OverflowMenuHorizontal"
        onClick={onClick}
        type="neutral"
      />
    </SkinButtonActions>
  );
};

export default ButtonActions;
