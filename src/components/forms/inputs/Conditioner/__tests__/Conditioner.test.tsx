import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { buildTestIds } from '@/utils/testIds';

import type { ConditionerProps } from '..';
import Conditioner from '..';
import { SUFFIX_TEST_IDS, TEST_ID } from '../constants';
import type { ConditionType, LogicalGroupType } from '../types';

const TEST_IDS = buildTestIds(TEST_ID, SUFFIX_TEST_IDS);

const CONDITION_ID = 'idDeTestCondition1';

const EMPTY_CONDITION: ConditionType = {
  id: CONDITION_ID,
};

const CONDITION: ConditionType = {
  id: CONDITION_ID,
  observable: { value: 'ip', label: 'IP' },
  operator: { value: '=', label: 'Equal' },
  format: { label: 'IP', value: 'ip' },
  value: '127.0.0.1',
};

const LOGICAL_GROUP: LogicalGroupType = {
  conditionsId: [CONDITION_ID],
  id: 'idDeTestLogicalGroup1',
  name: 'Condition 1',
  logic: 'or',
};

const renderComponent = ({
  maxDepth,
  initialValues,
  isMulti,
  formatsOptions,
}: Partial<ConditionerProps>) =>
  render(
    <Conditioner
      data-testid={TEST_ID}
      formatsOptions={formatsOptions}
      initialValues={initialValues}
      isMulti={isMulti}
      maxDepth={maxDepth}
    >
      <Conditioner.Footer>
        <Conditioner.ClearAll />
        <Conditioner.Save onClick={console.log} />
        <Conditioner.AddGroup />
      </Conditioner.Footer>
    </Conditioner>,
  );

const getCondition = async (groupIndex: number, conditionIndex: number) =>
  await screen.findByTestId(
    `${TEST_IDS.condition}-${groupIndex}-${conditionIndex}-container`,
  );

const getElement = async (
  testId: string,
  groupIndex: number,
  conditionIndex: number,
) => await screen.findByTestId(`${testId}-${groupIndex}-${conditionIndex}`);

const user = userEvent.setup();

