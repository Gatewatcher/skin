import { FloatingPortal } from '@floating-ui/react';
import {
  useOnWindowResize,
  useOnWindowScroll,
} from '@gatewatcher/bistoury/hooks';
import { classNames, stylesToCamelCase } from '@gatewatcher/bistoury/utils-dom';
import { isFunction } from '@gatewatcher/bistoury/utils-lang';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type {
  ComponentProps,
  DragEvent,
  FocusEvent,
  ForwardedRef,
  MouseEvent,
  ReactElement,
  Ref,
} from 'react';
import type React from 'react';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';

import { withElevation } from '@/hocs';
import { Icon } from '@/skin/displays';
import TextAreaBase from '@/skin/forms/inputs/TextAreaBase';
import { Stack } from '@/skin/layout';
import { List } from '@/skin/listings';
import { Text } from '@/skin/typography';

import type { ExtraElementProps } from '../InputBase';
import InputBase from '../InputBase';
import { Attachment } from './components/Attachment';
import { DEFAULT_ATTACHMENT_LIMIT, DEFAULT_MAX_ROWS } from './constants';
import type {
  AttachmentError,
  AttachmentOptions,
  AutoCompletionOption,
  AutoCompletionSettings,
  ChatBoxAttachment,
} from './types';

import inputStyles from '../InputBase/styles.module.scss';
import styles from './styles.module.scss';

const DEFAULT_ELEMENT_BEFORE = () => (
  <Stack.Item alignSelf="flex-end">
    <Icon name="Upload" />
  </Stack.Item>
);

export type ChatBoxProps<
  T extends ChatBoxAttachment,
  U extends AutoCompletionOption,
> = DataTestId &
  ExtraElementProps &
  Omit<
    ComponentProps<'textarea'>,
    'form' | 'type' | 'style' | 'children' | 'label' | 'rows'
  > & {
    attachments?: T[];
    attachmentOptions?: AttachmentOptions;
    onAttachmentError?: AttachmentError<T>;
    onFocus?: (
      event: FocusEvent<
        HTMLTextAreaElement | HTMLInputElement | HTMLDivElement
      >,
    ) => void;
    onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
    onAttachmentDelete?: (attachment: T) => void;
    maxRows?: number;
    autoCompletionSettings?: AutoCompletionSettings<U>;
  };

