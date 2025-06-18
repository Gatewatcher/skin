import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactElement, ReactNode } from 'react';
import { useMemo, useState } from 'react';

import { Stack } from '@/skin/layout';
import { NeutralText, OverflownParagraph, Text } from '@/skin/typography';

import Avatar from '../../Avatar';
import Divider from '../../Divider';
import Card from '../../cards/Card';
import DateTimeRelative from '../../date/DateTimeRelative';
import Icon from '../../icons/Icon';
import type { CommentContextType } from '../context';
import { CommentContext } from '../context';
import { useCommentThread } from '../hooks';
import type { CommentUsername } from '../types';
import { calcMarginLeft, getAvatarColorGenerator, getUsername } from '../utils';
import type { CommentsActionsProps } from './Actions';

import styles from '../styles.module.scss';

export type CommentsCommentProps = DataTestId & {
  actions?: ReactElement<CommentsActionsProps>;
  comment: ReactNode;
  createdAt?: string;
  depth?: number;
  editedText?: string;
  footer?: ReactNode;
  id: string;
  maxHeight?: string | number;
  replyForm?: ReactNode;
  thread?: ReactNode;
  updatedAt?: string;
  username: CommentUsername;
  updateForm?: ReactNode;
};

const Comment = ({
  actions,
  comment,
  createdAt,
  'data-testid': testId = 'comments-comment',
  depth = 0,
  editedText = 'Edited',
  footer,
  id,
  maxHeight = 100,
  replyForm,
  thread,
  updatedAt,
  updateForm,
  username,
}: CommentsCommentProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const { threadOpened } = useCommentThread(id);

  const contextValue = useMemo<CommentContextType>(
    () => ({
      isEditing,
      setIsEditing,
    }),
    [isEditing, setIsEditing],
  );

  return (
    <CommentContext.Provider value={contextValue}>
      <Card
        className={classNames(styles.card, depth !== 0 && styles.lines)}
        data-testid={testId}
        style={{ marginLeft: calcMarginLeft(depth) }}
      >
        <Card.Body>
          {!isEditing ? (
            <>
              <Stack gap={7} justifyContent="space-between">
                <Stack alignItems="flex-start" gap={6}>
                  <Avatar
                    colorGenerator={getAvatarColorGenerator(username)}
                    size="large"
                    username={getUsername(username)}
                    withTooltip={false}
                  />

                  <Stack alignItems="center" gap={6}>
                    <Text weight="medium">{getUsername(username)}</Text>
                    {(updatedAt || createdAt) && (
                      <DateTimeRelative
                        date={(updatedAt || createdAt) as string}
                        size="small"
                        variant={400}
                      />
                    )}
                    {updatedAt && updatedAt !== createdAt && (
                      <>
                        <Stack.Item className={styles.divider}>
                          <Divider direction="vertical" />
                        </Stack.Item>
                        <Stack
                          alignItems="center"
                          className={styles.editIcon}
                          gap={2}
                        >
                          <Icon name="Edit" size="small" currentColor />
                          <NeutralText size="small" variant={400}>
                            {editedText}
                          </NeutralText>
                        </Stack>
                      </>
                    )}
                  </Stack>
                </Stack>
                {actions}
              </Stack>

              <Stack.Item className={styles.message}>
                <OverflownParagraph height={maxHeight}>
                  {comment}
                </OverflownParagraph>
              </Stack.Item>
            </>
          ) : (
            <Stack gap={6}>
              <Avatar
                colorGenerator={getAvatarColorGenerator(username)}
                size="large"
                username={getUsername(username)}
                withTooltip={false}
              />
              <Stack.Item flexGrow={1}>{updateForm}</Stack.Item>
            </Stack>
          )}
        </Card.Body>
        {footer}
      </Card>

      {threadOpened && (
        <>
          {thread}
          {replyForm}
        </>
      )}
    </CommentContext.Provider>
  );
};

export default Comment;
