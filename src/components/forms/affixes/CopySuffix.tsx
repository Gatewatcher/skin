import { useCopyToClipboard } from '@gatewatcher/bistoury/hooks';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import { useRef, useState } from 'react';

import { InternalButtonIcon } from '@/skin/actions/buttons/ButtonIcon';
import { Tooltip } from '@/skin/displays';

import Suffix from './Suffix';

import styles from './styles.module.scss';

export type CopySuffixProps = DataTestId & {
  clipText: string;
  label?: string;
  successLabel?: string;
};

const CopySuffix = ({
  clipText,
  'data-testid': testId = 'copy-suffix',
  label = 'Copy',
  successLabel = 'Copied!',
}: CopySuffixProps) => {
  const chrono = useRef<number>();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSuccess = () => {
    clearTimeout(chrono.current);
    chrono.current = window.setTimeout(() => {
      setIsSuccess(false);
    }, 2000);

    setIsSuccess(true);
  };

  const copy = useCopyToClipboard(clipText, { onSuccess: handleSuccess });

  return (
    <Suffix data-testid={testId}>
      <Tooltip
        content={isSuccess ? successLabel : label}
        onClose={() => setIsSuccess(false)}
      >
        <InternalButtonIcon
          className={styles.copy}
          icon="Copy"
          onClick={copy}
          size="small"
          type="neutral"
          variant="ghosted"
        />
      </Tooltip>
    </Suffix>
  );
};

export default CopySuffix;
