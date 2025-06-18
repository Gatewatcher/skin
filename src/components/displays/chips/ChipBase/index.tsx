import { classNames, stylesToCamelCase } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type {
  CSSProperties,
  MouseEventHandler,
  ReactNode,
  TouchEventHandler,
} from 'react';

import { InternalButtonClose } from '@/skin/actions/buttons/ButtonClose';
import { Text } from '@/skin/typography';

import { CHIP_TEXT_SIZE, DEFAULT_SIZE } from './constants';
import type { ChipSize } from './types';

import styles from './styles.module.scss';

export type ChipBaseProps = DataTestId & {
  children: ReactNode;
  onClick?: MouseEventHandler;
  onClose?: MouseEventHandler;
  onCloseButtonMouseDown?: MouseEventHandler;
  onCloseButtonTouchEnd?: TouchEventHandler;
  size?: ChipSize;
};

export type ChipBaseInternalProps = {
  className?: string;
  style?: CSSProperties;
};

const ChipBase = ({
  children,
  className,
  'data-testid': testId = 'chip',
  onClick,
  onClose,
  onCloseButtonMouseDown,
  onCloseButtonTouchEnd,
  size = DEFAULT_SIZE,
  style,
}: ChipBaseProps & ChipBaseInternalProps) => {
  const hasCloseButton =
    onClose || onCloseButtonMouseDown || onCloseButtonTouchEnd;

  return (
    <div
      className={classNames(
        styles.Chip,
        stylesToCamelCase(styles, 'size', size),
        onClick && styles.clickable,
        className,
      )}
      data-testid={testId}
      onClick={onClick}
      style={style}
    >
      <Text
        size={CHIP_TEXT_SIZE[size]}
        whiteSpace="nowrap"
        currentColor
        overflowHidden
        textEllipsis
      >
        {children}
      </Text>
      {hasCloseButton && (
        <InternalButtonClose
          className={classNames(
            styles.close,
            stylesToCamelCase(styles, 'close', size),
          )}
          onClick={onClose}
          onMouseDown={onCloseButtonMouseDown}
          onTouchEnd={onCloseButtonTouchEnd}
          size={size}
          rounded
        />
      )}
    </div>
  );
};

export default ChipBase;
