import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { isDefined, isFunction } from '@gatewatcher/bistoury/utils-lang';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { MouseEvent } from 'react';
import { useRef } from 'react';

import { ButtonIcon } from '@/skin/actions';
import { Input } from '@/skin/forms';
import type { RadioProps } from '@/skin/forms/inputs/Radio';
import { Stack } from '@/skin/layout';
import { OverflownText } from '@/skin/typography';

import { useFinderPanelContext, useFinderPanelsContext } from '../contexts';
import type { ItemBase } from '../types';

import styles from '../styles.module.scss';

export type FinderPanelItemProps<T extends ItemBase> = DataTestId & {
  hasChildren: boolean | ((item: T) => boolean);
  item: T;
  onReset?: (item: T) => void;
  onSelect?: (item: T) => void;
  withInput?: boolean;
} & Pick<RadioProps, 'checked' | 'defaultChecked' | 'onChange' | 'disabled'>;

const PanelItem = <T extends ItemBase>({
  'data-testid': testId = 'finder-panel-item',
  disabled,
  hasChildren: hasChildrenProps,
  item,
  onReset,
  onSelect,
  withInput = true,
  ...rest
}: FinderPanelItemProps<T>) => {
  const { name } = useFinderPanelContext();
  const { width } = useFinderPanelsContext();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (!inputRef.current || disabled) return;

    let checked = !inputRef.current.checked;
    if (
      event.target instanceof HTMLInputElement &&
      isDefined(event.target.checked)
    ) {
      checked = event.target.checked;
    }

    if (checked) {
      onSelect?.(item);
    } else {
      onReset?.(item);
    }
  };

  const hasChildren = isFunction(hasChildrenProps)
    ? hasChildrenProps(item)
    : hasChildrenProps;

  return (
    <Stack
      alignItems="center"
      className={classNames(disabled && styles.PanelItemDisabled)}
      data-testid={testId}
      gap={7}
      justifyContent="space-between"
      padding={{ x: 2 }}
    >
      <Stack
        alignItems="center"
        as={disabled ? 'div' : 'label'}
        className={styles.pointer}
        onClick={handleClick}
        style={{ maxWidth: width - 60 }}
      >
        {withInput ? (
          <Input.Radio
            ref={inputRef}
            disabled={disabled}
            name={name}
            value={item.id}
            {...rest}
          />
        ) : (
          <div className={styles.PanelItemPlaceholder} />
        )}
        <OverflownText>{item.name}</OverflownText>
      </Stack>

      {hasChildren && (
        <ButtonIcon
          icon="ChevronRight"
          onClick={handleClick}
          size="small"
          type="neutral"
          variant="transparent"
        />
      )}
    </Stack>
  );
};

export default PanelItem;
