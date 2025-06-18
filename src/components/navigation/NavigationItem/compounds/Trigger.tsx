import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import type { IconName } from '@/skin/displays';
import { TextIcon } from '@/skin/displays';
import { useFloatingContext } from '@/skin/displays/floating/Floating/context';

import styles from '../styles.module.scss';

export type NavigationItemTriggerProps = DataTestId & {
  children: ReactNode;
  icon: IconName;
};

const Trigger = ({ children, icon }: NavigationItemTriggerProps) => {
  const { opened } = useFloatingContext();

  return (
    <button
      className={classNames(styles.Trigger, opened && styles.TriggerOpened)}
    >
      <TextIcon endIcon="ChevronDown" startIcon={icon} asFragment currentColor>
        {children}
      </TextIcon>
    </button>
  );
};

export default Trigger;
