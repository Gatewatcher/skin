import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import { act, render, screen } from '@testing-library/react';

import { buildTestIds } from '@/utils/testIds';

import type { ConditionerProps } from '..';
import Conditioner from '..';
import { SUFFIX_TEST_IDS, TEST_ID } from '../constants';

const TEST_IDS = buildTestIds(TEST_ID, SUFFIX_TEST_IDS);

const renderComponent = ({
  maxDepth,
  isMulti,
  formatsOptions,
}: Partial<ConditionerProps>) =>
  render(
    <Conditioner
      data-testid={TEST_ID}
      formatsOptions={formatsOptions}
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

describe('Conditioner filter', () => {
  const getCondition = async (groupIndex: number, conditionIndex: number) =>
    await screen.findByTestId(
      `${TEST_IDS.condition}-${groupIndex}-${conditionIndex}-container`,
    );

  const getElement = async (
    testId: string,
    groupIndex: number,
    conditionIndex: number,
  ) => await screen.findByTestId(`${testId}-${groupIndex}-${conditionIndex}`);

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

  it('should have avdanced inputs', async () => {
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

    await expect(await getElement(TEST_IDS.addAnd, 0, 0)).toBeVisible;
    await expect(await getElement(TEST_IDS.addOr, 0, 0)).toBeVisible;
    await expect(await getElement(TEST_IDS.delete, 0, 0)).toBeVisible;
  });

  it('should have external buttons', async () => {
    renderComponent({});

    await expectToBeVisibleInTheDocument(TEST_IDS.clearAll);
    await expectToBeVisibleInTheDocument(TEST_IDS.save);
  });

  it('should add conditions', async () => {
    renderComponent({ maxDepth: 4 });

    await act(async () => {
      (await getElement(TEST_IDS.addAnd, 0, 0)).click();
    });
    await expect(await getCondition(0, 0)).toBeVisible;
    await expect(await getCondition(0, 1)).toBeVisible;

    await act(async () => {
      (await getElement(TEST_IDS.addOr, 0, 0)).click();
    });
    await expect(await getCondition(0, 0)).toBeVisible;
    await expect(await getCondition(1, 0)).toBeVisible;
    await expect(await getCondition(1, 1)).toBeVisible;

    await act(async () => {
      (await getElement(TEST_IDS.addOr, 1, 1)).click();
    });
    await expect(await getCondition(0, 0)).toBeVisible;
    await expect(await getCondition(1, 0)).toBeVisible;
    await expect(await getCondition(1, 1)).toBeVisible;
    await expect(await getCondition(1, 2)).toBeVisible;

    await act(async () => {
      (await getElement(TEST_IDS.addAnd, 1, 2)).click();
    });
    await expect(await getCondition(0, 0)).toBeVisible;
    await expect(await getCondition(1, 0)).toBeVisible;
    await expect(await getCondition(1, 1)).toBeVisible;
    await expect(await getCondition(2, 0)).toBeVisible;
    await expect(await getCondition(2, 1)).toBeVisible;
    await expect(getElement(TEST_IDS.addAnd, 2, 0)).toBeDisabled;
    await expect(getElement(TEST_IDS.addOr, 2, 0)).toBeDisabled;
    await expect(getElement(TEST_IDS.addAnd, 2, 1)).toBeDisabled;
    await expect(getElement(TEST_IDS.addOr, 2, 1)).toBeDisabled;
  });

  it('should remove conditions', async () => {
    renderComponent({ maxDepth: 4 });

    await act(async () => {
      (await getElement(TEST_IDS.addAnd, 0, 0)).click();
    });
    await act(async () => {
      (await getElement(TEST_IDS.addOr, 0, 0)).click();
    });
    await act(async () => {
      (await getElement(TEST_IDS.addOr, 1, 1)).click();
    });

    await act(async () => {
      (await getElement(TEST_IDS.addAnd, 1, 2)).click();
    });
    await expect(await getCondition(0, 0)).toBeVisible;
    await expect(await getCondition(1, 0)).toBeVisible;
    await expect(await getCondition(1, 1)).toBeVisible;
    await expect(await getCondition(2, 0)).toBeVisible;
    await expect(await getCondition(2, 1)).toBeVisible;

    await act(async () => {
      (await getElement(TEST_IDS.delete, 2, 0)).click();
    });
    await expect(await getCondition(0, 0)).toBeVisible;
    await expect(await getCondition(1, 0)).toBeVisible;
    await expect(await getCondition(1, 1)).toBeVisible;
    await expect(await getCondition(1, 2)).toBeVisible;

    await act(async () => {
      (await getElement(TEST_IDS.delete, 1, 0)).click();
    });
    await expect(await getCondition(0, 0)).toBeVisible;
    await expect(await getCondition(1, 0)).toBeVisible;
    await expect(await getCondition(1, 1)).toBeVisible;

    await act(async () => {
      (await getElement(TEST_IDS.delete, 1, 0)).click();
    });
    await expect(await getCondition(0, 0)).toBeVisible;
    await expect(await getCondition(0, 1)).toBeVisible;
  });

  it('should manipulate groups', async () => {
    renderComponent({ maxDepth: 4 });

    await act(async () => {
      (await getElement(TEST_IDS.addAnd, 0, 0)).click();
    });
    await expect(await getCondition(0, 0)).toBeVisible;
    await expect(await getCondition(0, 1)).toBeVisible;

    await act(async () => {
      (await getElement(TEST_IDS.addOr, 0, 0)).click();
    });
    await expect(await getCondition(0, 0)).toBeVisible;
    await expect(await getCondition(1, 0)).toBeVisible;
    await expect(await getCondition(1, 1)).toBeVisible;

    await act(async () => {
      (await getElement(TEST_IDS.addAnd, 1, 0)).click();
    });
    await expect(await getCondition(0, 0)).toBeVisible;
    await expect(await getCondition(1, 0)).toBeVisible;
    await expect(await getCondition(2, 0)).toBeVisible;
    await expect(await getCondition(2, 1)).toBeVisible;

    await act(async () => {
      (await getElement(TEST_IDS.addOr, 1, 0)).click();
    });
    await expect(await getCondition(0, 0)).toBeVisible;
    await expect(await getCondition(1, 0)).toBeVisible;
    await expect(await getCondition(1, 1)).toBeVisible;
    await expect(await getCondition(2, 0)).toBeVisible;
    await expect(await getCondition(2, 1)).toBeVisible;

    await act(async () => {
      (await getElement(TEST_IDS.addAnd, 1, 1)).click();
    });
    await expect(await getCondition(0, 0)).toBeVisible;
    await expect(await getCondition(1, 0)).toBeVisible;
    await expect(await getCondition(2, 0)).toBeVisible;
    await expect(await getCondition(2, 1)).toBeVisible;
    await expect(await getCondition(3, 0)).toBeVisible;
    await expect(await getCondition(3, 1)).toBeVisible;

    await act(async () => {
      (await getElement(TEST_IDS.addOr, 2, 0)).click();
    });
    await expect(await getCondition(0, 0)).toBeVisible;
    await expect(await getCondition(1, 0)).toBeVisible;
    await expect(await getCondition(2, 0)).toBeVisible;
    await expect(await getCondition(4, 0)).toBeVisible;
    await expect(await getCondition(4, 1)).toBeVisible;
    await expect(await getCondition(3, 0)).toBeVisible;
    await expect(await getCondition(3, 1)).toBeVisible;

    await act(async () => {
      (await getElement(TEST_IDS.delete, 4, 1)).click();
    });
    await expect(await getCondition(0, 0)).toBeVisible;
    await expect(await getCondition(1, 0)).toBeVisible;
    await expect(await getCondition(2, 0)).toBeVisible;
    await expect(await getCondition(2, 1)).toBeVisible;
    await expect(await getCondition(3, 0)).toBeVisible;
    await expect(await getCondition(3, 1)).toBeVisible;

    await act(async () => {
      (await getElement(TEST_IDS.delete, 2, 0)).click();
    });
    await expect(await getCondition(0, 0)).toBeVisible;
    await expect(await getCondition(1, 0)).toBeVisible;
    await expect(await getCondition(1, 1)).toBeVisible;
    await expect(await getCondition(2, 0)).toBeVisible;
    await expect(await getCondition(2, 1)).toBeVisible;

    await act(async () => {
      (await getElement(TEST_IDS.delete, 2, 0)).click();
    });
    await expect(await getCondition(0, 0)).toBeVisible;
    await expect(await getCondition(1, 0)).toBeVisible;
    await expect(await getCondition(1, 1)).toBeVisible;
    await expect(await getCondition(1, 2)).toBeVisible;
  });

  it('should manipulate groups', async () => {
    renderComponent({ maxDepth: 4 });

    await act(async () => {
      (await getElement(TEST_IDS.addAnd, 0, 0)).click();
    });
    await act(async () => {
      (await getElement(TEST_IDS.addOr, 0, 0)).click();
    });
    await act(async () => {
      (await getElement(TEST_IDS.addAnd, 1, 0)).click();
    });
    await act(async () => {
      (await getElement(TEST_IDS.addOr, 1, 0)).click();
    });
    await act(async () => {
      (await getElement(TEST_IDS.addAnd, 1, 1)).click();
    });
    await act(async () => {
      (await getElement(TEST_IDS.addOr, 2, 0)).click();
    });
    await expect(await getCondition(0, 0)).toBeVisible;
    await expect(await getCondition(1, 0)).toBeVisible;
    await expect(await getCondition(2, 0)).toBeVisible;
    await expect(await getCondition(4, 0)).toBeVisible;
    await expect(await getCondition(4, 1)).toBeVisible;
    await expect(await getCondition(3, 0)).toBeVisible;
    await expect(await getCondition(3, 1)).toBeVisible;

    await expect(
      await screen.findAllByTestId(TEST_IDS.observable),
    ).toHaveLength(7);
    await act(async () => {
      (await screen.findByTestId(TEST_IDS.clearAll)).click();
    });
    await expect(await getCondition(0, 0)).toBeVisible;
    await expect(
      await screen.findAllByTestId(TEST_IDS.observable),
    ).toHaveLength(1);
  });
});

describe('Conditioner variant', () => {
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
    await expect(await screen.findAllByTestId(TEST_IDS.mainGroup)).toHaveLength(
      1,
    );

    await act(async () => {
      (await screen.findByTestId(TEST_IDS.addElseIf)).click();
    });
    await expectToBeVisibleInTheDocument(TEST_IDS.elseIf);
    await expect(await screen.findAllByTestId(TEST_IDS.mainGroup)).toHaveLength(
      2,
    );

    await act(async () => {
      (await screen.findByTestId(TEST_IDS.addElse)).click();
    });
    await expectToBeVisibleInTheDocument(TEST_IDS.else);
    await expectNotToBeVisibleInTheDocument(TEST_IDS.addElse);
  });

  it('should add main group', async () => {
    renderComponent({ isMulti: true, maxDepth: 1 });

    await expect(await screen.findAllByTestId(TEST_IDS.mainGroup)).toHaveLength(
      1,
    );

    await act(async () => {
      (await screen.findByTestId(TEST_IDS.addElseIf)).click();
    });
    await expect(await screen.findAllByTestId(TEST_IDS.mainGroup)).toHaveLength(
      2,
    );

    await act(async () => {
      (await screen.findByTestId(TEST_IDS.addElse)).click();
    });
    await expect(await screen.findAllByTestId(TEST_IDS.mainGroup)).toHaveLength(
      2,
    );
  });

  it('should remove main group', async () => {
    renderComponent({ isMulti: true, maxDepth: 1 });

    await expect(await screen.findAllByTestId(TEST_IDS.mainGroup)).toHaveLength(
      1,
    );

    await act(async () => {
      (await screen.findByTestId(TEST_IDS.addElseIf)).click();
    });
    await expect(await screen.findAllByTestId(TEST_IDS.mainGroup)).toHaveLength(
      2,
    );

    await act(async () => {
      (await screen.findByTestId(TEST_IDS.addElse)).click();
    });
    await expect(await screen.findAllByTestId(TEST_IDS.mainGroup)).toHaveLength(
      2,
    );

    await act(async () => {
      (await screen.findByTestId(TEST_IDS.removeElse)).click();
    });
    await expect(await screen.findAllByTestId(TEST_IDS.mainGroup)).toHaveLength(
      2,
    );

    await act(async () => {
      (await screen.findByTestId(TEST_IDS.removeElseIf)).click();
    });
    await expect(await screen.findAllByTestId(TEST_IDS.mainGroup)).toHaveLength(
      1,
    );
  });
});
