import type { ReactNode } from 'react';

import type { ButtonAsyncProps } from '@/skin/actions';
import { ButtonAsync } from '@/skin/actions';

export type CommentsLoadMoreButtonProps = Omit<ButtonAsyncProps, 'children'> & {
  children?: ReactNode;
};

const LoadMoreButton = ({
  children = 'Load more comments',
  'data-testid': testId = 'comments-load-more-button',
  ...rest
}: CommentsLoadMoreButtonProps) => {
  return (
    <ButtonAsync data-testid={testId} variant="ghosted" {...rest}>
      {children}
    </ButtonAsync>
  );
};

export default LoadMoreButton;
