import { useKeyPressed } from '@gatewatcher/bistoury/hooks';
import { useEffect } from 'react';

import { ButtonClose } from '@/skin/actions';

import { useDrawerV2 } from '../components/LayoutProvider';

type CloseProps = {
  closeOnEscapeKeyPress?: boolean;
};

const Close = ({ closeOnEscapeKeyPress }: CloseProps) => {
  const { onClose } = useDrawerV2();
  const escapeKeyPressed = useKeyPressed('Escape');

  useEffect(() => {
    if (closeOnEscapeKeyPress && escapeKeyPressed) {
      onClose();
    }
  }, [closeOnEscapeKeyPress, escapeKeyPressed, onClose]);

  return <ButtonClose onClick={onClose} />;
};

export default Close;
