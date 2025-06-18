import { classNames, stylesToCamelCase } from '@gatewatcher/bistoury/utils-dom';
import { generateUniqId, withoutKey } from '@gatewatcher/bistoury/utils-lang';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ClipboardEvent, DragEvent, ReactElement, ReactNode } from 'react';

import { DEFAULT_READONLY_MODE, DEFAULT_WITH_COPY_PASTE } from '../constants';
import type { InputSharedProps } from '../types';

import defaultStyles from '../styles.module.scss';
import styles from './styles.module.scss';

export type ExtraElementProps = {
  elementAfter?: ReactNode;
  elementBefore?: ReactNode;
};

export type InputBaseProps = DataTestId &
  InputSharedProps &
  ExtraElementProps & {
    children?: (
      props: Omit<InputBaseProps, 'children'> & { className?: string },
    ) => ReactElement;
    preventAutocomplete?: boolean;
    withErrors?: boolean;
  };

const InputBase = ({
  autoComplete = 'off',
  children,
  'data-testid': testId = 'input-base',
  disabled,
  elementAfter,
  elementBefore,
  fitContent,
  readOnly,
  withErrors,
  readonlyMode = DEFAULT_READONLY_MODE,
  onBlur,
  onFocus,
  onMouseDown,
  preventAutocomplete,
  withCopyPaste = DEFAULT_WITH_COPY_PASTE,
  ...rest
}: InputBaseProps) => {
  const childNode =
    children &&
    children({
      autoComplete,
      className: classNames(
        styles.input,
        elementBefore && styles.inputMarginLeft,
        elementAfter && styles.inputMarginRight,
      ),
      readOnly,
      disabled,
      onBlur,
      onFocus,
      onMouseDown,
      ...(!withCopyPaste && {
        onPaste: (event: ClipboardEvent<HTMLInputElement>) => {
          event.preventDefault();
          return;
        },
        onDrop: (event: DragEvent<HTMLInputElement>) => {
          event.preventDefault();
          return;
        },
      }),
      ...(preventAutocomplete && {
        name: undefined,
        id: generateUniqId(),
      }),
      ...withoutKey(rest, ['flexGrow']),
    });

  const dataTestid =
    readonlyMode?.enabled && readonlyMode?.variant
      ? suffixTestId(testId, readonlyMode.variant)
      : testId;

  return (
    <span
      className={classNames(
        styles.InputBase,
        defaultStyles.Input,
        fitContent && defaultStyles.fitContent,
        readOnly && defaultStyles.readonly,
        disabled && defaultStyles.disabled,
        withErrors && defaultStyles.errors,
        (elementBefore || elementAfter) &&
          defaultStyles.withElementBeforeOrAfter,
        readonlyMode?.enabled &&
          readonlyMode?.variant &&
          stylesToCamelCase(defaultStyles, readonlyMode.variant),
      )}
      data-testid={dataTestid}
      onBlur={onBlur}
      onFocus={onFocus}
      onMouseDown={onMouseDown}
    >
      {elementBefore}
      {childNode}
      {elementAfter}
    </span>
  );
};

export default InputBase;
