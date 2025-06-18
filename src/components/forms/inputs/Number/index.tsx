import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId, TestId } from '@gatewatcher/bistoury/utils-types';

import type { ExtraElementProps } from '../InputBase';
import InputBase from '../InputBase';
import InputBaseLabel from '../InputBaseLabel';
import type { InputSharedProps } from '../types';
import { DEFAULT_WITH_ARROWS } from './constants';

import styles from './styles.module.scss';

export const TEST_ID: TestId = 'input-number';

export type NumberProps = DataTestId &
  InputSharedProps &
  ExtraElementProps & {
    withArrows?: boolean;
  };

const Number = ({
  'data-testid': testId = TEST_ID,
  preventAutocomplete,
  withArrows = DEFAULT_WITH_ARROWS,
  ...props
}: NumberProps) => {
  return (
    <InputBaseLabel
      {...props}
      data-testid={testId}
      preventAutocomplete={preventAutocomplete}
    >
      {props => (
        <InputBase {...props}>
          {({ className, ...props }) => (
            <input
              className={classNames(
                className,
                !withArrows && styles.withoutArrows,
              )}
              type="number"
              {...props}
            />
          )}
        </InputBase>
      )}
    </InputBaseLabel>
  );
};

export default Number;
