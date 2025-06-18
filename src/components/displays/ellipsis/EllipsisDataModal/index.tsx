import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { ReactNode } from 'react';
import { memo } from 'react';

import { Stack } from '@/skin/layout';

import type { ModalProps } from '../../floating/Modal';
import Modal from '../../floating/Modal';
import type { Children, EllipsisDataBaseProps } from '../EllipsisDataBase';
import EllipsisDataBase from '../EllipsisDataBase';
import BadgeCount from '../EllipsisDataBase/compounds/BadgeCount';

import styles from '../EllipsisDataBase/styles.module.scss';

export type EllipsisDataModalProps<T> = EllipsisDataBaseProps<T> & {
  modal?: {
    title?: ReactNode;
    props?: Pick<ModalProps, 'size' | 'duration' | 'onClose' | 'withBackdrop'>;
  };
};

const EllipsisDataModal = <T,>({
  modal,
  'data-testid': testId = 'ellipsis-data-modal',
  ...props
}: EllipsisDataModalProps<T>) => {
  const { children, data, triggerClassName } = props;

  return (
    <EllipsisDataBase
      {...props}
      floating={{
        content: ({ ellipsis }) => (
          <Modal.Body>
            <Stack direction={ellipsis.direction} {...ellipsis.containerProps}>
              {data.map(ellipsis.children || (children as Children<T>))}
            </Stack>
          </Modal.Body>
        ),
        wrapper: ({ children, content }) => (
          <Modal
            content={
              <>
                <Modal.Header>
                  {modal?.title && <Modal.Title>{modal.title}</Modal.Title>}
                  <Modal.Close />
                </Modal.Header>
                {content}
              </>
            }
            data-testid={testId}
            triggerClassName={classNames(styles.trigger, triggerClassName)}
            {...modal?.props}
          >
            {children}
          </Modal>
        ),
      }}
      data-testid={testId}
    />
  );
};

EllipsisDataModal.BadgeCount = memo(BadgeCount);

export default EllipsisDataModal;
