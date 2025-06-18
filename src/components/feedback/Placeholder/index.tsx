import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import type { Spacings } from '@/hocs';
import { Stack } from '@/skin/layout';

import { Actions } from './compounds/Actions';
import { Description } from './compounds/Description';
import { Illustration } from './compounds/Illustration';
import { Title } from './compounds/Title';
import { DEFAULT_ALIGNMENT, STACK_ALIGNMENTS } from './constants';
import type { PlaceholderAlignment } from './types';

import styles from './styles.module.scss';

export type PlaceholderProps = DataTestId &
  Spacings & {
    aligment?: PlaceholderAlignment;
    children: ReactNode;
  };

const Placeholder = ({
  aligment = DEFAULT_ALIGNMENT,
  children,
  'data-testid': testId = 'placeholder',
  ...spacings
}: PlaceholderProps) => {
  return (
    <Stack
      alignItems={STACK_ALIGNMENTS[aligment]}
      className={styles.Placeholder}
      data-testid={testId}
      direction="column"
      {...spacings}
    >
      {children}
    </Stack>
  );
};

Placeholder.Actions = Actions;
Placeholder.Description = Description;
Placeholder.Illustration = Illustration;
Placeholder.Title = Title;

export default Placeholder;
