import { useDidMountEffect } from '@gatewatcher/bistoury/hooks';
import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import {
  type ChangeEvent,
  type ClipboardEvent,
  type KeyboardEvent,
  useRef,
  useState,
} from 'react';

import { Stack } from '@/skin/layout';

import InputBase from '../InputBase';
import InputBaseLabel from '../InputBaseLabel';
import type { InputSharedProps } from '../types';
import {
  DEFAULT_PIN_CODE_LENGTH,
  DEFAULT_PIN_CODE_TYPE,
  INPUT_MODE_BY_TYPE,
  REGEX_BY_TYPE,
} from './constants';
import { type PinCodeType } from './types';

import inputNumberStyles from '../Number/styles.module.scss';
import styles from './styles.module.scss';

export type PinCodeProps = DataTestId &
  InputSharedProps & {
    length?: number;
    onComplete?: (pin: string) => void;
    onChange?: (pin: string) => void;
    type?: PinCodeType;
  };

const PinCode = ({
  autoFocus,
  'data-testid': testId = 'input-pincode',
  length = DEFAULT_PIN_CODE_LENGTH,
  onChange,
  onComplete,
  type = DEFAULT_PIN_CODE_TYPE,
  ...rest
}: PinCodeProps) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>(
    Array(length).fill(null),
  );
  const [code, setCode] = useState(Array(length).fill(''));
  const [focusTriggerFlag, setFocusTriggerFlag] = useState(false);
  const focusIndexRef = useRef(0);
  const isPasteRef = useRef(false);

  const formattedCode = code.join('');
  const isCompleted = code.every(Boolean);

  const changeCodeAtIndex = (index: number, value?: string) => {
    setCode(prev => {
      const newCode = [...prev];
      newCode[index] = value || '';
      return newCode;
    });
  };

  const decrementFocusIndex = () => {
    const prev = focusIndexRef.current;
    focusIndexRef.current = Math.max(0, prev - 1);
  };

  const incrementFocusIndex = () => {
    const prev = focusIndexRef.current;
    focusIndexRef.current = Math.min(length - 1, prev + 1);
  };

  const getCharIndexToReplace = (newCode: string, oldCode: string) => {
    return newCode[0] === oldCode ? 1 : 0;
  };

  const getEventHandlers = (index: number) => {
    const handleFocus = () => {
      focusIndexRef.current = index;
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (isPasteRef.current) {
        isPasteRef.current = false;
        return;
      }

      changeCodeAtIndex(
        index,
        event.target.value.at(
          getCharIndexToReplace(event.target.value, code[index]),
        ),
      );
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      const { key, ctrlKey, shiftKey } = event;

      const isValidInput = key.length === 1 && REGEX_BY_TYPE[type].test(key);

      // we don't prevent default if user is pressing ctrl
      // so that ctrl+v is still possible with type: "digits"
      if (!isValidInput && !ctrlKey && key !== 'Enter') {
        event.preventDefault();
      }

      if (key === 'Backspace') {
        changeCodeAtIndex(index, '');
        decrementFocusIndex();
      } else if (key === 'ArrowLeft' || (key === 'Tab' && shiftKey)) {
        decrementFocusIndex();
        setFocusTriggerFlag(prev => !prev);
      } else if (isValidInput || key === 'ArrowRight' || key === 'Tab') {
        incrementFocusIndex();
        if (!isValidInput) {
          setFocusTriggerFlag(prev => !prev);
        }
      }
    };

    const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
      const data = event.clipboardData;
      isPasteRef.current = true;

      const pasted = data.getData('Text').slice(0, length).split('');
      const passCode = pasted.join('');
      const isValid =
        passCode.length === length && REGEX_BY_TYPE[type].test(passCode);

      if (!isValid) {
        event.preventDefault();
        return;
      }

      focusIndexRef.current = length - 1;
      setCode(pasted);
    };

    return {
      onKeyDown: handleKeyDown,
      onChange: handleChange,
      onFocus: handleFocus,
      onPaste: handlePaste,
    };
  };

  // refocus is done AFTER the input has been registered, not on keyDown.
  // if focus changes because of an arrow key press, we trigger the effect
  // "manually" with focusTriggerFlag
  useDidMountEffect(() => {
    const ref = inputsRef.current[focusIndexRef.current];

    ref?.focus();
  }, [focusTriggerFlag, code]);

  useDidMountEffect(() => {
    onChange?.(formattedCode);
  }, [formattedCode]);

  useDidMountEffect(() => {
    if (isCompleted) {
      onComplete?.(formattedCode);
    }
  }, [isCompleted]);

  return (
    <InputBaseLabel data-testid={testId} onChange={onChange} {...rest}>
      {({ name, ...props }) => (
        <Stack gap={3}>
          {Array.from({ length }, (_, index) => (
            <InputBaseLabel key={index} {...props} withLabel={false}>
              {props => (
                <InputBase {...props}>
                  {({ className, ...props }) => (
                    <input
                      ref={ref => (inputsRef.current[index] = ref)}
                      className={classNames(
                        className,
                        styles.input,
                        inputNumberStyles.withoutArrows,
                      )}
                      autoFocus={autoFocus && index === 0}
                      type={INPUT_MODE_BY_TYPE[type]}
                      {...props}
                      {...getEventHandlers(index)}
                      value={code[index]}
                    />
                  )}
                </InputBase>
              )}
            </InputBaseLabel>
          ))}
          <input name={name} value={formattedCode} hidden readOnly />
        </Stack>
      )}
    </InputBaseLabel>
  );
};

export default PinCode;
