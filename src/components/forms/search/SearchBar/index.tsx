import { useDocumentEventListener } from '@gatewatcher/bistoury/hooks';
import { classNames, stylesToCamelCase } from '@gatewatcher/bistoury/utils-dom';
import { isInInput } from '@gatewatcher/bistoury/utils-event';
import { isDefined } from '@gatewatcher/bistoury/utils-lang';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type {
  ChangeEvent,
  ComponentProps,
  FocusEvent,
  MouseEvent,
  KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { InternalButtonClose } from '@/skin/actions/buttons/ButtonClose';
import { Icon } from '@/skin/displays';
import InfoTooltip from '@/skin/displays/InfoTooltip';
import { CircularLoader } from '@/skin/feedback';
import { Stack } from '@/skin/layout';

import { DEFAULT_VARIANT } from './constants';
import type { SearchBarVariant } from './types';
import { getPlaceholder } from './utils';

import styles from './styles.module.scss';

export type SearchBarProps = DataTestId &
  Omit<ComponentProps<'input'>, 'onChange'> & {
    withGrow?: boolean;
    isClearable?: boolean;
    isError?: boolean;
    isLoading?: boolean;
    onArrowDown?: () => void;
    onArrowUp?: () => void;
    onEnter?: () => void;
    onClear?: () => void;
    onChange?: (value: string) => void;
    onEscape?: () => void;
    preventFocusOnClear?: boolean;
    tooltipContent?: string;
    variant?: SearchBarVariant;
    withShortcut?: boolean;
  };

const SearchBar = ({
  'data-testid': testId = 'search-bar',
  defaultValue,
  disabled,
  isClearable,
  isError,
  isLoading,
  onBlur,
  onArrowDown,
  onArrowUp,
  onChange,
  onClear,
  onEnter,
  onEscape,
  onFocus,
  placeholder,
  preventFocusOnClear,
  tooltipContent,
  value: valueProps,
  variant = DEFAULT_VARIANT,
  withGrow,
  withShortcut,
  ...rest
}: SearchBarProps) => {
  const isControlled = isDefined(valueProps);
  const hasDefaultValue = isDefined(defaultValue);

  const [internalValue, setInternalValue] = useState(
    hasDefaultValue ? defaultValue : '',
  );

  const value = isControlled ? valueProps : internalValue;

  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      const action = isFocused ? 'focus' : 'blur';
      inputRef.current[action]();
    }
  }, [disabled, isFocused]);

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      onFocus?.(event);

      setIsFocused(true);
    },
    [onFocus],
  );

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    onBlur?.(event);
    setIsFocused(false);

    if (inputRef.current) {
      const valueLength = inputRef.current.value.length;
      inputRef.current.setSelectionRange(valueLength, valueLength);
    }
  };

  const handleSearchBarMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    const eventSpawnedOutsideInput = event.target !== inputRef.current;
    if (eventSpawnedOutsideInput || disabled) {
      event.preventDefault();
    }

    if (!disabled) {
      inputRef.current?.focus();
    }
  };

  const handleClearMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    setInternalValue('');
    onClear?.();
    onChange?.('');

    if (preventFocusOnClear) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const handleKeyDown = (event: ReactKeyboardEvent) => {
    const keys = {
      ArrowDown: onArrowDown,
      ArrowUp: onArrowUp,
      Enter: onEnter,
      Escape: () => {
        event.stopPropagation();
        onEscape?.();
      },
    };

    Object.entries(keys).forEach(([key, handler]) => {
      if (event.key === key && handler) {
        event.preventDefault();
        handler();
      }
    });
  };

  useDocumentEventListener('keydown', (event: DocumentEventMap['keydown']) => {
    if (withShortcut && event.key === '/' && !isInInput(event)) {
      inputRef.current?.focus();
      event.stopPropagation();
      event.preventDefault();
    }
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
    if (!isControlled) {
      setInternalValue(event.target.value);
    }
  };

  return (
    <>
      <Stack
        className={classNames(
          styles.SearchBar,
          disabled && styles.disabled,
          isError && styles.error,
          stylesToCamelCase(styles, 'variant', variant),
          variant === 'ghosted' && styles.ghosted,

          withGrow && styles.grow,
        )}
        alignItems="center"
        data-testid={testId}
        gap={4}
        onFocus={handleFocus}
        onMouseDown={handleSearchBarMouseDown}
        role="search"
        tabIndex={isFocused || disabled ? -1 : 0}
      >
        {isLoading ? (
          <div className={styles.indicatorContainer}>
            <CircularLoader />
          </div>
        ) : (
          <Stack
            className={classNames(
              styles.iconContainer,
              isFocused && styles.focused,
            )}
            alignItems="center"
          >
            <Icon name="Search" />
          </Stack>
        )}
        <input
          ref={inputRef}
          placeholder={getPlaceholder({
            placeholder,
            withShortcut,
          })}
          className={classNames(styles.input)}
          data-testid={suffixTestId(testId, 'input')}
          disabled={disabled}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
          value={value}
          {...rest}
        />
        <Stack alignItems="center" gap={2}>
          {isClearable && value && (
            <div className={styles.indicatorContainer}>
              <InternalButtonClose
                className={styles.clearButton}
                data-testid={suffixTestId(testId, 'clear')}
                disabled={disabled}
                onMouseDown={handleClearMouseDown}
                tabIndex={-1}
              />
            </div>
          )}
          {!!tooltipContent && (
            <div className={styles.indicatorContainer}>
              <InfoTooltip info={tooltipContent} />
            </div>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default SearchBar;
