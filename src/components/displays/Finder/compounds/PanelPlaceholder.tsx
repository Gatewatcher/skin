import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { NeutralText } from '@/skin/typography';

export type FinderPanelPlaceholderProps = DataTestId & {
  children: ReactNode;
};

const PanelPlaceholder = ({
  children,
  'data-testid': testId = 'finder-panel-placeholder-label',
}: FinderPanelPlaceholderProps) => {
  return (
    <NeutralText
      data-testid={testId}
      size="small"
      variant={theme => (theme === 'dark' ? 200 : 400)}
    >
      {children}
    </NeutralText>
  );
};

export default PanelPlaceholder;
