import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { withStopPropagation } from '@/hocs';
import type { CardProps } from '@/skin/displays';
import { Card } from '@/skin/displays';

import styles from '../styles.module.scss';

export type FileCardProps = DataTestId &
  CardProps & {
    title?: ReactNode;
    status?: ReactNode;
    footer?: ReactNode;
  };

const FileCard = ({
  children,
  footer,
  status,
  title,
  'data-testid': testId = 'file-card',
  ...cardProps
}: FileCardProps) => {
  return withStopPropagation(
    <div>
      <Card
        {...cardProps}
        className={classNames(styles.CardWrapper)}
        data-testid={testId}
      >
        <Card.Header>
          <div className={classNames(styles.TitleWrapper)}>
            <Card.Title>{title}</Card.Title>
          </div>
          {status && <Card.Button>{status}</Card.Button>}
        </Card.Header>
        <Card.Body>{children}</Card.Body>
        {footer}
      </Card>
    </div>,
  );
};

export default FileCard;
