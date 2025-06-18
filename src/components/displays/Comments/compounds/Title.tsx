import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import { Stack } from '@/skin/layout';
import { Title as SkinTitle } from '@/skin/typography';

import Badge from '../../Badge';

export type CommentsTitleProps = DataTestId & {
  children: string;
  count?: number;
};

export const Title = ({
  children,
  count,
  'data-testid': testId = 'comments-title',
}: CommentsTitleProps) => {
  const content = (
    <>
      <SkinTitle as="h3" data-testid={testId}>
        {children}
      </SkinTitle>
      {!!count && <Badge type="info">{count}</Badge>}
    </>
  );

  return count ? (
    <Stack alignItems="center" gap={4}>
      {content}
    </Stack>
  ) : (
    content
  );
};

export default Title;
