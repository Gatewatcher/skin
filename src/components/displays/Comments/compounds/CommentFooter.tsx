import { isFunction } from '@gatewatcher/bistoury/utils-lang';
import type { ReactNode } from 'react';

import { Button } from '@/skin/actions';

import Card from '../../cards/Card';
import { useCommentThread } from '../hooks';

import styles from '../styles.module.scss';

export type CommentsCommentFooterProps = {
  id: string;
  repliesCount: number;
  repliesLabel?: string | ((count: number) => string);
  users?: ReactNode;
};

const CommentFooter = ({
  id,
  repliesCount,
  repliesLabel = count => (count > 1 ? `${count} replies` : '1 reply'),
  users,
}: CommentsCommentFooterProps) => {
  const { threadOpened, toggleThread } = useCommentThread(id);

  if (!repliesCount) return null;

  return (
    <Card.Footer alignItems="center" className={styles.footer} gap={7}>
      <Button
        endIcon={threadOpened ? 'ChevronUp' : 'ChevronDown'}
        onClick={toggleThread}
        variant="transparent"
      >
        {isFunction(repliesLabel) ? repliesLabel(repliesCount) : repliesLabel}
      </Button>
      {users}
    </Card.Footer>
  );
};

export default CommentFooter;
