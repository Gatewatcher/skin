import { generateUniqId } from '@gatewatcher/bistoury/utils-lang';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import { forwardRef } from 'react';

import type { InputSharedProps } from '@/skin/forms';
import InputBaseLabel, {
  type InputBaseRenderProps,
} from '@/skin/forms/inputs/InputBaseLabel';
import { getInputBaseRenderProps } from '@/skin/forms/inputs/InputBaseLabel/utils';
import styles from '@/skin/forms/inputs/SelectableCard/styles.module.scss';
import { Title } from '@/skin/typography';

type RadioCardInputProps = Omit<InputSharedProps, 'label'> & {
  label?: string;
};

export const RadioCardInput = forwardRef<HTMLInputElement, RadioCardInputProps>(
  (
    {
      'data-testid': testId = 'selectable-card-radio',
      id,
      label,
      preventAutocomplete,
      ...rest
    },
    ref,
  ) => {
    const uuid = id ?? generateUniqId();

    return (
      <InputBaseLabel
        className={styles.spacing}
        preventAutocomplete={preventAutocomplete}
        withFormatting={false}
        withLabel={false}
        {...rest}
      >
        {(props: InputBaseRenderProps) => (
          <div className={styles.RadioCardInput} data-testid={testId}>
            <label htmlFor={uuid}>
              <Title as="h3" data-testid={suffixTestId(testId, 'label')}>
                {label}
              </Title>
            </label>
            <input
              ref={ref}
              id={uuid}
              type="radio"
              {...getInputBaseRenderProps(props)}
            />
          </div>
        )}
      </InputBaseLabel>
    );
  },
);
