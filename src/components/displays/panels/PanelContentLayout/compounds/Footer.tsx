import type { ReactNode } from 'react';

import styles from '../styles.module.scss';

export type FooterProps = {
  children?: ReactNode;
};

const Footer = ({ children }: FooterProps) => {
  return <footer className={styles.Footer}>{children}</footer>;
};

export default Footer;
