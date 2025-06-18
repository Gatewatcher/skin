import { Carousel } from '@/skin/displays';
import type { ConditionerLogicalGroupType } from '@/skin/forms';
import { Stack } from '@/skin/layout';

import { DEFAULT_DROPDOWN_MINWIDTH } from '../../../listings/Table/constants';
import type { AdvancedFilters } from './AdvancedFilter';
import ChipPreview from './ChipPreview';
import DropPreview from './DropPreview';
import PreviewItem from './PreviewItem';

type PreviewProps = {
  advancedFilters: AdvancedFilters;
  onEditFilter: (logicalGroups: ConditionerLogicalGroupType[]) => void;
  onDelete: (logicalGroups: ConditionerLogicalGroupType[]) => void;
  onDisabled: (logicalGroups: ConditionerLogicalGroupType[]) => void;
};

const Preview = ({
  advancedFilters,
  onEditFilter,
  onDelete,
  onDisabled,
}: PreviewProps) => {
  return (
    <Carousel
      dropdownContent={
        <Stack
          direction="column"
          flexGrow={1}
          gap={4}
          padding={8}
          style={{ minWidth: DEFAULT_DROPDOWN_MINWIDTH }}
        >
          {Object.values(advancedFilters).map(advancedFilter => {
            const { conditions, logicalGroups, disabled } = advancedFilter;

            if (disabled) {
              return null;
            }

            const mainGroups = logicalGroups.filter(
              logicalGroup => !logicalGroup.subGroupOf,
            );
            const subGroups = logicalGroups.filter(
              logicalGroup => logicalGroup.subGroupOf,
            );

            return mainGroups.map(mainGroup => (
              <DropPreview
                key={mainGroup.id}
                onDelete={() => onDelete(logicalGroups)}
                onDisabled={() => onDisabled(logicalGroups)}
                onEditFilter={() => onEditFilter(logicalGroups)}
              >
                <PreviewItem
                  conditions={conditions}
                  mainGroup={mainGroup}
                  subGroups={subGroups}
                />
              </DropPreview>
            ));
          })}
        </Stack>
      }
      values={advancedFilters}
    >
      {Object.values(advancedFilters).map(advancedFilter => {
        const { conditions, logicalGroups, disabled } = advancedFilter;

        if (disabled) {
          return null;
        }

        const mainGroups = logicalGroups.filter(
          logicalGroup => !logicalGroup.subGroupOf,
        );
        const subGroups = logicalGroups.filter(
          logicalGroup => logicalGroup.subGroupOf,
        );

        return mainGroups.map(mainGroup => (
          <ChipPreview
            key={mainGroup.id}
            onDelete={() => onDelete(logicalGroups)}
            onDisabled={() => onDisabled(logicalGroups)}
            onEditFilter={() => onEditFilter(logicalGroups)}
          >
            <PreviewItem
              conditions={conditions}
              mainGroup={mainGroup}
              subGroups={subGroups}
            />
          </ChipPreview>
        ));
      })}
    </Carousel>
  );
};

export default Preview;
