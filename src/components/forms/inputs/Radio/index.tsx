import { generateUniqId } from '@gatewatcher/bistoury/utils-lang';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { forwardRef } from 'react';

import { Text } from '@/skin/typography';

import type { InputBaseRenderProps } from '../InputBaseLabel';
import InputBaseLabel from '../InputBaseLabel';
import { getInputBaseRenderProps } from '../InputBaseLabel/utils';
import type { InputSharedProps } from '../types';

import styles from './styles.module.scss';

export type RadioProps = Omit<InputSharedProps, 'label'> & { label?: string };

export const TEST_ID: TestId = 'radio';

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      'data-testid': testId = TEST_ID,
      id,
      label,
      preventAutocomplete,
      withLabel = true,
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
          <div className={styles.Radio} data-testid={testId}>
            <input
              ref={ref}
              id={uuid}
              type="radio"
              {...getInputBaseRenderProps(props)}
            />
            {withLabel && (
              <label htmlFor={uuid}>
                <Text>{label}</Text>
              </label>
            )}
          </div>
        )}
      </InputBaseLabel>
    );
  },
);

export default Radio;
