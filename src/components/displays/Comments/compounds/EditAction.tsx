import { useCommentContext } from '../context';
import type { CommentsActionProps } from './Action';
import Action from './Action';

export type CommentsEditActionProps = Omit<
  CommentsActionProps,
  'onClick' | 'icon' | 'label'
> &
  Partial<Pick<CommentsActionProps, 'icon' | 'label'>>;

const EditAction = ({
  'data-testid': testId = 'comments-edit-action',
  icon = 'Edit',
  label = 'Edit',
  ...rest
}: CommentsEditActionProps) => {
  const { setIsEditing } = useCommentContext();

  const handleClick = () => {
    setIsEditing(true);
  };

  return (
    <Action
      data-testid={testId}
      icon={icon}
      label={label}
      onClick={handleClick}
      {...rest}
    />
  );
};

export default EditAction;
