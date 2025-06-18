import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId, TestId } from '@gatewatcher/bistoury/utils-types';
import { useState } from 'react';

import { InternalButtonIcon } from '@/skin/actions/buttons/ButtonIcon';

import InputBase from '../InputBase';
import InputBaseLabel from '../InputBaseLabel';
import type { InputSharedProps } from '../types';
import { DEFAULT_WITH_REVEAL } from './constants';

import styles from './styles.module.scss';

export type PasswordProps = DataTestId &
  InputSharedProps & {
    withReveal?: boolean;
  };

export const TEST_ID: TestId = 'input-password';

const Password = ({
  'data-testid': testId = TEST_ID,
  disabled,
  preventAutocomplete,
  role = 'textbox',
  withReveal = disabled ? false : DEFAULT_WITH_REVEAL,
  ...props
}: PasswordProps) => {
  const [isHidden, setIsHidden] = useState(true);

  const RevealElement = withReveal && (
    <InternalButtonIcon
      classNameInternal={styles.revealButton}
      icon={isHidden ? 'View' : 'ViewOff'}
      onClick={() => setIsHidden(!isHidden)}
      size="small"
      tabIndex={-1}
      type="neutral"
      variant="ghosted"
    />
  );

  return (
    <InputBaseLabel
      {...props}
      data-testid={testId}
      disabled={disabled}
      preventAutocomplete={preventAutocomplete}
    >
      {props => (
        <InputBase
          elementAfter={RevealElement}
          {...props}
          preventAutocomplete={preventAutocomplete}
        >
          {props => (
            <input
              {...props}
              className={classNames(
                props.className,
                styles.input,
                !isHidden && styles.revealed,
              )}
              role={role}
              type={preventAutocomplete || !isHidden ? 'text' : 'password'}
            />
          )}
        </InputBase>
      )}
    </InputBaseLabel>
  );
};

export default Password;
