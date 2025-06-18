import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Text } from '@/skin/typography';

export type PlaceholderDescriptionProps = DataTestId & {
  children: ReactNode;
};

export const Description = ({
  children,
  'data-testid': testId = 'placeholder-description',
}: PlaceholderDescriptionProps) => {
  return (
    <Text data-testid={testId} currentColor>
      {children}
    </Text>
  );
};
