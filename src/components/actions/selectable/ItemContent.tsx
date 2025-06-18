import type { ReactElement, ReactNode } from 'react';

import type { IconName } from '@/skin/displays';
import { Icon } from '@/skin/displays';
import { Stack } from '@/skin/layout';
import type { TextProps } from '@/skin/typography';
import { Text } from '@/skin/typography';

import { DEFAULT_SIZE, sizesMatching } from './constants';
import type { Size } from './types';

import styles from './styles.module.scss';

type ItemContentConditionalProps =
  | {
      icon?: IconName;
      startElement?: never;
    }
  | { icon?: never; startElement?: ReactElement };

export type ItemContentProps = Pick<TextProps, 'type'> &
  ItemContentConditionalProps & {
    children: ReactNode;
    endElement?: ReactElement;
    isDisabled?: boolean;
    isFocused?: boolean;
    isSelected?: boolean;
    fill?: boolean;
    size?: Size;
  };

const ItemContent = ({
  endElement,
  children,
  icon,
  startElement: startElementProps,
  size = DEFAULT_SIZE,
  type,
}: ItemContentProps) => {
  const sizeMatch = sizesMatching[size];

  const startElement = icon ? (
    <Icon color={type} name={icon} size={sizeMatch.icon} />
  ) : (
    startElementProps
  );

  return (
    <Stack
      alignItems="center"
      className={styles.itemContent}
      padding={{ x: 6, y: 4 }}
    >
      {startElement && (
        <div
          className={styles.startElementContainer}
          data-testid="start-element-container"
        >
          {startElement}
        </div>
      )}
      <Text
        size={sizeMatch.text}
        type={type}
        whiteSpace="nowrap"
        overflowHidden
        textEllipsis
      >
        {children}
      </Text>
      {endElement && (
        <div
          className={styles.endElementContainer}
          data-testid="end-element-container"
        >
          {endElement}
        </div>
      )}
    </Stack>
  );
};

export default ItemContent;
