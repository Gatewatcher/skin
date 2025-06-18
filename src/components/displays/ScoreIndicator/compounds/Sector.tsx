import {
  classNames,
  stylesToPascalCase,
} from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import type { NeutralType, Type } from '@/types';

import type { ScoreIndicatorSize } from '../types';

import styles from '../styles.module.scss';

type SectorProps = DataTestId & {
  color: Type | NeutralType;
  length: number;
  size: ScoreIndicatorSize;
};

const Sector = ({
  color,
  length,
  size,
  'data-testid': testId,
}: SectorProps) => {
  return (
    <div
      className={classNames(
        styles.Sector,
        stylesToPascalCase(styles, 'Sector', size),
        stylesToPascalCase(styles, 'Sector', color, `${length}`),
        stylesToPascalCase(styles, 'SectorRotate', `${length}`),
      )}
      data-color={color}
      data-testid={testId}
    />
  );
};

export default Sector;
