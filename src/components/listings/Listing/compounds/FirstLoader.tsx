import {
  classNames,
  stylesToPascalCase,
} from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import { CircularLoader } from '@/skin/feedback';
import { Stack } from '@/skin/layout';

import type { PlaceholderSizeProps } from '../types';

import styles from '../styles.module.scss';

export type ListingFirstLoaderProps = DataTestId & PlaceholderSizeProps;

const ListingFirstLoader = ({
  'data-testid': testId = 'listing-loader',
  placeholderSize,
}: ListingFirstLoaderProps) => {
  return (
    <Stack
      className={classNames(
        styles.Container,
        stylesToPascalCase(styles, 'container', placeholderSize),
      )}
      alignItems="center"
      data-testid={testId}
      justifyContent="center"
    >
      <CircularLoader size="large" />
    </Stack>
  );
};

export default ListingFirstLoader;
