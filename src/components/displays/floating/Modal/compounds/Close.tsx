import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import { InternalButtonClose } from '@/skin/actions/buttons/ButtonClose';

import { useFloatingContext } from '../../Floating/context';

import styles from '../styles.module.scss';

export type ModalCloseProps = DataTestId;

const Close = ({ 'data-testid': testId = 'modal-close' }: ModalCloseProps) => {
  const { close } = useFloatingContext();

  return (
    <InternalButtonClose
      className={styles.Close}
      data-testid={testId}
      onClick={close}
    />
  );
};

export default Close;
