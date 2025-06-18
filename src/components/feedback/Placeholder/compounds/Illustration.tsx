import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';

import type { IllustrationProps } from '@/skin/displays';
import { Illustration as SkinIllustration } from '@/skin/displays';
import { Stack } from '@/skin/layout';

export type PlaceholderIllustrationProps = IllustrationProps;

export const Illustration = ({
  'data-testid': testId = 'placeholder-illustration',
  name,
  size,
}: PlaceholderIllustrationProps) => {
  return (
    <Stack.Item data-testid={testId} margin={{ bottom: 7 }}>
      <SkinIllustration
        data-testid={suffixTestId(testId, name)}
        name={name}
        size={size}
      />
    </Stack.Item>
  );
};
