import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { SyntheticEvent } from 'react';

import { ButtonIcon } from '@/skin/actions';
import { Icon } from '@/skin/displays';
import { Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';

import type { Tab } from '../types';

import styles from '../styles.module.scss';

export type TabTitleProps = {
  isActive: boolean;
  onClick: () => void;
  onClose: () => void;
  onUnpin: () => void;
  tab: Tab;
};

const TabTitle = ({
  isActive,
  onClick,
  onClose,
  onUnpin,
  tab,
}: TabTitleProps) => {
  return (
    <Stack
      alignItems="center"
      aria-label={tab.title}
      aria-selected={isActive}
      className={classNames(styles.tab, isActive && styles.active)}
      gap={6}
      onClick={onClick}
      role="tab"
    >
      {tab.iconName && (
        <div style={{ color: 'var(--color-primary)' }}>
          <Icon
            color={tab.iconColor}
            currentColor={!tab.iconColor && isActive}
            name={tab.iconName}
            size="small"
          />
        </div>
      )}
      {!!tab.title && (
        <div className={classNames(isActive && styles.active && styles.title)}>
          <Text
            italic={tab?.isEditable}
            weight="medium"
            whiteSpace="nowrap"
            currentColor
          >
            {tab.title}
          </Text>
        </div>
      )}
      {tab.isEditable && tab.isPinned && (
        <ButtonIcon
          aria-label="unpin"
          className={classNames(styles.closeButton)}
          icon="Unpin"
          onClick={withStopPropagation(onUnpin)}
          size="small"
          type="neutral"
          variant="ghosted"
        />
      )}
      {tab.isEditable && !tab.isPinned && (
        <ButtonIcon
          aria-label="close"
          className={classNames(styles.closeButton)}
          icon="Close"
          onClick={withStopPropagation(onClose)}
          size="small"
          type="neutral"
          variant="ghosted"
        />
      )}
    </Stack>
  );
};

const withStopPropagation = <T extends SyntheticEvent>(
  fn: (event: T) => void,
): ((event: T) => void) => {
  return event => {
    event.stopPropagation();
    fn(event);
  };
};

export default TabTitle;
