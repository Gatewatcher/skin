import { useState } from 'react';

import { Button } from '@/skin/actions';
import { Badge, Dropdown } from '@/skin/displays';
import type {
  ConditionerConditionType,
  ConditionerLogicalGroupType,
} from '@/skin/forms';
import { Input } from '@/skin/forms';
import type { ConditionerProps } from '@/skin/forms/inputs/Conditioner';
import type { ReturnType } from '@/skin/forms/inputs/Conditioner/compounds/Save';
import type {
  LogicType,
  Operators,
} from '@/skin/forms/inputs/Conditioner/types';
import { Stack } from '@/skin/layout';

import { DEFAULT_DROPDOWN_MINWIDTH } from '../../../listings/Table/constants';
import AdvancedFilterItem from './AdvancedFilterItem';
import Footer from './Footer';
import Preview from './Preview';
import { TEST_IDS } from './constants';
import { findMainGroupId } from './utils';

export type AdvancedFilterItemType = {
  disabled?: boolean;
  excluded?: boolean;
  conditions: ConditionerConditionType[];
  logicalGroups: ConditionerLogicalGroupType[];
};

export type AdvancedFilters = Record<
  ConditionerLogicalGroupType['id'],
  AdvancedFilterItemType
>;

export type AdvancedFilterProps = Pick<ConditionerProps, 'observables'> & {
  onSave: (advancedFilters: AdvancedFilters) => void;
  initialAdvancedFilters?: AdvancedFilters;
  restrictedComparisonOperators?: Required<Operators>;
  restrictedFilterCompositionType?: LogicType;
};