describe('Conditioner filter', () => {
  it('should render', async () => {
    renderComponent({});

    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should have base inputs', async () => {
    renderComponent({});

    await expectToBeVisibleInTheDocument(TEST_IDS.observable);
    await expectToBeVisibleInTheDocument(TEST_IDS.operator);
  });

  it('should have save button disabled when empty', async () => {
    renderComponent({});

    const saveButton = await screen.findByTestId(TEST_IDS.save);

    expect(saveButton).toBeDisabled();
  });

  it('should have advanced inputs', async () => {
    renderComponent({
      formatsOptions: [
        { label: 'Ip', value: 'ip' },
        { label: 'Datetime', value: 'date-time' },
        { label: 'Date', value: 'date' },
        { label: 'Time', value: 'time' },
      ],
      isMulti: true,
    });

    await expectToBeVisibleInTheDocument(TEST_IDS.format);
  });

  it('should have conditions buttons', async () => {
    renderComponent({});

    expect(await getElement(TEST_IDS.addAnd, 0, 0)).toBeVisible();
    expect(await getElement(TEST_IDS.addOr, 0, 0)).toBeVisible();
    expect(await getElement(TEST_IDS.delete, 0, 0)).toBeVisible();
  });

  it('should have external buttons', async () => {
    renderComponent({});

    await expectToBeVisibleInTheDocument(TEST_IDS.clearAll);
    await expectToBeVisibleInTheDocument(TEST_IDS.save);
  });

  it('should add conditions', async () => {
    renderComponent({ maxDepth: 3 });

    await user.click(await getElement(TEST_IDS.addAnd, 0, 0));
    expect(await getCondition(0, 0)).toBeVisible();
    expect(await getCondition(0, 1)).toBeVisible();

    await user.click(await getElement(TEST_IDS.addOr, 0, 0));
    expect(await getCondition(0, 0)).toBeVisible();
    expect(await getCondition(1, 0)).toBeVisible();
    expect(await getCondition(1, 1)).toBeVisible();

    await user.click(await getElement(TEST_IDS.addOr, 1, 1));
    expect(await getCondition(0, 0)).toBeVisible();
    expect(await getCondition(1, 0)).toBeVisible();
    expect(await getCondition(1, 1)).toBeVisible();
    expect(await getCondition(1, 2)).toBeVisible();

    await user.click(await getElement(TEST_IDS.addAnd, 1, 2));
    expect(await getCondition(0, 0)).toBeVisible();
    expect(await getCondition(1, 0)).toBeVisible();
    expect(await getCondition(1, 1)).toBeVisible();
    expect(await getCondition(2, 0)).toBeVisible();
    expect(await getCondition(2, 1)).toBeVisible();

    expect(await getElement(TEST_IDS.addOr, 2, 0)).toBeDisabled();
    expect(await getElement(TEST_IDS.addOr, 2, 1)).toBeDisabled();
  });

  it('should disallow adding OR', async () => {
    renderComponent({ maxDepth: 1 });

    await user.click(await getElement(TEST_IDS.addAnd, 0, 0));
    expect(await getElement(TEST_IDS.addOr, 0, 0)).toBeDisabled();
  });

  it('should disallow adding AND', async () => {
    renderComponent({ maxDepth: 1 });

    await user.click(await getElement(TEST_IDS.addOr, 0, 0));
    expect(await getElement(TEST_IDS.addAnd, 0, 0)).toBeDisabled();
  });

  it('should remove conditions', async () => {
    renderComponent({ maxDepth: 4 });

    await user.click(await getElement(TEST_IDS.addAnd, 0, 0));
    await user.click(await getElement(TEST_IDS.addOr, 0, 0));
    await user.click(await getElement(TEST_IDS.addOr, 1, 1));

    await user.click(await getElement(TEST_IDS.addAnd, 1, 2));
    expect(await getCondition(0, 0)).toBeVisible();
    expect(await getCondition(1, 0)).toBeVisible();
    expect(await getCondition(1, 1)).toBeVisible();
    expect(await getCondition(2, 0)).toBeVisible();
    expect(await getCondition(2, 1)).toBeVisible();

    await user.click(await getElement(TEST_IDS.delete, 2, 0));
    expect(await getCondition(0, 0)).toBeVisible();
    expect(await getCondition(1, 0)).toBeVisible();
    expect(await getCondition(1, 1)).toBeVisible();
    expect(await getCondition(1, 2)).toBeVisible();

    await user.click(await getElement(TEST_IDS.delete, 1, 0));
    expect(await getCondition(0, 0)).toBeVisible();
    expect(await getCondition(1, 0)).toBeVisible();
    expect(await getCondition(1, 1)).toBeVisible();

    await user.click(await getElement(TEST_IDS.delete, 1, 0));
    expect(await getCondition(0, 0)).toBeVisible();
    expect(await getCondition(0, 1)).toBeVisible();
  });

  it('should manipulate groups', async () => {
    renderComponent({ maxDepth: 4 });

    await user.click(await getElement(TEST_IDS.addAnd, 0, 0));
    expect(await getCondition(0, 0)).toBeVisible();
    expect(await getCondition(0, 1)).toBeVisible();

    await user.click(await getElement(TEST_IDS.addOr, 0, 0));
    expect(await getCondition(0, 0)).toBeVisible();
    expect(await getCondition(1, 0)).toBeVisible();
    expect(await getCondition(1, 1)).toBeVisible();

    await user.click(await getElement(TEST_IDS.addAnd, 1, 0));
    expect(await getCondition(0, 0)).toBeVisible();
    expect(await getCondition(1, 0)).toBeVisible();
    expect(await getCondition(2, 0)).toBeVisible();
    expect(await getCondition(2, 1)).toBeVisible();

    await user.click(await getElement(TEST_IDS.addOr, 1, 0));
    expect(await getCondition(0, 0)).toBeVisible();
    expect(await getCondition(1, 0)).toBeVisible();
    expect(await getCondition(1, 1)).toBeVisible();
    expect(await getCondition(2, 0)).toBeVisible();
    expect(await getCondition(2, 1)).toBeVisible();

    await user.click(await getElement(TEST_IDS.addAnd, 1, 1));
    expect(await getCondition(0, 0)).toBeVisible();
    expect(await getCondition(1, 0)).toBeVisible();
    expect(await getCondition(2, 0)).toBeVisible();
    expect(await getCondition(2, 1)).toBeVisible();
    expect(await getCondition(3, 0)).toBeVisible();
    expect(await getCondition(3, 1)).toBeVisible();

    await user.click(await getElement(TEST_IDS.addOr, 2, 0));
    expect(await getCondition(0, 0)).toBeVisible();
    expect(await getCondition(1, 0)).toBeVisible();
    expect(await getCondition(2, 0)).toBeVisible();
    expect(await getCondition(4, 0)).toBeVisible();
    expect(await getCondition(4, 1)).toBeVisible();
    expect(await getCondition(3, 0)).toBeVisible();
    expect(await getCondition(3, 1)).toBeVisible();

    await user.click(await getElement(TEST_IDS.delete, 4, 1));
    expect(await getCondition(0, 0)).toBeVisible();
    expect(await getCondition(1, 0)).toBeVisible();
    expect(await getCondition(2, 0)).toBeVisible();
    expect(await getCondition(2, 1)).toBeVisible();
    expect(await getCondition(3, 0)).toBeVisible();
    expect(await getCondition(3, 1)).toBeVisible();

    await user.click(await getElement(TEST_IDS.delete, 2, 0));
    expect(await getCondition(0, 0)).toBeVisible();
    expect(await getCondition(1, 0)).toBeVisible();
    expect(await getCondition(1, 1)).toBeVisible();
    expect(await getCondition(2, 0)).toBeVisible();
    expect(await getCondition(2, 1)).toBeVisible();

    await user.click(await getElement(TEST_IDS.delete, 2, 0));
    expect(await getCondition(0, 0)).toBeVisible();
    expect(await getCondition(1, 0)).toBeVisible();
    expect(await getCondition(1, 1)).toBeVisible();
    expect(await getCondition(1, 2)).toBeVisible();
  });

  it('should manipulate groups', async () => {
    renderComponent({ maxDepth: 4 });

    await user.click(await getElement(TEST_IDS.addAnd, 0, 0));
    await user.click(await getElement(TEST_IDS.addOr, 0, 0));
    await user.click(await getElement(TEST_IDS.addAnd, 1, 0));
    await user.click(await getElement(TEST_IDS.addOr, 1, 0));
    await user.click(await getElement(TEST_IDS.addAnd, 1, 1));
    await user.click(await getElement(TEST_IDS.addOr, 2, 0));
    expect(await getCondition(0, 0)).toBeVisible();
    expect(await getCondition(1, 0)).toBeVisible();
    expect(await getCondition(2, 0)).toBeVisible();
    expect(await getCondition(4, 0)).toBeVisible();
    expect(await getCondition(4, 1)).toBeVisible();
    expect(await getCondition(3, 0)).toBeVisible();
    expect(await getCondition(3, 1)).toBeVisible();

    expect(await screen.findAllByTestId(TEST_IDS.observable)).toHaveLength(7);
    await user.click(await screen.findByTestId(TEST_IDS.clearAll));
    expect(await getCondition(0, 0)).toBeVisible();
    expect(await screen.findAllByTestId(TEST_IDS.observable)).toHaveLength(1);
  });

  it('should disallow saving when the conditioner is empty', async () => {
    renderComponent({});

    expect(await screen.findByRole('button', { name: 'Save' })).toBeDisabled();
  });

  it('should disallow saving when there is an empty condition', async () => {
    renderComponent({
      initialValues: [[EMPTY_CONDITION], [LOGICAL_GROUP]],
    });

    expect(await screen.findByRole('button', { name: 'Save' })).toBeDisabled();
  });

  it('should allow saving when a condition is filled', async () => {
    renderComponent({
      initialValues: [[CONDITION], [LOGICAL_GROUP]],
    });

    expect(await screen.findByRole('button', { name: 'Save' })).toBeEnabled();
  });
});

