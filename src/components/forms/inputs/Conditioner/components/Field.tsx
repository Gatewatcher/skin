import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import type { SingleValue } from 'react-select';

import { Input } from '@/skin/forms';
import { useOperators } from '@/skin/forms/inputs/Conditioner/hooks';
import { Grid } from '@/skin/layout';
import { buildTestIds } from '@/utils/testIds';

import {
  DEFAULT_FORMAT_PLACEHOLDER,
  DEFAULT_OBSERVABLE_PLACEHOLDER,
  DEFAULT_OPERATOR_PLACEHOLDER,
  DEFAULT_VALUE_PLACEHOLDER,
  SUFFIX_TEST_IDS,
  TEST_ID,
} from '../constants';
import { useConditionerContext } from '../context';
import type { ConditionType, Operator } from '../types';

import styles from '../styles.module.scss';

type FieldProps = {
  condition: ConditionType;
};

const TEST_IDS = buildTestIds(TEST_ID, SUFFIX_TEST_IDS);

export const Field = ({ condition }: FieldProps) => {
  const [observableType, setObservableType] = useState<Operator | undefined>();
  const {
    setConditions,
    observables,
    conditions,
    formatsOptions,
    isMulti,
    unaryOperators,
    readonly,
  } = useConditionerContext();
  const operators = useOperators();
  const currentConditionIndex = conditions.findIndex(
    stateValue => stateValue.id === condition.id,
  );

  useEffect(() => {
    const valueType = observables?.find(
      observable => observable.name === condition.observable?.value,
    )?.type;

    setObservableType(valueType);
  }, []);

  const observablesOptions = observables?.map(observable => ({
    value: observable.name,
    label: observable.name,
  }));

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    valueType: 'value' | 'observable',
  ) => {
    setConditions(stateValues => {
      if (valueType === 'observable') {
        stateValues[currentConditionIndex][valueType] = {
          label: event.target.value,
          value: event.target.value,
        };
      } else {
        stateValues[currentConditionIndex][valueType] = event.target.value;
      }

      return [...stateValues];
    });
  };

  const handleSelectChange = (
    value: SingleValue<{
      label: string;
      value: string;
    }>,
    valueType: 'value' | 'operator' | 'format' | 'observable',
  ) => {
    setConditions(stateValues => {
      if (valueType === 'value') {
        stateValues[currentConditionIndex][valueType] = value?.value;
      } else {
        stateValues[currentConditionIndex][valueType] = Array.isArray(value)
          ? value[0]
          : value;
      }

      return [...stateValues];
    });
  };

  const handleSelectObservableChange = (
    value: SingleValue<{
      label: string;
      value: string;
    }>,
  ) => {
    const valueType = observables?.find(
      observable => observable.name === value?.value,
    )?.type;

    setObservableType(valueType);
    handleSelectChange(value, 'observable');
  };

  const areFormatAndValueDisabled =
    condition.operator && unaryOperators?.includes(condition.operator.value);

  return (
    <Grid columns={12} gap={4} isContainer>
      <Grid colSpan={isMulti ? (formatsOptions ? 7 : 12) : 3} isItem>
        {observables ? (
          <Input.Select
            data-testid={TEST_IDS.observable}
            disabled={readonly}
            isSearchable={false}
            onChange={handleSelectObservableChange}
            options={observablesOptions}
            placeholder={DEFAULT_OBSERVABLE_PLACEHOLDER}
            value={condition.observable}
            withLabel={false}
          />
        ) : (
          <Input.Text
            className={styles.input}
            data-testid={TEST_IDS.observable}
            disabled={readonly}
            onChange={event => handleInputChange(event, 'observable')}
            placeholder={DEFAULT_OBSERVABLE_PLACEHOLDER}
            value={condition.observable?.value}
            withLabel={false}
          />
        )}
      </Grid>
      {isMulti && formatsOptions && (
        <Grid colSpan={5} isItem>
          <Input.Select
            data-testid={TEST_IDS.format}
            disabled={areFormatAndValueDisabled || readonly}
            isSearchable={false}
            onChange={value => handleSelectChange(value, 'format')}
            options={formatsOptions}
            placeholder={DEFAULT_FORMAT_PLACEHOLDER}
            value={condition.format}
            withLabel={false}
          />
        </Grid>
      )}
      <Grid colSpan={isMulti ? 5 : 3} isItem>
        <Input.Select
          options={
            observables && observableType
              ? operators.getForObservableType(observableType)
              : operators.all
          }
          data-testid={TEST_IDS.operator}
          disabled={(observables && !observableType) || readonly}
          isSearchable={false}
          onChange={value => handleSelectChange(value, 'operator')}
          placeholder={DEFAULT_OPERATOR_PLACEHOLDER}
          value={condition.operator}
          withLabel={false}
        />
      </Grid>
      <Grid colSpan={isMulti ? 7 : 6} isItem>
        {!observables ||
        observableType === 'TEXT' ||
        observableType === 'IP' ? (
          <Input.Text
            disabled={
              (observables && !observableType) ||
              areFormatAndValueDisabled ||
              readonly
            }
            className={styles.input}
            data-testid={TEST_IDS.inputText}
            onChange={event => handleInputChange(event, 'value')}
            placeholder={DEFAULT_VALUE_PLACEHOLDER}
            value={condition.value}
            withLabel={false}
          />
        ) : observableType === 'BOOLEAN' ? (
          <Input.Select
            options={[
              { value: 'true', label: 'True' },
              { value: 'false', label: 'False' },
            ]}
            data-testid={TEST_IDS.inputText}
            disabled={!observableType || areFormatAndValueDisabled || readonly}
            onChange={value => handleSelectChange(value, 'value')}
            placeholder={DEFAULT_VALUE_PLACEHOLDER}
            value={condition.value}
            withLabel={false}
          />
        ) : observableType === 'DATE' ? (
          <Input.Date
            className={styles.input}
            data-testid={TEST_IDS.inputText}
            disabled={!observableType || areFormatAndValueDisabled || readonly}
            onChange={event => handleInputChange(event, 'value')}
            placeholder={DEFAULT_VALUE_PLACEHOLDER}
            value={condition.value}
            withLabel={false}
          />
        ) : (
          <Input.Number
            className={styles.input}
            data-testid={TEST_IDS.inputText}
            disabled={!observableType || areFormatAndValueDisabled || readonly}
            onChange={event => handleInputChange(event, 'value')}
            placeholder={DEFAULT_VALUE_PLACEHOLDER}
            value={condition.value}
            withLabel={false}
          />
        )}
      </Grid>
    </Grid>
  );
};
