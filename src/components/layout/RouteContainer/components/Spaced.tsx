import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import type { StackProps } from '@/skin/layout';
import { Stack } from '@/skin/layout';

export type SpacedProps = DataTestId &
  StackProps & { spacing?: number; shifted?: true };

const Spaced = ({ children, spacing = 0, shifted, ...rest }: SpacedProps) => {
  return (
    <Stack
      flexGrow={shifted ? 1 : undefined}
      justifyContent={shifted && 'flex-end'}
      margin={{ top: spacing }}
      {...rest}
    >
      {children}
    </Stack>
  );
};

export default Spaced;
