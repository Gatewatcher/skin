import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import { Button } from '@/skin/actions';
import { Label } from '@/skin/displays';
import { Stack } from '@/skin/layout';

import { DEFAULT_WEEK_DAYS } from './constants';

import styles from './styles.module.scss';

export type DaysSelectorProps = DataTestId & {
  label?: string;
  onChange?: (value: number[]) => void;
  tooltip?: string;
  value?: number[];
  weekDays?: [number, string][];
};

const DaysSelector = ({
  'data-testid': testId = 'days-selector',
  label,
  onChange,
  tooltip,
  value = [],
  weekDays = DEFAULT_WEEK_DAYS,
}: DaysSelectorProps) => {
  const handleToggleDay = (index: number) => {
    if (value.includes(index)) {
      onChange?.(value.filter(value => value !== index));
    } else {
      onChange?.([...value, index].sort());
    }
  };

  return (
    <Stack data-testid={testId} direction="column" gap={4}>
      <Label tooltip={tooltip}>{label}</Label>
      <Stack as="ul" className={styles.list}>
        {weekDays.map(([dayIndex, day]) => {
          const isActive = value.includes(dayIndex);

          return (
            <li key={dayIndex} className={styles.item}>
              <Button
                aria-pressed={isActive}
                className={classNames(styles.button, isActive && styles.active)}
                onClick={() => handleToggleDay(dayIndex)}
                size="small"
                type="primary"
                variant="bared"
              >
                {day}
              </Button>
            </li>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default DaysSelector;
