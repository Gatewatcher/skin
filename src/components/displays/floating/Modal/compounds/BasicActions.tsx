import { isDefined } from '@gatewatcher/bistoury/utils-lang';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { MouseEvent } from 'react';
import { useEffect } from 'react';

import type { ButtonProps } from '@/skin/actions';
import { Button, ButtonAsync } from '@/skin/actions';
import { Stack } from '@/skin/layout';

import { useFloatingContext } from '../../Floating/context';
import { DEFAULT_CANCEL_LABEL, DEFAULT_SAVE_LABEL } from '../constants';
import { useModalContext } from '../context';

import styles from '../styles.module.scss';

export type ModalBasicActionsProps = DataTestId &
  Pick<ButtonProps, 'type'> & {
    cancelLabel?: string;
    disabled?: boolean;
    isLoading?: boolean;
    onCancel?: ButtonProps['onClick'];
    onSave?: ButtonProps['onClick'];
    saveLabel?: string;
    withCloseOnActionEnd?: boolean;
  };

const BasicActions = ({
  cancelLabel = DEFAULT_CANCEL_LABEL,
  'data-testid': testId = 'modal-basic-actions',
  disabled,
  isLoading,
  onCancel,
  onSave,
  saveLabel = DEFAULT_SAVE_LABEL,
  type,
  withCloseOnActionEnd = true,
}: ModalBasicActionsProps) => {
  const { close } = useFloatingContext();
  const { setWithCloseOnOutsidePress } = useModalContext();

  useEffect(() => {
    setWithCloseOnOutsidePress(false);
  }, [setWithCloseOnOutsidePress]);

  const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    onCancel?.(e);
    withCloseOnActionEnd && close();
  };

  const handleSave = async (e: MouseEvent<HTMLButtonElement>) => {
    await onSave?.(e);
    if (withCloseOnActionEnd) {
      isDefined(isLoading) ? setTimeout(close, 300) : close();
    }
  };

  return (
    <Stack
      className={styles.BasicActions}
      data-testid={testId}
      gap={6}
      justifyContent="flex-end"
    >
      <Button disabled={isLoading} onClick={handleCancel} variant="outlined">
        {cancelLabel}
      </Button>
      <ButtonAsync
        disabled={disabled}
        isLoading={isLoading}
        onClick={handleSave}
        type={type}
      >
        {saveLabel}
      </ButtonAsync>
    </Stack>
  );
};

export default BasicActions;
