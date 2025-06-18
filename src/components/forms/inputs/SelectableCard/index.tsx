import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import type { GridProps } from '@/skin/layout';
import { Grid } from '@/skin/layout';
import { Text } from '@/skin/typography';

import type { InputSharedProps } from '../types';
import { CheckboxCardInput } from './compounds/inputs/CheckboxCardInput';
import { RadioCardInput } from './compounds/inputs/RadioCardInput';

import styles from './styles.module.scss';

export type CardInputProps = Omit<InputSharedProps, 'label'> & {
  label?: string;
  description?: string;
};

export type SelectableCardProps = Omit<InputSharedProps, 'label'> &
  Pick<GridProps, 'columns' | 'rows' | 'colSpan' | 'rowSpan'> & {
    type: 'radio' | 'checkbox';
    children: (Component: (props: CardInputProps) => ReactNode) => ReactNode;
  };

export const TEST_ID: TestId = 'selectable-card';

const SelectableCard = ({
  'data-testid': testId = TEST_ID,
  type,
  children,
  columns,
  rows,
  colSpan,
  rowSpan,
  ...rest
}: SelectableCardProps) => {
  return (
    <Grid
      columns={columns}
      gap={8}
      rows={rows}
      isContainer
      withEqualWidthColumns
    >
      {children(({ description, ...props }: CardInputProps) => (
        <label data-testid={testId}>
          <Grid
            className={styles.SelectableCardITem}
            colSpan={colSpan}
            rowSpan={rowSpan}
            isItem
          >
            {type === 'radio' ? (
              <RadioCardInput
                data-testid={suffixTestId(testId, 'radio')}
                {...props}
                {...rest}
              />
            ) : (
              <CheckboxCardInput
                data-testid={suffixTestId(testId, 'checkbox')}
                {...props}
                {...rest}
              />
            )}
            <span className={styles.SelectableCardITemText}>
              <Text
                data-testid={suffixTestId(testId, 'description')}
                currentColor
              >
                {description}
              </Text>
            </span>
          </Grid>
        </label>
      ))}
    </Grid>
  );
};

export default SelectableCard;
