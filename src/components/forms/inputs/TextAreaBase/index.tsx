import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { isFunction } from '@gatewatcher/bistoury/utils-lang';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import { forwardRef, useRef } from 'react';

import { Stack } from '@/skin/layout';
import Text from '@/skin/typography/Text';

import type { TextAreaSharedProps } from '../types';
import { useAutoGrow } from './hooks/useAutoGrow';

import defaultStyles from '../styles.module.scss';
import styles from './styles.module.scss';

export type TextAreaBaseProps = DataTestId & {
  withErrors?: boolean;
} & TextAreaSharedProps;

const TextareaBase = forwardRef<HTMLTextAreaElement, TextAreaBaseProps>(
  (
    {
      autoGrow = false,
      autoComplete,
      disabled,
      maxLength,
      meta,
      styling,
      value,
      withErrors,
      readOnly,
      flexGrow,
      ...rest
    },
    forwardedRef,
  ) => {
    const hasMeta = !!(
      meta?.errors?.length ||
      meta?.helpers?.length ||
      meta?.warnings?.length
    );

    const inputRef = useRef<HTMLTextAreaElement | null>(null);

    useAutoGrow(inputRef, { enabled: autoGrow });

    return (
      <Stack
        className={classNames(
          styles.relative,
          maxLength && !hasMeta && styles.withMaxLength,
        )}
        direction="column"
        flexGrow={flexGrow}
      >
        <textarea
          ref={element => {
            inputRef.current = element;
            if (!forwardedRef) {
              return;
            }
            if (isFunction(forwardedRef)) {
              forwardedRef(element);
            } else {
              forwardedRef.current = element;
            }
          }}
          className={classNames(
            defaultStyles.Input,
            styles.Textarea,
            readOnly && defaultStyles.readonly,
            disabled && defaultStyles.disabled,
            withErrors && defaultStyles.errors,
          )}
          autoComplete={autoComplete ?? 'off'}
          disabled={disabled}
          maxLength={maxLength}
          readOnly={readOnly}
          style={{ ...styling, flexGrow }}
          value={value}
          {...rest}
        />
        <Stack
          className={classNames(
            styles.count,
            !hasMeta && styles.countWithPadding,
          )}
        >
          {maxLength ? (
            <Text>{`${(value ?? '')?.toString().length}/${maxLength}`}</Text>
          ) : (
            ''
          )}
        </Stack>
      </Stack>
    );
  },
);

export default TextareaBase;
