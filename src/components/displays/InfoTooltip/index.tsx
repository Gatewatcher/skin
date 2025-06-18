import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Icon, Tooltip } from '@/skin/displays';

import styles from './styles.module.scss';

export type InfoTooltipProps = DataTestId & {
  info: ReactNode;
};

const InfoTooltip = ({ info }: InfoTooltipProps) => {
  return (
    <Tooltip content={info}>
      <Icon
        className={styles.infoIcon}
        color="info"
        name="CircleFilledInfo"
        size="small"
      />
    </Tooltip>
  );
};

export default InfoTooltip;
