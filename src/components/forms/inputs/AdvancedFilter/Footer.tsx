import type { Dispatch, SetStateAction } from 'react';

import { Button, ButtonActions } from '@/skin/actions';
import type {
  ConditionerConditionType,
  ConditionerLogicalGroupType,
} from '@/skin/forms';
import { Stack } from '@/skin/layout';

import type { AdvancedFilters } from './AdvancedFilter';
import { TEST_IDS } from './constants';
import { generateNewFilter } from './utils';

type FooterProps = {
  setInitialValues: Dispatch<
    SetStateAction<
      [ConditionerConditionType[], ConditionerLogicalGroupType[]] | undefined
    >
  >;
  setAddFilterMode: Dispatch<SetStateAction<boolean>>;
  setAdvancedFilters: Dispatch<SetStateAction<AdvancedFilters>>;
};

const Footer = ({
  setInitialValues,
  setAddFilterMode,
  setAdvancedFilters,
}: FooterProps) => {
  const handleAddFilter = () => {
    const [conditions, logicalGroups] = generateNewFilter();

    setInitialValues([conditions, logicalGroups]);
    setAddFilterMode(true);
  };

  const handleClearAll = () => {
    setAdvancedFilters({});
    handleAddFilter();
  };

  const handleEnableDisableAll = (disabled: boolean) => {
    setAdvancedFilters(advancedFilters => {
      const newAdvancedFilters: AdvancedFilters = {};

      Object.keys(advancedFilters).forEach(key => {
        newAdvancedFilters[key] = {
          ...advancedFilters[key],
          disabled,
        };
      });

      return newAdvancedFilters;
    });
  };

  return (
    <Stack gap={6} justifyContent="flex-end" padding={{ top: 4 }}>
      <Button
        data-testid={TEST_IDS.advancedFilterFooterActionClearAll}
        onClick={handleClearAll}
        startIcon="Update"
        variant="ghosted"
      >
        Clear all
      </Button>
      <ButtonActions
        actions={[
          <ButtonActions.Button
            key="enabled"
            icon="View"
            onClick={() => handleEnableDisableAll(false)}
          >
            Enabled
          </ButtonActions.Button>,
          <ButtonActions.Button
            key="disabled"
            icon="ViewOff"
            onClick={() => handleEnableDisableAll(true)}
          >
            Disabled
          </ButtonActions.Button>,
        ]}
        variant="ghosted"
      >
        Actions
      </ButtonActions>
      <Button
        data-testid={TEST_IDS.advancedFilterFooterActionAddFitler}
        onClick={handleAddFilter}
        startIcon="Add"
        variant="outlined"
      >
        Add filter
      </Button>
    </Stack>
  );
};

export default Footer;
