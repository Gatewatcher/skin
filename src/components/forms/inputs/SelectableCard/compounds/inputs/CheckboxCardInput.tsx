import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { generateUniqId, isString } from '@gatewatcher/bistoury/utils-lang';
import { consoleWarn } from '@gatewatcher/bistoury/utils-log';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';

import { ObfuscatedText } from '@/skin/displays';
import type { InputSharedProps } from '@/skin/forms';
import InputBaseLabel, {
  type InputBaseRenderProps,
} from '@/skin/forms/inputs/InputBaseLabel';
import { getInputBaseRenderProps } from '@/skin/forms/inputs/InputBaseLabel/utils';
import styles from '@/skin/forms/inputs/SelectableCard/styles.module.scss';
import { Title } from '@/skin/typography';

export type CheckboxCardInputProps = Omit<InputSharedProps, 'label'> & {
  indeterminate?: boolean;
  label?: string;
  withMultilineLabel?: boolean;
};

export const CheckboxCardInput = ({
  indeterminate,
  checked,
  preventAutocomplete,
  label,
  'data-testid': testId = 'selectable-card-checkbox',
  withMultilineLabel,
  id,
  ...rest
}: CheckboxCardInputProps) => {
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
            styles.CheckboxCardInput,
            indeterminate && styles.CheckboxCardInputIndeterminate,
            !label && styles.CheckboxCardInputEmpty,
          )}
          aria-label={isString(label) ? label : undefined}
          data-testid={testId}
          htmlFor={uuid}
        >
          <Title
            as="h3"
            data-testid={suffixTestId(testId, 'label')}
            overflowHidden
            {...(!withMultilineLabel && { whiteSpace: 'nowrap' })}
          >
            {preventAutocomplete ? (
              <ObfuscatedText text={label ?? ''} />
            ) : !label ? (
              <>&nbsp;</>
            ) : (
              label
            )}
          </Title>

          <input
            id={uuid}
            type="checkbox"
            {...getInputBaseRenderProps(props)}
          />
        </label>
      )}
    </InputBaseLabel>
  );
};