const AdvancedFilter = ({
  onSave,
  observables,
  initialAdvancedFilters = {},
  restrictedComparisonOperators,
  restrictedFilterCompositionType,
}: AdvancedFilterProps) => {
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>(
    initialAdvancedFilters,
  );
  const [initialValues, setInitialValues] =
    useState<[ConditionerConditionType[], ConditionerLogicalGroupType[]]>();
  const [addFilterMode, setAddFilterMode] = useState<boolean>(false);
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleSaveClick = (value: ReturnType) => {
    const mainGroupId = findMainGroupId(value.logicalGroups);

    if (mainGroupId) {
      setAdvancedFilters(advancedFilters => {
        advancedFilters[mainGroupId] = { ...value };

        return { ...advancedFilters };
      });
    }
    setAddFilterMode(false);
    setInitialValues(undefined);

    onSave(advancedFilters);
  };

  const handleCancel = () => {
    setAddFilterMode(false);
    setInitialValues(undefined);
    if (!Object.keys(advancedFilters).length) {
      setIsOpened(false);
    }
  };

  const handleClear = () => {
    if (!initialValues) {
      return;
    }

    const [, logicalGroups] = initialValues;
    const mainGroupId = findMainGroupId(logicalGroups);

    if (mainGroupId) {
      setAdvancedFilters(advancedFilters => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [mainGroupId]: _, ...remainingFilters } = advancedFilters;

        return remainingFilters;
      });
    }
  };

  const handleOnClose = () => {
    if (!initialValues) {
      return;
    }

    setInitialValues(undefined);
    setIsOpened(false);
    setAddFilterMode(false);
  };

  const handleEditFilter = (logicalGroups: ConditionerLogicalGroupType[]) => {
    const mainGroupId = findMainGroupId(logicalGroups);

    if (mainGroupId) {
      const { conditions, logicalGroups } = advancedFilters[mainGroupId];

      setInitialValues([conditions, logicalGroups]);
      setIsOpened(true);
      setAddFilterMode(true);
    }
  };

  const handleDelete = (logicalGroups: ConditionerLogicalGroupType[]) => {
    const mainGroupId = findMainGroupId(logicalGroups);

    if (mainGroupId) {
      setAdvancedFilters(advancedFilters => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [mainGroupId]: _, ...remainingFilters } = advancedFilters;

        onSave(remainingFilters);

        return remainingFilters;
      });
    }
  };

  const handleDisabled = (logicalGroups: ConditionerLogicalGroupType[]) => {
    const mainGroupId = findMainGroupId(logicalGroups);

    if (mainGroupId) {
      setAdvancedFilters(advancedFilters => {
        advancedFilters[mainGroupId] = {
          ...advancedFilters[mainGroupId],
          disabled: !advancedFilters[mainGroupId].disabled,
        };

        return { ...advancedFilters };
      });
    }
    setAddFilterMode(false);
    setInitialValues(undefined);

    onSave(advancedFilters);
  };

  const handleExcluded = (logicalGroups: ConditionerLogicalGroupType[]) => {
    const mainGroupId = findMainGroupId(logicalGroups);

    if (mainGroupId) {
      setAdvancedFilters(advancedFilters => {
        advancedFilters[mainGroupId] = {
          ...advancedFilters[mainGroupId],
          excluded: !advancedFilters[mainGroupId].excluded,
        };

        return { ...advancedFilters };
      });
    }
    setAddFilterMode(false);
    setInitialValues(undefined);

    onSave(advancedFilters);
  };

  const advancedFilterLength = Object.keys(advancedFilters).length;

  const conditionerVariableProps = restrictedComparisonOperators
    ? {
        withoutDefaultOperators: true,
        operators: restrictedComparisonOperators,
      }
    : { withoutDefaultOperators: false };

  return (
    <Stack data-testid={TEST_IDS.base} direction="column" gap={4}>
      <Dropdown
        content={
          !!Object.values(advancedFilters).length && !addFilterMode ? (
            <Stack
              data-testid={TEST_IDS.advancedFilter}
              direction="column"
              flexGrow={1}
              gap={4}
              padding={8}
              style={{ minWidth: DEFAULT_DROPDOWN_MINWIDTH }}
            >
              {Object.values(advancedFilters).map(advancedFilter => (
                <AdvancedFilterItem
                  key={advancedFilter.logicalGroups.at(0)?.id}
                  advancedFilter={advancedFilter}
                  onDelete={handleDelete}
                  onDisabled={handleDisabled}
                  onEditFilter={handleEditFilter}
                  onExcluded={handleExcluded}
                />
              ))}
              <Footer
                onSave={onSave}
                setAddFilterMode={setAddFilterMode}
                setAdvancedFilters={setAdvancedFilters}
                setInitialValues={setInitialValues}
              />
            </Stack>
          ) : (
            <Stack
              data-testid={TEST_IDS.addFilter}
              direction="column"
              flexGrow={1}
              gap={4}
              padding={8}
            >
              <Input.Conditioner
                initialValues={initialValues}
                maxDepth={4}
                observables={observables}
                restrictedLogicType={restrictedFilterCompositionType}
                {...conditionerVariableProps}
              >
                <Input.Conditioner.Footer>
                  <Stack flexGrow={1} gap={4} justifyContent="flex-end">
                    <Input.Conditioner.ClearAll onClick={handleClear} />
                    <Button
                      data-testid={TEST_IDS.advancedFilterConditionerCancel}
                      onClick={handleCancel}
                      variant="outlined"
                    >
                      Cancel
                    </Button>
                    <Input.Conditioner.Save
                      label="Apply filters"
                      onClick={handleSaveClick}
                    />
                  </Stack>
                </Input.Conditioner.Footer>
              </Input.Conditioner>
            </Stack>
          )
        }
        isOpened={isOpened}
        maxHeight="fit"
        onClose={handleOnClose}
        onOpen={() => setIsOpened(true)}
        placement="bottom-start"
        setIsOpened={setIsOpened}
        triggerOn="click"
      >
        <Button
          data-testid={TEST_IDS.filterButton}
          startIcon="Filters"
          variant="ghosted"
        >
          <Stack direction="row" gap={4}>
            Filter
            {!!advancedFilterLength && (
              <Badge size="medium" type="low">
                {advancedFilterLength}
              </Badge>
            )}
          </Stack>
        </Button>
      </Dropdown>
      {!!Object.values(advancedFilters).length && (
        <Preview
          advancedFilters={advancedFilters}
          onDelete={handleDelete}
          onDisabled={handleDisabled}
          onEditFilter={handleEditFilter}
        />
      )}
    </Stack>
  );
};

export default AdvancedFilter;
