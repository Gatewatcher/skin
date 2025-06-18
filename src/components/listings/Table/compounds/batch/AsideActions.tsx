import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';

export type BatchAsideActionsProps = {
  children: ReactNode;
};

const BatchAsideActions = ({ children }: BatchAsideActionsProps) => {
  return <Stack>{children}</Stack>;
};

export default BatchAsideActions;
