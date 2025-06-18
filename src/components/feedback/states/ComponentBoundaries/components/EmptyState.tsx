import { Stack } from '@/skin/layout';
import type { StackProps } from '@/skin/layout';

import Placeholder from '../../../Placeholder';
import { DEFAULT_EMPTY_TITLE, DEFAULT_PADDING } from '../../constants';

export type EmptyStateProps = Pick<StackProps, 'padding'> & {
  title?: string;
};

const EmptyState = ({
  title = DEFAULT_EMPTY_TITLE,
  padding = DEFAULT_PADDING,
}: EmptyStateProps) => {
  return (
    <Stack
      alignItems="center"
      data-testid="empty-state"
      justifyContent="center"
      padding={padding}
    >
      <Placeholder>
        <Placeholder.Illustration name="FolderEmpty" />
        <Placeholder.Title>{title}</Placeholder.Title>
      </Placeholder>
    </Stack>
  );
};

export default EmptyState;