describe('Conditioner variant', () => {
  const user = userEvent.setup();

  it('should render', async () => {
    renderComponent({ isMulti: true, maxDepth: 1 });

    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should have add elseif else', async () => {
    renderComponent({ isMulti: true, maxDepth: 1 });

    await expectToBeVisibleInTheDocument(TEST_IDS.addElse);
    await expectToBeVisibleInTheDocument(TEST_IDS.addElseIf);
  });

  it('should have if elseif else', async () => {
    renderComponent({ isMulti: true, maxDepth: 1 });

    await expectToBeVisibleInTheDocument(TEST_IDS.if);
    expect(await screen.findAllByTestId(TEST_IDS.mainGroup)).toHaveLength(1);

    await user.click(await screen.findByTestId(TEST_IDS.addElseIf));
    await expectToBeVisibleInTheDocument(TEST_IDS.elseIf);
    expect(await screen.findAllByTestId(TEST_IDS.mainGroup)).toHaveLength(2);

    await user.click(await screen.findByTestId(TEST_IDS.addElse));
    await expectToBeVisibleInTheDocument(TEST_IDS.else);
    await expectNotToBeVisibleInTheDocument(TEST_IDS.addElse);
  });

  it('should add main group', async () => {
    renderComponent({ isMulti: true, maxDepth: 1 });

    expect(await screen.findAllByTestId(TEST_IDS.mainGroup)).toHaveLength(1);

    await user.click(await screen.findByTestId(TEST_IDS.addElseIf));
    expect(await screen.findAllByTestId(TEST_IDS.mainGroup)).toHaveLength(2);

    await user.click(await screen.findByTestId(TEST_IDS.addElse));
    expect(await screen.findAllByTestId(TEST_IDS.mainGroup)).toHaveLength(2);
  });

  it('should remove main group', async () => {
    renderComponent({ isMulti: true, maxDepth: 1 });

    expect(await screen.findAllByTestId(TEST_IDS.mainGroup)).toHaveLength(1);

    await user.click(await screen.findByTestId(TEST_IDS.addElseIf));
    expect(await screen.findAllByTestId(TEST_IDS.mainGroup)).toHaveLength(2);

    await user.click(await screen.findByTestId(TEST_IDS.addElse));
    expect(await screen.findAllByTestId(TEST_IDS.mainGroup)).toHaveLength(2);

    await user.click(await screen.findByTestId(TEST_IDS.removeElse));
    expect(await screen.findAllByTestId(TEST_IDS.mainGroup)).toHaveLength(2);

    await user.click(await screen.findByTestId(TEST_IDS.removeElseIf));
    expect(await screen.findAllByTestId(TEST_IDS.mainGroup)).toHaveLength(1);
  });
});
