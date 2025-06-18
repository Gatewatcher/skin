import { ButtonIcon, type ButtonIconProps } from '@/skin/actions';

export type AddTabButtonProps = Pick<ButtonIconProps, 'onClick'>;

export const AddTabButton = ({ onClick }: AddTabButtonProps) => {
  return (
    <ButtonIcon
      aria-label="add tab"
      icon="Add"
      onClick={onClick}
      variant="ghosted"
    />
  );
};
