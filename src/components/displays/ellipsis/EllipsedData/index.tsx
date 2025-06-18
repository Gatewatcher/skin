import { isFunction } from '@gatewatcher/bistoury/utils-lang';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { DataTestId, TestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactElement, ReactNode } from 'react';
import { Fragment } from 'react';

import type { ModalProps } from '@/skin/displays';
import { Modal } from '@/skin/displays';
import type { StackProps } from '@/skin/layout';
import { Stack } from '@/skin/layout';

import {
  DEFAULT_COUNT_POSITION,
  DEFAULT_DIRECTION,
  DEFAULT_LIMIT,
  DEFAULT_MODAL_PROPS,
} from '../EllipsisDataBase/constants';
import type {
  EllipsedDataCountPosition,
  EllipsedDataDirection,
} from '../EllipsisDataBase/types';
import { sliceData } from '../EllipsisDataBase/utils';

import styles from './styles.module.scss';

export type EllipsedDataProps<T> = DataTestId & {
  children: (item: T, index: number) => ReactNode;
  containerProps?: Omit<StackProps, 'direction'>;
  countPosition?: EllipsedDataCountPosition;
  data: T[];
  direction?: EllipsedDataDirection;
  ellipsis?: (data: {
    children: ReactElement;
    content: ReactNode;
    count: number;
    data: T[];
    restData: T[];
    testId: TestId;
  }) => ReactNode;
  ellipsisChildren?: (item: T, index: number) => ReactNode;
  ellipsisDirection?: EllipsedDataDirection;
  ellipsisTitle?: ReactNode;
  limit?: number;
  modalProps?: Pick<ModalProps, 'onClose' | 'onOpen' | 'size'>;
  moreText?: ReactElement | ((count: number) => ReactElement);
};

function EllipsedData<T>({
  children,
  containerProps,
  countPosition = DEFAULT_COUNT_POSITION,
  data,
  'data-testid': testId = 'ellipsed-data',
  direction = DEFAULT_DIRECTION,
  ellipsis,
  ellipsisChildren = children,
  ellipsisDirection = direction,
  ellipsisTitle,
  limit = DEFAULT_LIMIT,
  modalProps: modalPropsProp,
  moreText = count => <>{`+${count}`}</>,
}: EllipsedDataProps<T>) {
  const modalProps = {
    DEFAULT_MODAL_PROPS,
    ...modalPropsProp,
  };

  const { hasRest, restCount, results, rest } = sliceData(data, { limit });
  const lastResult = results.at(-1);
  const moreTextElement = isFunction(moreText) ? moreText(restCount) : moreText;
  const content = (
    <Stack direction={ellipsisDirection} wrap="wrap" {...containerProps}>
      {data?.map(ellipsisChildren)}
    </Stack>
  );

  const ellipsisElement = ellipsis ? (
    ellipsis({
      children: moreTextElement,
      content,
      count: restCount,
      data,
      restData: rest,
      testId: suffixTestId(testId, 'ellipsis'),
    })
  ) : (
    <Modal
      content={
        <>
          {!!ellipsisTitle && (
            <Modal.Header>
              <Modal.Title>{ellipsisTitle}</Modal.Title>
              <Modal.Close />
            </Modal.Header>
          )}
          <Modal.Body>{content}</Modal.Body>
        </>
      }
      data-testid={suffixTestId(testId, 'ellipsis')}
      triggerClassName={styles.trigger}
      {...modalProps}
    >
      {moreTextElement}
    </Modal>
  );

  return (
    <Stack data-testid={testId} direction={direction} {...containerProps}>
      <>
        {results
          ?.slice(0, hasRest ? -1 : undefined)
          ?.map((item, index) => children(item, index))}
        {hasRest && (
          <>
            {countPosition === 'inline' ? (
              <Stack alignItems="center" className={styles.fit} gap={4}>
                {lastResult && children(lastResult, results.length - 1)}
                {ellipsisElement}
              </Stack>
            ) : (
              <Fragment>
                {lastResult && children(lastResult, results.length - 1)}
                {ellipsisElement}
              </Fragment>
            )}
          </>
        )}
      </>
    </Stack>
  );
}

export default EllipsedData;
