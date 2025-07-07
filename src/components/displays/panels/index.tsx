import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';
import { memo } from 'react';

import PanelsGroup from './compounds/PanelsGroup';
import PanelsItem, { ImperativePanelHandle } from './compounds/PanelsItem';
import PanelsResizeHandle from './compounds/PanelsResizeHandle';

export type PanelsProps = DataTestId & {
  children: ReactNode;
};

export type { ImperativePanelHandle };
const Panels = ({
  children,
  'data-testid': testId = 'panels',
}: PanelsProps) => {
  return <div data-testid={testId}>{children}</div>;
};

Panels.Item = memo(PanelsItem);
Panels.Group = memo(PanelsGroup);
Panels.ResizeHandle = memo(PanelsResizeHandle);

export default Panels;
