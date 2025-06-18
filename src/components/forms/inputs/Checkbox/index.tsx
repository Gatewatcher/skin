import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { generateUniqId, isString } from '@gatewatcher/bistoury/utils-lang';
import { consoleWarn } from '@gatewatcher/bistoury/utils-log';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { ObfuscatedText } from '@/skin/displays';
import { Text } from '@/skin/typography';

import type { InputBaseRenderProps } from '../InputBaseLabel';
import InputBaseLabel from '../InputBaseLabel';
import { getInputBaseRenderProps } from '../InputBaseLabel/utils';
import type { InputSharedProps } from '../types';

import styles from './styles.module.scss';

export const TEST_ID: TestId = 'checkbox';

export type CheckboxProps = Omit<InputSharedProps, 'label'> & {
  indeterminate?: boolean;
  label?: ReactNode;
  withMultilineLabel?: boolean;
};

const Checkbox = ({
  'data-testid': testId = TEST_ID,
  checked,
  id,
  indeterminate,
  label,
  preventAutocomplete,
  withMultilineLabel,
  ...rest
}: CheckboxProps) => {
  const uuid = id ?? generateUniqId();

  if (indeterminate && checked) {
    consoleWarn(
      `indeterminate mode and checked can't be used at the same time.`,
    );
  }

  return (
    <InputBaseLabel
      checked={checked}
      preventAutocomplete={preventAutocomplete}
      withFormatting={false}
      withLabel={false}
      {...rest}
    >
      {(props: InputBaseRenderProps) => (
        <label
          className={classNames(
            styles.Checkbox,
            indeterminate && styles.CheckboxIndeterminate,
            !label && styles.CheckboxEmpty,
          )}
          aria-label={isString(label) ? label : undefined}
          data-testid={testId}
          htmlFor={uuid}
        >
          <input
            id={uuid}
            type="checkbox"
            {...getInputBaseRenderProps(props)}
          />
          {isString(label) || !label ? (
            <Text
              data-testid={suffixTestId(testId, 'label')}
              overflowHidden
              {...(!withMultilineLabel && { whiteSpace: 'nowrap' })}
            >
              {isString(label) &&
                (preventAutocomplete ? <ObfuscatedText text={label} /> : label)}
              {!label && <>&nbsp;</>}
            </Text>
          ) : (
            label
          )}
        </label>
      )}
    </InputBaseLabel>
  );
};

export default Checkbox;
