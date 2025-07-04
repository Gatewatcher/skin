import type { Dispatch, SetStateAction } from 'react';

import { Button, ButtonActions } from '@/skin/actions';
import type {
  ConditionerConditionType,
  ConditionerLogicalGroupType,
} from '@/skin/forms';
import { Stack } from '@/skin/layout';

import type { AdvancedFilters } from './AdvancedFilter';
import {
  DEFAULT_ADVANCED_FILTER_FOOTER_ADD_TEXT,
  DEFAULT_ADVANCED_FILTER_FOOTER_CLEAR_TEXT,
  DEFAULT_ADVANCED_FILTER_FOOTER_DISABLE_TEXT,
  DEFAULT_ADVANCED_FILTER_FOOTER_ENABLE_TEXT,
  TEST_IDS,
} from './constants';
import { generateNewFilter } from './utils';

type FooterProps = {
  setInitialValues: Dispatch<
    SetStateAction<
      [ConditionerConditionType[], ConditionerLogicalGroupType[]] | undefined
    >
  >;
  setAddFilterMode: Dispatch<SetStateAction<boolean>>;
  setAdvancedFilters: Dispatch<SetStateAction<AdvancedFilters>>;
  onSave: (advancedFilters: AdvancedFilters) => void;
  clearText?: string;
  disableText?: string;
  enableText?: string;
  addText?: string;
};

const Footer = ({
  addText = DEFAULT_ADVANCED_FILTER_FOOTER_ADD_TEXT,
  clearText = DEFAULT_ADVANCED_FILTER_FOOTER_CLEAR_TEXT,
  disableText = DEFAULT_ADVANCED_FILTER_FOOTER_DISABLE_TEXT,
  enableText = DEFAULT_ADVANCED_FILTER_FOOTER_ENABLE_TEXT,
  onSave,
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
    onSave({});
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
      onSave(newAdvancedFilters);
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
        {clearText}
      </Button>
      <ButtonActions
        actions={[
          <ButtonActions.Button
            key="enabled"
            icon="View"
            onClick={() => handleEnableDisableAll(false)}
          >
            {enableText}
          </ButtonActions.Button>,
          <ButtonActions.Button
            key="disabled"
            icon="ViewOff"
            onClick={() => handleEnableDisableAll(true)}
          >
            {disableText}
          </ButtonActions.Button>,
        ]}
        variant="ghosted"
      >
        Actions
      </ButtonActions>
      <Button
        data-testid={TEST_IDS.advancedFilterFooterActionAddFilter}
        onClick={handleAddFilter}
        startIcon="Add"
        variant="outlined"
      >
        {addText}
      </Button>
    </Stack>
  );
};

export default Footer;
