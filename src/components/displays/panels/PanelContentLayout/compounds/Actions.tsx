import type { ReactNode } from 'react';

import styles from '../styles.module.scss';

export type ActionsProps = { children?: ReactNode; id?: string };

const Actions = ({ children, id }: ActionsProps) => {
  return (
    <div className={styles.Actions} id={id}>
      {children}
    </div>
  );
};

export default Actions;
