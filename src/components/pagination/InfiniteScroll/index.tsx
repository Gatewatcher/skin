import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactElement, ReactNode, Ref } from 'react';
import { cloneElement } from 'react';

import type { UseInfiniteScroll } from '@/hooks';
import { useInfiniteScroll } from '@/hooks';

import Loader from '../LoadMore/compounds/Loader';

import styles from './styles.module.scss';

export type InfiniteScrollProps = UseInfiniteScroll &
  DataTestId & {
    children: ReactNode;
    loader?: ReactElement;
  };

const InfiniteScroll = ({
  children,
  'data-testid': testId = 'infinite-scroll',
  loader,
  ...infiniteScrollOptions
}: InfiniteScrollProps) => {
  const [ref] = useInfiniteScroll(infiniteScrollOptions);

  const { isLoading, hasNextPage } = infiniteScrollOptions;

  return (
    <>
      {children}

      {(isLoading || hasNextPage) && (
        <>
          {loader ? (
            cloneElement(loader, { ref })
          ) : (
            <div ref={ref as Ref<HTMLDivElement>} data-testid={testId}>
              <Loader className={styles.Loader} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default InfiniteScroll;
