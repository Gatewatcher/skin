import { useCommentThread } from '../hooks';
import type { CommentsActionProps } from './Action';
import Action from './Action';

export type CommentReplyActionProps = Omit<
  CommentsActionProps,
  'onClick' | 'icon' | 'label'
> &
  Partial<Pick<CommentsActionProps, 'icon' | 'label'>> & {
    id: string;
  };

const ReplyAction = ({
  'data-testid': testId = 'comments-reply-action',
  icon = 'Comment',
  id,
  label = 'Comment',
  ...rest
}: CommentReplyActionProps) => {
  const { openThread } = useCommentThread(id);

  return (
    <Action
      data-testid={testId}
      icon={icon}
      label={label}
      onClick={openThread}
      {...rest}
    />
  );
};

export default ReplyAction;
