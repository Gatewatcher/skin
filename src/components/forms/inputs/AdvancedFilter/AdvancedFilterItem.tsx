import { ButtonIcon } from '@/skin/actions';
import { Divider, Dropdown } from '@/skin/displays';
import type { ConditionerLogicalGroupType } from '@/skin/forms';
import { Input } from '@/skin/forms';
import { Stack } from '@/skin/layout';

import type { AdvancedFilterItemType } from './AdvancedFilter';
import DropdownActions from './DropdownActions';
import PreviewItem from './PreviewItem';
import { TEST_IDS } from './constants';

export type AdvancedFilterItemsProps = {
  advancedFilter: AdvancedFilterItemType;
  onEditFilter: (logicalGroups: ConditionerLogicalGroupType[]) => void;
  onExcluded: (logicalGroups: ConditionerLogicalGroupType[]) => void;
  onDelete: (logicalGroups: ConditionerLogicalGroupType[]) => void;
  onDisabled: (logicalGroups: ConditionerLogicalGroupType[]) => void;
};

const AdvancedFilterItem = ({
  advancedFilter,
  onEditFilter,
  onExcluded,
  onDelete,
  onDisabled,
}: AdvancedFilterItemsProps) => {
  const { conditions, logicalGroups, disabled, excluded } = advancedFilter;

  const mainGroup = logicalGroups.find(
    logicalGroup => !logicalGroup.subGroupOf,
  );
  const subGroups = logicalGroups.filter(
    logicalGroup => logicalGroup.subGroupOf,
  );

  if (!mainGroup) {
    return null;
  }

  return (
    <Stack key={logicalGroups.at(0)?.id} direction="column" gap={4}>
      <Stack alignItems="center" gap={8} justifyContent="space-between">
        <Stack gap={2}>
          <PreviewItem
            conditions={conditions}
            mainGroup={mainGroup}
            subGroups={subGroups}
          />
        </Stack>
        <Stack alignItems="center" gap={4}>
          <Input.Switch
            checked={!disabled}
            data-testid={TEST_IDS.dropdownActionDisable}
            onChange={() => onDisabled(logicalGroups)}
          />
          <Dropdown
            content={
              <DropdownActions
                excluded={excluded}
                onDelete={() => onDelete(logicalGroups)}
                onEditFilter={() => onEditFilter(logicalGroups)}
                onExcluded={() => onExcluded(logicalGroups)}
              />
            }
            placement="bottom-end"
            strategy="fixed"
            triggerOn={['click', 'focus']}
          >
            <ButtonIcon
              data-testid={TEST_IDS.advancedFilterItemButtonActions}
              icon="OverflowMenuHorizontal"
              type="neutral"
              variant="ghosted"
            />
          </Dropdown>
        </Stack>
      </Stack>
      <Divider />
    </Stack>
  );
};

export default AdvancedFilterItem;
