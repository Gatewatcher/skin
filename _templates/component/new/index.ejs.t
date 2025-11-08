---
to: <%= componentPath %><%= componentName %>/index.tsx
---
import { DataTestId } from '@gatewatcher/bistoury/utils-types';

import styles from './styles.module.scss';

export type <%= componentName %>Props = DataTestId & {
  // Add prop types...
}

const <%= componentName %> = ({}: <%= componentName %>Props) => {
  return (
    <div className={styles.<%= componentName %>} />
  );
}

export default <%= componentName %>;
