import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import { NeutralText } from '@/skin/typography';

export type FinderPanelNameProps = DataTestId & {
  children: string;
};

const PanelName = ({
  children,
  'data-testid': testId = 'finder-panel-name',
}: FinderPanelNameProps) => {
  return (
    <NeutralText
      data-testid={testId}
      size="small"
      transform="capitalizeFirstLetter"
      variant={theme => (theme === 'dark' ? 300 : 500)}
      weight="medium"
    >
      {children}
    </NeutralText>
  );
};

export default PanelName;
