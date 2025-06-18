import {
  classNames,
  stylesToPascalCase,
} from '@gatewatcher/bistoury/utils-dom';
import { isObjectEqual } from '@gatewatcher/bistoury/utils-lang';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import { Chip } from '@/skin/displays';
import { Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';
import type { Type } from '@/types';

import Sector from './compounds/Sector';
import { DEFAULT_SIZE } from './constants';
import type { ScoreIndicatorSector, ScoreIndicatorSize } from './types';
import {
  checkSectorsErrors,
  getActiveSector,
  getFormattedSectors,
} from './utils';

import styles from './styles.module.scss';

export type ScoreIndicatorProps = DataTestId & {
  sectors: (ScoreIndicatorSector | Type)[];
  value: number;
  size?: ScoreIndicatorSize;
};

const ScoreIndicator = ({
  'data-testid': testId,
  sectors,
  value,
  size = DEFAULT_SIZE,
}: ScoreIndicatorProps) => {
  const formattedSectors = getFormattedSectors(sectors);

  const errors = checkSectorsErrors(formattedSectors);

  if (errors) {
    console.error(checkSectorsErrors(formattedSectors));
    return null;
  }

  const activeSector = getActiveSector(formattedSectors, value);

  return (
    <Stack
      className={classNames(
        styles.ScoreIndicator,
        stylesToPascalCase(styles, 'ScoreIndicator', size),
      )}
      alignItems="center"
      data-testid={testId}
      direction="column"
      justifyContent="flex-end"
    >
      {formattedSectors.map((sector, index, array) => (
        <Sector
          key={index}
          color={
            isObjectEqual(activeSector || {}, sector) ? sector.type : 'neutral'
          }
          data-testid={testId ? `${testId}-sector-${index}` : undefined}
          length={array.length}
          size={size}
        />
      ))}
      <Stack
        className={classNames(
          styles.TextContainer,
          stylesToPascalCase(styles, 'TextContainer', size),
          stylesToPascalCase(
            styles,
            'TextContainerColor',
            activeSector?.type || 'low',
          ),
        )}
        alignItems="flex-end"
      >
        {value}
        <span>%</span>
      </Stack>
      <Stack
        className={classNames(
          styles.ChipContainer,
          stylesToPascalCase(styles, 'ChipContainer', size),
        )}
      >
        <Chip size="small" type={activeSector?.type}>
          <Text transform="capitalize" currentColor>
            {activeSector?.label || activeSector?.type}
          </Text>
        </Chip>
      </Stack>
    </Stack>
  );
};

export default ScoreIndicator;
