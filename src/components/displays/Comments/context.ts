import type { Dispatch, SetStateAction } from 'react';
import { createContext, useContext } from 'react';

import type { CommentOpenedThreads } from './types';

export type CommentsContextType = {
  openedThreads: CommentOpenedThreads;
  setOpenedThreads: Dispatch<SetStateAction<CommentOpenedThreads>>;
};

export const CommentsContext = createContext<CommentsContextType>({
  openedThreads: {},
  setOpenedThreads: () => {},
});

export const useCommentsContext = () => useContext(CommentsContext);

// ------------------------------------------

export type CommentContextType = {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

export const CommentContext = createContext<CommentContextType>({
  isEditing: false,
  setIsEditing: () => {},
});

export const useCommentContext = () => useContext(CommentContext);
