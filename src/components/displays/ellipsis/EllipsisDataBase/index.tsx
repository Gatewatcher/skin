import { isFunction } from '@gatewatcher/bistoury/utils-lang';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { DataTestId, TestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactElement, ReactNode } from 'react';

import type { StackProps } from '@/skin/layout';
import { Stack } from '@/skin/layout';

import {
  DEFAULT_COUNT_POSITION,
  DEFAULT_DIRECTION,
  DEFAULT_LIMIT,
} from './constants';
import type { EllipsedDataCountPosition, EllipsedDataDirection } from './types';
import { sliceData } from './utils';

type EllipsisRender<T> = (data: {
  count: number;
  data: T[];
  moreText: ReactElement;
  restData: T[];
  testId: TestId;
}) => ReactNode;

export type Children<T> = (item: T, index: number, array: T[]) => ReactNode;

type EllipsisProps<T> = {
  children?: Children<T>;
  containerProps?: Omit<StackProps, 'direction'>;
  direction?: EllipsedDataDirection;
};

type Ellipsis<T> = EllipsisProps<T> | EllipsisRender<T>;

export type EllipsisDataBaseProps<T> = DataTestId & {
  children: Children<T> | ReactNode;
  containerProps?: Omit<StackProps, 'direction'>;
  countPosition?: EllipsedDataCountPosition;
  data: T[];
  direction?: EllipsedDataDirection;
  ellipsis?: Ellipsis<T>;
  limit?: number;
  moreText?: ReactElement | ((count: number) => ReactElement);
  triggerClassName?: string;
};

export type EllipsisDataBaseInternalProps<T> = {
  floating: {
    content: (data: {
      slicedData: ReturnType<typeof sliceData<T>>;
      ellipsis: EllipsisProps<T>;
    }) => ReactNode;
    wrapper?: (data: {
      children: ReactElement;
      content: ReactNode;
    }) => ReactNode;
  };
};

const EllipsisDataBase = <T,>({
  children,
  containerProps = { gap: 4 },
  countPosition = DEFAULT_COUNT_POSITION,
  data,
  direction = DEFAULT_DIRECTION,
  'data-testid': testId = 'ellipsis-data-popover',
  ellipsis,
  floating,
  limit = DEFAULT_LIMIT,
  moreText = count => <>{`+${count}`}</>,
}: EllipsisDataBaseProps<T> & EllipsisDataBaseInternalProps<T>) => {
  const slicedData = sliceData(data, { limit });
  const { hasRest, rest, restCount, results } = slicedData;
  const lastResult = results.at(-1);
  const moreTextElement = isFunction(moreText) ? moreText(restCount) : moreText;

  const floatingContent = isFunction(ellipsis)
    ? ellipsis({
        count: restCount,
        data,
        moreText: moreTextElement,
        restData: rest,
        testId: suffixTestId(testId, 'ellipsis'),
      })
    : floating.content({
        slicedData,
        ellipsis: {
          children:
            ellipsis?.children ||
            (isFunction(children) ? children : () => <></>),
          containerProps: ellipsis?.containerProps || containerProps,
          direction: ellipsis?.direction || direction,
        },
      });

  const floatingElement = floating.wrapper?.({
    children: moreTextElement,
    content: floatingContent,
  });

  const content = (
    <>
      {isFunction(children) &&
        lastResult &&
        children(lastResult, results.length - 1, results)}
      {floatingElement}
    </>
  );

  return (
    <Stack data-testid={testId} direction={direction} {...containerProps}>
      <>
        {isFunction(children)
          ? results
              ?.slice(0, hasRest ? -1 : undefined)
              ?.map((item, index) => children(item, index, results))
          : children}

        {hasRest && (
          <>
            {countPosition === 'inline' ? (
              <Stack alignItems="center" gap={4}>
                {content}
              </Stack>
            ) : (
              content
            )}
          </>
        )}
      </>
    </Stack>
  );
};

export default EllipsisDataBase;
