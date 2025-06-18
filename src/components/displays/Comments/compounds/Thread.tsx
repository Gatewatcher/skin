import type { DataItem } from '@/skin/listings';

import type { CommentsListProps } from './List';
import List from './List';

export type CommentsThreadProps<T extends DataItem> = Omit<
  CommentsListProps<T>,
  'emptyElement'
>;

const Thread = <T extends DataItem>({
  'data-testid': testId = 'comments-thread',
  ...rest
}: CommentsThreadProps<T>) => {
  return <List data-testid={testId} {...rest} emptyElement={null} />;
};

export default Thread;
