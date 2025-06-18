import { classNames, stylesToCamelCase } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import type { Spacings } from '@/hocs';
import { withSpacing } from '@/hocs';

import { DEFAULT_DIRECTION } from './constants';
import type { DividerDirection } from './types';

import styles from './styles.module.scss';

export type DividerProps = DataTestId &
  Pick<Spacings, 'margin'> & {
    direction?: DividerDirection;
  };

const Divider = ({
  'data-testid': testId = 'divider',
  direction = DEFAULT_DIRECTION,
  ...spacings
}: DividerProps) => {
  return withSpacing(
    <div
      className={classNames(
        styles.Divider,
        stylesToCamelCase(styles, 'direction', direction),
      )}
      data-testid={testId}
    />,
    spacings,
  );
};

export default Divider;
