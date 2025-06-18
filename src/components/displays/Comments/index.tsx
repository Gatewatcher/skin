import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';

import { Stack } from '@/skin/layout';

import Action from './compounds/Action';
import Actions from './compounds/Actions';
import Comment from './compounds/Comment';
import { DeletedComment } from './compounds/CommentDeleted';
import CommentFooter from './compounds/CommentFooter';
import EditAction from './compounds/EditAction';
import Form from './compounds/Form';
import FormUpdate from './compounds/FormUpdate';
import Header from './compounds/Header';
import List from './compounds/List';
import LoadMoreButton from './compounds/LoadMoreButton';
import MoreActions from './compounds/MoreActions';
import Reply from './compounds/Reply';
import ReplyAction from './compounds/ReplyAction';
import Thread from './compounds/Thread';
import Title from './compounds/Title';
import type { CommentsContextType } from './context';
import { CommentsContext } from './context';
import type { CommentOpenedThreads } from './types';

import styles from './styles.module.scss';

export type CommentsProps = DataTestId & {
  children: ReactNode;
};

const Comments = ({
  children,
  'data-testid': testId = 'comments',
}: CommentsProps) => {
  const [openedThreads, setOpenedThreads] = useState<CommentOpenedThreads>({});

  const contextValue = useMemo<CommentsContextType>(
    () => ({
      openedThreads,
      setOpenedThreads,
    }),
    [openedThreads, setOpenedThreads],
  );

  return (
    <CommentsContext.Provider value={contextValue}>
      <Stack
        className={styles.Comments}
        data-testid={testId}
        direction="column"
        gap={7}
      >
        {children}
      </Stack>
    </CommentsContext.Provider>
  );
};

Comments.Action = Action;
Comments.Actions = Actions;
Comments.Comment = Comment;
Comments.CommentFooter = CommentFooter;
Comments.DeletedComment = DeletedComment;
Comments.EditAction = EditAction;
Comments.Header = Header;
Comments.Form = Form;
Comments.FormUpdate = FormUpdate;
Comments.List = List;
Comments.LoadMoreButton = LoadMoreButton;
Comments.MoreActions = MoreActions;
Comments.Reply = Reply;
Comments.ReplyAction = ReplyAction;
Comments.Thread = Thread;
Comments.Title = Title;

export default Comments;
