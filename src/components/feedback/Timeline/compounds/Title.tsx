import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Text } from '@/skin/typography';

export type TitleProps = DataTestId & {
  children: ReactNode;
};

const Title = ({
  children,
  'data-testid': testId = 'timeline-title',
}: TitleProps) => {
  return <Text data-testid={testId}>{children}</Text>;
};

export default Title;
