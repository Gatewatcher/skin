import { useKeyPressed } from '@gatewatcher/bistoury/hooks';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import { useEffect } from 'react';

import { ButtonClose } from '@/skin/actions';
import { Stack } from '@/skin/layout';

import { useDrawerContext } from '../context';

import styles from '../styles.module.scss';

export type DrawerCloseProps = DataTestId;

const Close = ({
  'data-testid': testId = 'drawer-close',
}: DrawerCloseProps) => {
  const { close, withEscape } = useDrawerContext();

  const escapePressed = useKeyPressed('Escape');

  useEffect(() => {
    if (withEscape.current && escapePressed) {
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [escapePressed, withEscape]);

  return (
    <Stack.Item alignSelf="center" className={styles.Icon}>
      <ButtonClose data-testid={testId} onClick={close} />
    </Stack.Item>
  );
};

export default Close;
