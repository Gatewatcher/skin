import type { ItemBase } from '../types';
import type { FinderPanelItemProps } from './PanelItem';
import PanelItem from './PanelItem';

export type FinderPanelItemAllProps = Omit<
  FinderPanelItemProps<ItemBase>,
  'hasChildren' | 'item'
> & {
  label: string;
  value?: string;
};

const PanelItemAll = ({
  'data-testid': testId = 'finder-panel-item-all',
  label,
  value = 'all',
  ...rest
}: FinderPanelItemAllProps) => {
  return (
    <PanelItem
      data-testid={testId}
      hasChildren={false}
      item={{ id: value, name: label }}
      {...rest}
    />
  );
};

export default PanelItemAll;
