import type { StackProps } from '@/skin/layout';
import { Stack } from '@/skin/layout';

import styles from '../styles.module.scss';

export type DrawerFooterProps = Omit<StackProps, 'padding'>;

const Footer = ({
  children,
  'data-testid': testId = 'drawer-footer',
  ...rest
}: DrawerFooterProps) => {
  return (
    <Stack
      className={styles.Footer}
      data-testid={testId}
      padding={{ y: 9 }}
      {...rest}
    >
      {children}
    </Stack>
  );
};

export default Footer;
