import { Placeholder } from '@/skin/feedback';

import type { PlaceholderSizeProps } from '../types';
import Container from './Container';

import styles from '../styles.module.scss';

export type ListingErrorElementProps = PlaceholderSizeProps & {
  error: string | string[] | null;
};

const ListingErrorElement = ({
  error,
  placeholderSize,
}: ListingErrorElementProps) => {
  return (
    <Container className={styles.ErrorData} placeholderSize={placeholderSize}>
      <Placeholder>
        <Placeholder.Illustration name="Error" size={placeholderSize} />
        <Placeholder.Title>Unexpected error</Placeholder.Title>
        {error && <Placeholder.Description>{error}</Placeholder.Description>}
      </Placeholder>
    </Container>
  );
};

export default ListingErrorElement;
