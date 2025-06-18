import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';

export type BatchMainActionsProps = {
  children: ReactNode;
};

const BatchMainActions = ({ children }: BatchMainActionsProps) => {
  return <Stack gap={7}>{children}</Stack>;
};

export default BatchMainActions;
