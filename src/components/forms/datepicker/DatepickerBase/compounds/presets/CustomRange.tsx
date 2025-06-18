import type { ReactNode } from 'react';

import { InternalText } from '@/skin/typography/Text';

export type DatepickerPresetCustomRange = {
  children?: ReactNode;
};

export const PresetCustomRange = ({
  children = 'Custom range',
}: DatepickerPresetCustomRange) => {
  return <InternalText>{children}</InternalText>;
};

export default PresetCustomRange;