const ChatBox = <T extends ChatBoxAttachment, U extends AutoCompletionOption>(
  {
    'data-testid': testId = 'input-chat-box',
    disabled,
    readOnly,
    autoComplete = 'off',
    attachments,
    onAttachmentError,
    onFocus,
    onBlur,
    onAttachmentDelete,
    attachmentOptions,
    elementBefore = <DEFAULT_ELEMENT_BEFORE />,
    elementAfter,
    value,
    maxRows = DEFAULT_MAX_ROWS,
    onDrop,
    autoCompletionSettings,
    onKeyDown,
    ...rest
  }: ChatBoxProps<T, U>,
  forwardedRef: ForwardedRef<HTMLTextAreaElement>,
) => {
  const inputRef = useRef<HTMLTextAreaElement | null>();
  const chatBoxRef = useRef<HTMLElement | null>();
  const optionsRef = useRef<(HTMLElement | null)[]>([]);

  const [isFocused, setIsFocused] = useState(false);
  const [listPosition, setListPosition] = useState({ top: 0, left: 0 });
  const [placement, setPlacement] = useState<'top' | 'bottom'>('bottom');
  const [filteredListOptions, setFilteredListOptions] = useState<U[]>(
    autoCompletionSettings ? [...autoCompletionSettings.options] : [],
  );
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);
  const [exitOptionsList, setExitOptionsList] = useState(false);
  const [isHoveringList, setIsHoveringList] = useState(false);

  const updateListPosition = useCallback(() => {
    if (inputRef.current && chatBoxRef.current && autoCompletionSettings) {
      const inputRect = inputRef.current.getBoundingClientRect();
      const chatBoxRect = chatBoxRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      const spaceAbove = inputRect.top;
      const spaceBelow = viewportHeight - inputRect.bottom;

      if (spaceBelow >= 200 || spaceBelow > spaceAbove) {
        setListPosition({
          top: chatBoxRect.bottom + scrollY,
          left: inputRect.left,
        });
        setPlacement('bottom');
      } else {
        setListPosition({
          top: chatBoxRect.top + scrollY,
          left: inputRect.left,
        });
        setPlacement('top');
      }
    }
  }, [setListPosition, autoCompletionSettings]);

  useEffect(() => {
    if (!isFunction(inputRef) && inputRef?.current) {
      const action = isFocused ? 'focus' : 'blur';
      inputRef.current[action]();
    }
  }, [disabled, isFocused]);

  useEffect(() => {
    if (inputRef.current) {
      const textarea = inputRef.current;
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const lineHeight = parseInt(
        window.getComputedStyle(textarea).lineHeight,
        10,
      );
      const maxHeight = lineHeight * maxRows;
      textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
      textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
    }
  }, [value, maxRows]);

  useEffect(() => {
    if (typeof value === 'string' && autoCompletionSettings) {
      setExitOptionsList(false);
      const allWords = value.split(' ');
      const lastWord = allWords.at(-1)?.trim();
      if (lastWord) {
        if (autoCompletionSettings.filterOptions) {
          const newOptions = autoCompletionSettings.filterOptions(
            autoCompletionSettings.options,
            { value, lastWord },
          );
          setFilteredListOptions(newOptions);
        } else {
          const newOptions = autoCompletionSettings.options.filter(option =>
            option.label.includes(lastWord),
          );
          setFilteredListOptions(newOptions);
        }
      } else {
        setFilteredListOptions([]);
      }
    } else {
      setFilteredListOptions([]);
    }
  }, [value, autoCompletionSettings]);

  useEffect(() => {
    updateListPosition();
  }, [updateListPosition]);

  useEffect(() => {
    const optionElement = optionsRef.current[focusedOptionIndex];
    if (optionElement) {
      optionElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [focusedOptionIndex]);

  useOnWindowResize(updateListPosition);
  useOnWindowScroll(updateListPosition, true);

  const isOptionsDropdownOpened =
    autoCompletionSettings && filteredListOptions.length && !exitOptionsList;

  const handleFocus = useCallback(
    (event?: FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      if (event) {
        onFocus?.(event);
      }

      setIsFocused(true);
      setFocusedOptionIndex(-1);
    },
    [onFocus, setFocusedOptionIndex],
  );

  const handleBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
    onBlur?.(event);
    setIsFocused(false);
    if (!isHoveringList) {
      setExitOptionsList(true);
    }

    if (!isFunction(inputRef) && inputRef?.current) {
      const valueLength = inputRef.current.value.length;
      inputRef.current.setSelectionRange(valueLength, valueLength);
    }
  };

  const handleDrop = (event: DragEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    onDrop?.(event);
  };

  const handleSearchBarMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (isFunction(inputRef) || !inputRef?.current) {
      return;
    }
    const eventSpawnedOutsideInput = event.target !== inputRef.current;
    if (eventSpawnedOutsideInput || disabled) {
      event.preventDefault();
    }

    if (!disabled) {
      inputRef.current?.focus();
    }
  };

  const handleOptionSelect = (option: U) => {
    if (autoCompletionSettings) {
      const action = option.onClick || autoCompletionSettings.onSelect;
      if (action) {
        action(option);
      }

      setExitOptionsList(true);
      setFocusedOptionIndex(-1);
      setIsHoveringList(false);
    }
  };

  const handleInputKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (autoCompletionSettings && isOptionsDropdownOpened) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        if (onKeyDown) {
          onKeyDown(event);
        }

        if (event.key === 'ArrowDown') {
          setFocusedOptionIndex(
            prevIndex => (prevIndex + 1) % filteredListOptions.length,
          );
        } else {
          setFocusedOptionIndex(prevIndex => {
            if (prevIndex === -1) {
              return filteredListOptions.length - 1;
            } else {
              return (
                (prevIndex - 1 + filteredListOptions.length) %
                filteredListOptions.length
              );
            }
          });
        }
      } else if (event.key === 'Escape') {
        setExitOptionsList(true);
        setFocusedOptionIndex(-1);
        if (onKeyDown) {
          onKeyDown(event);
        }
      } else if (
        event.key === 'Enter' &&
        !event.shiftKey &&
        focusedOptionIndex >= 0
      ) {
        event.preventDefault();
        const option = filteredListOptions[focusedOptionIndex];
        const action = option.onClick || autoCompletionSettings.onSelect;
        if (action) {
          action(option);
        }
        setExitOptionsList(true);
      } else if (onKeyDown) {
        onKeyDown(event);
      }
    } else {
      if (onKeyDown) {
        onKeyDown(event);
      }
    }
  };

  const handleListMouseEnter = () => {
    setIsHoveringList(true);
    setFocusedOptionIndex(-1);
  };

  const handleListMouseLeave = () => {
    setIsHoveringList(false);
  };

  return (
    <>
      <InputBase
        data-testid={testId}
        elementAfter={elementAfter}
        elementBefore={elementBefore}
        onFocus={handleFocus}
        onMouseDown={handleSearchBarMouseDown}
        tabIndex={isFocused || disabled ? -1 : 0}
      >
        {() => (
          <Stack
            className={classNames(
              styles.ChatBox,
              attachments?.length && styles.ChatBoxWithAttachment,
            )}
            setRef={element => (chatBoxRef.current = element)}
          >
            <Stack
              className={classNames(styles.ChatBoxInputContainer)}
              direction="column"
              gap={4}
            >
              {!!attachments?.length && (
                <Stack
                  className={classNames(styles.ChatBoxAttachmentsContainer)}
                  direction="column"
                  gap={3}
                >
                  {attachments
                    .slice(
                      0,
                      attachmentOptions?.limit || DEFAULT_ATTACHMENT_LIMIT,
                    )
                    .map((attachment, index) => (
                      <Attachment
                        key={index}
                        attachment={attachment}
                        data-testid={suffixTestId(testId, 'attachment')}
                        onAttachmentDelete={onAttachmentDelete}
                        {...attachmentOptions}
                        errors={onAttachmentError?.(attachment)}
                      />
                    ))}
                </Stack>
              )}

              <TextAreaBase
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
                autoComplete={autoComplete}
                className={classNames(inputStyles.input)}
                data-testid={suffixTestId(testId, 'input')}
                disabled={disabled}
                onBlur={handleBlur}
                onDrop={handleDrop}
                onFocus={handleFocus}
                onKeyDown={handleInputKeyDown}
                readOnly={readOnly}
                rows={1}
                styling={{ resize: 'none' }}
                value={value}
                {...rest}
              />
            </Stack>
          </Stack>
        )}
      </InputBase>

      {isOptionsDropdownOpened ? (
        <FloatingPortal>
          {withElevation(
            <Stack
              className={classNames(
                styles.autoCompletionOptionsList,
                placement === 'top' && styles.autoCompletionOptionsListTop,
              )}
              onMouseEnter={handleListMouseEnter}
              onMouseLeave={handleListMouseLeave}
              style={{ ...listPosition }}
              tabIndex={0}
            >
              <List
                data={filteredListOptions}
                data-testid={suffixTestId(testId, 'options')}
                withControls={false}
              >
                {(option, { index }) => (
                  <Stack
                    key={option.value}
                    className={classNames(
                      styles.listItem,
                      focusedOptionIndex === index &&
                        stylesToCamelCase(styles, 'listItem', 'selected'),
                    )}
                    data-testid={suffixTestId(testId, `option-${option.value}`)}
                    onClick={() => handleOptionSelect(option)}
                    setRef={element => (optionsRef.current[index] = element)}
                  >
                    <Text
                      data-testid={suffixTestId(
                        testId,
                        `option-label-${option.value}`,
                      )}
                    >
                      {option.label}
                    </Text>
                  </Stack>
                )}
              </List>
            </Stack>,
            2,
          )}
        </FloatingPortal>
      ) : null}
    </>
  );
};

export default forwardRef(ChatBox) as <
  T extends ChatBoxAttachment,
  U extends AutoCompletionOption,
>(
  p: ChatBoxProps<T, U> & { ref?: Ref<HTMLTextAreaElement> },
) => ReactElement;
