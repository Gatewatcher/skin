import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';
import { NeutralText } from '@/skin/typography';

import Icon from '../../icons/Icon';

export type CommentsDeletedCommentProps = {
  children: ReactNode;
};

export const DeletedComment = ({ children }: CommentsDeletedCommentProps) => {
  return (
    <Stack alignItems="center" gap={2}>
      <Icon color="neutral" name="Error" />
      <NeutralText variant={mode => (mode === 'light' ? 500 : 300)} italic>
        {children}
      </NeutralText>
    </Stack>
  );
};
