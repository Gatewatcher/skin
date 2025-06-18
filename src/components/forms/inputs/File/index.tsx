import { mergeRefs } from '@gatewatcher/bistoury/utils-react';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ChangeEvent, Ref } from 'react';
import { forwardRef, useEffect, useRef } from 'react';

import type { ButtonAsyncProps } from '@/skin/actions';
import { ButtonAsync } from '@/skin/actions';

import type { InputPropsWithoutRef } from '../types';
import {
  DEFAULT_BUTTON_TYPE,
  DEFAULT_BUTTON_VARIANT,
  DEFAULT_TEST_ID,
} from './constants';

export type FileChangeEventParams = {
  event: ChangeEvent<HTMLInputElement>;
  files: File[];
};

export type FileChangeEvent = (event: FileChangeEventParams) => void;

export type FileProps = DataTestId &
  Omit<
    InputPropsWithoutRef,
    'children' | 'hidden' | 'onChange' | 'type' | 'size'
  > &
  Pick<
    ButtonAsyncProps,
    'endIcon' | 'startIcon' | 'type' | 'variant' | 'isLoading'
  > & {
    label: string;
    onChange?: FileChangeEvent;
    resetOnClick?: boolean;
  };

const File = forwardRef(
  (
    {
      'data-testid': testId = DEFAULT_TEST_ID,
      disabled,
      endIcon,
      isLoading,
      label,
      onChange,
      resetOnClick = true,
      startIcon,
      type = DEFAULT_BUTTON_TYPE,
      variant = DEFAULT_BUTTON_VARIANT,
      ...inputProps
    }: FileProps,
    forwardedRef: Ref<HTMLInputElement>,
  ) => {
    const inputRef = useRef<HTMLInputElement>();
    const inputRefs = mergeRefs([inputRef, forwardedRef]);

    const selectFiles = () => {
      if (inputRef.current && resetOnClick) {
        inputRef.current.value = '';
      }
      inputRef.current?.click();
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        const files = [...(event.currentTarget.files ?? [])];
        onChange({ event, files });
      }
    };

    useEffect(() => {
      const { value } = inputProps;
      const valueFile = value as unknown as File;

      if (valueFile?.name && onChange) {
        onChange({
          event: new Event(
            'change',
          ) as unknown as ChangeEvent<HTMLInputElement>,
          files: [valueFile],
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputProps.value]);

    return (
      <>
        <ButtonAsync
          data-testid={suffixTestId(testId, 'button')}
          disabled={disabled}
          endIcon={endIcon}
          isLoading={isLoading}
          onClick={selectFiles}
          startIcon={startIcon}
          type={type}
          variant={variant}
        >
          {label}
        </ButtonAsync>
        <input
          ref={inputRefs}
          data-testid={suffixTestId(testId, 'input')}
          disabled={disabled}
          onChange={handleChange}
          {...inputProps}
          type="file"
          value={undefined}
          hidden
        />
      </>
    );
  },
);

export default File;
