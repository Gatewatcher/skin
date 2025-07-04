import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type {
  ConditionType,
  LogicalGroupType,
} from '@/skin/forms/inputs/Conditioner/types';

import type { AdvancedFilterProps } from '../AdvancedFilter';
import AdvancedFilter from '../AdvancedFilter';
import { TEST_IDS } from '../constants';

const uidLogicalGroup1 = 'idDeTestLogicalGroup1';
const uidLogicalGroup2 = 'idDeTestLogicalGroup2';

const initConditionsState: ConditionType[] = [
  { id: uidLogicalGroup1 },
  { id: uidLogicalGroup2 },
];
const initLogicalGroupsState: LogicalGroupType[] = [
  {
    conditionsId: [initConditionsState[0].id],
    id: uidLogicalGroup1,
    name: 'Condition 1',
    logic: 'or',
  },
  {
    conditionsId: [initConditionsState[1].id],
    id: uidLogicalGroup2,
    name: 'Condition 2',
    logic: 'or',
  },
];

describe('AdvancedFilter render', async () => {
  const user = userEvent.setup();

  const renderComponent = (props: Partial<AdvancedFilterProps>) =>
    render(
      <AdvancedFilter
        observables={[{ name: 'test', type: 'TEXT' }]}
        onSave={console.log}
        {...props}
      />,
    );

  const renderComponentWithAdvancedFilter = () =>
    renderComponent({
      initialAdvancedFilters: {
        idDeTestLogicalGroup1: {
          conditions: initConditionsState,
          logicalGroups: initLogicalGroupsState,
        },
        idDeTestLogicalGroup2: {
          conditions: initConditionsState,
          logicalGroups: initLogicalGroupsState,
        },
      },
    });

  it('should render filter button', async () => {
    renderComponent({});

    await expectToBeVisibleInTheDocument(TEST_IDS.filterButton);
  });

  it('should open empty filter', async () => {
    renderComponent({});

    const filterButton = await screen.findByTestId(TEST_IDS.filterButton);
    await user.click(filterButton);

    await expectToBeVisibleInTheDocument(TEST_IDS.addFilter);
  });

  it('should close empty filter on cancel', async () => {
    renderComponent({});

    const filterButton = await screen.findByTestId(TEST_IDS.filterButton);
    await user.click(filterButton);

    await expectToBeVisibleInTheDocument(TEST_IDS.addFilter);

    const cancelButton = await screen.findByTestId(
      TEST_IDS.advancedFilterConditionerCancel,
    );
    await user.click(cancelButton);

    expect(await screen.findByTestId(TEST_IDS.addFilter)).not.toBeVisible();
  });

  it('should open advancedFilter', async () => {
    renderComponentWithAdvancedFilter();

    const filterButton = await screen.findByTestId(TEST_IDS.filterButton);
    await user.click(filterButton);

    await expectToBeVisibleInTheDocument(TEST_IDS.advancedFilter);
  });

  it('should addFilter advancedFilter', async () => {
    renderComponentWithAdvancedFilter();

    const filterButton = await screen.findByTestId(TEST_IDS.filterButton);
    await user.click(filterButton);

    const addFilterButton = await screen.findByTestId(
      TEST_IDS.advancedFilterFooterActionAddFilter,
    );
    await user.click(addFilterButton);

    await expectToBeVisibleInTheDocument(TEST_IDS.addFilter);
  });

  it('should clearAll advancedFilter', async () => {
    renderComponentWithAdvancedFilter();

    const filterButton = await screen.findByTestId(TEST_IDS.filterButton);

    await user.click(filterButton);

    const clearAllButton = await screen.findByTestId(
      TEST_IDS.advancedFilterFooterActionClearAll,
    );

    await user.click(clearAllButton);

    await expectToBeVisibleInTheDocument(TEST_IDS.addFilter);
  });

  it('should have preview', async () => {
    renderComponentWithAdvancedFilter();

    await expectToBeVisibleInTheDocument('carousel-preview');
  });

  it('should open addFilter with dropPreview dropdownAction edit', async () => {
    renderComponentWithAdvancedFilter();

    const previewButton = await screen.findByTestId('carousel-dropdownButton');

    await user.click(previewButton);

    const elements = await screen.findAllByTestId(
      TEST_IDS.dropPreviewButtonActions,
    );

    await user.click(elements[0]);

    const dropdownActionEdit = await screen.findByTestId(
      TEST_IDS.dropdownActionEdit,
    );

    await user.click(dropdownActionEdit);

    await expectToBeVisibleInTheDocument(TEST_IDS.addFilter);
  });

  it('should open addFilter with advancedFilterItem dropdownAction edit', async () => {
    renderComponentWithAdvancedFilter();

    const filterButton = await screen.findByTestId(TEST_IDS.filterButton);

    await user.click(filterButton);

    const elements = await screen.findAllByTestId(
      TEST_IDS.advancedFilterItemButtonActions,
    );

    await user.click(elements[0]);

    const dropdownActionEdit = await screen.findByTestId(
      TEST_IDS.dropdownActionEdit,
    );

    await user.click(dropdownActionEdit);

    await expectToBeVisibleInTheDocument(TEST_IDS.addFilter);
  });

  it('should open addFilter with chipPreview dropdownAction edit', async () => {
    renderComponentWithAdvancedFilter();

    const elements = await screen.findAllByTestId(TEST_IDS.chipPreview);

    await user.click(elements[0]);

    const dropdownActionEdit = await screen.findByTestId(
      TEST_IDS.dropdownActionEdit,
    );

    await user.click(dropdownActionEdit);

    await expectToBeVisibleInTheDocument(TEST_IDS.addFilter);
  });

  it('should delete a filter with dropPreview dropdownAction delete', async () => {
    renderComponentWithAdvancedFilter();

    const previewButton = await screen.findByTestId('carousel-dropdownButton');

    await user.click(previewButton);

    const elements = await screen.findAllByTestId(
      TEST_IDS.dropPreviewButtonActions,
    );

    await user.click(elements[0]);

    const dropdownActionDelete = await screen.findByTestId(
      TEST_IDS.dropdownActionDelete,
    );

    await user.click(dropdownActionDelete);

    await expect(
      (
        await screen.findByTestId('carousel-previewContainer')
      ).children,
    ).toHaveLength(1);
  });

  it('should delete a filter with chipPreview dropdownAction delete', async () => {
    renderComponentWithAdvancedFilter();

    const elements = await screen.findAllByTestId(TEST_IDS.chipPreview);

    await user.click(elements[0]);

    const dropdownActionDelete = await screen.findByTestId(
      TEST_IDS.dropdownActionDelete,
    );

    await user.click(dropdownActionDelete);

    await expect(
      (
        await screen.findByTestId('carousel-previewContainer')
      ).children,
    ).toHaveLength(1);
  });

  it('should delete a filter with advancedFilterItem dropdownAction delete', async () => {
    renderComponentWithAdvancedFilter();

    const filterButton = await screen.findByTestId(TEST_IDS.filterButton);

    await user.click(filterButton);

    const elements = await screen.findAllByTestId(
      TEST_IDS.advancedFilterItemButtonActions,
    );

    await user.click(elements[0]);

    const dropdownActionDelete = await screen.findByTestId(
      TEST_IDS.dropdownActionDelete,
    );

    await user.click(dropdownActionDelete);

    await expect(
      (
        await screen.findByTestId('carousel-previewContainer')
      ).children,
    ).toHaveLength(1);
  });

  it('should disable a filter with dropPreview dropdownAction disable', async () => {
    renderComponentWithAdvancedFilter();

    const previewButton = await screen.findByTestId('carousel-dropdownButton');

    await user.click(previewButton);

    const elements = await screen.findAllByTestId(
      TEST_IDS.dropPreviewButtonActions,
    );

    await user.click(elements[0]);

    const dropdownActionDisable = await screen.findByTestId(
      TEST_IDS.dropdownActionDisable,
    );

    await user.click(dropdownActionDisable);

    await expect(
      (
        await screen.findByTestId('carousel-previewContainer')
      ).children,
    ).toHaveLength(1);
  });

  it('should disable a filter with advancedFilterItem dropdownAction disable', async () => {
    renderComponentWithAdvancedFilter();

    const filterButton = await screen.findByTestId(TEST_IDS.filterButton);

    await user.click(filterButton);

    const dropdownActionDisable = await screen.findAllByTestId(
      TEST_IDS.dropdownActionDisable,
    );

    await user.click(dropdownActionDisable[0]);

    await expect(
      (
        await screen.findByTestId('carousel-previewContainer')
      ).children,
    ).toHaveLength(1);
  });

  it('should disable a filter with chipPreview dropdownAction disable', async () => {
    renderComponentWithAdvancedFilter();

    const elements = await screen.findAllByTestId(TEST_IDS.chipPreview);

    await user.click(elements[0]);

    const dropdownActionDisable = await screen.findByTestId(
      TEST_IDS.dropdownActionDisable,
    );

    await user.click(dropdownActionDisable);

    await expect(
      (
        await screen.findByTestId('carousel-previewContainer')
      ).children,
    ).toHaveLength(1);
  });
});
