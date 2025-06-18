import Placeholder from '@/skin/feedback/Placeholder';

import type { PlaceholderSizeProps } from '../types';
import Container from './Container';

import styles from '../styles.module.scss';

export type ListingEmptyElementProps = PlaceholderSizeProps & {
  message?: string;
};

const ListingEmptyElement = ({
  message,
  placeholderSize,
}: ListingEmptyElementProps) => {
  return (
    <Container className={styles.EmptyData} placeholderSize={placeholderSize}>
      <Placeholder>
        <Placeholder.Illustration name="FolderEmpty" size={placeholderSize} />
        <Placeholder.Title>Empty data</Placeholder.Title>
        {message && (
          <Placeholder.Description>{message}</Placeholder.Description>
        )}
      </Placeholder>
    </Container>
  );
};

export default ListingEmptyElement;
