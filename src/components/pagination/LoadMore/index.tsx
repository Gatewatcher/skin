import { useDidMountEffect, useWatchValue } from '@gatewatcher/bistoury/hooks';
import { isDefined } from '@gatewatcher/bistoury/utils-lang';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';
import { useEffect, useReducer, useState } from 'react';
import { animated, useTransition } from 'react-spring';

import { ANIMATION_SHARED_CONFIG } from '@/constants';
import { Stack } from '@/skin/layout';
import { useListingSortsContext } from '@/skin/listings/Listing/context';
import type {
  DataItem,
  ListingLoadMoreProps,
  SortValue,
} from '@/skin/listings/Listing/types';
import { useThemeContext } from '@/skin/navigation/Theme';
import { getColor } from '@/utils';

import InfiniteScroll from '../InfiniteScroll';
import type { PaginationProps } from '../Pagination';
import LoadMoreControls, {
  type LoadMoreControlsProps,
} from './compounds/Controls';
import Loader from './compounds/Loader';
import {
  DEFAULT_ERROR,
  DEFAULT_INITIAL_PAGE,
  DEFAULT_INITIAL_PER_PAGE,
  DEFAULT_IS_ERROR,
  DEFAULT_IS_LOADING,
  DEFAULT_LOAD_MORE_TYPE,
  DEFAULT_PAGE_RESET_TRIGGER,
  DEFAULT_TOTAL_ITEMS_COUNT,
  DEFAULT_WITH_CONTROLS,
} from './constants';
import type { LoadMoreContextType } from './context';
import { LoadMoreContext } from './context';
import type { Action, LoadMoreParams, State } from './types';
import { Actions } from './types';
import { calcOffset } from './utils';

import styles from './styles.module.scss';

export type LoadMoreInternalProps = {
  children: ReactNode;
  type?: ListingLoadMoreProps['loadMoreType'];
};

export type LoadMoreProps<T> = DataTestId & {
  controlsBottom?: (options: LoadMoreControlsProps) => ReactNode;
  controlsTop?: (options: LoadMoreControlsProps) => ReactNode;
  data?: T[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  encode?: (params: LoadMoreParams<any>) => void;
  error?: string | string[] | null;
  hasNextPage?: boolean;
  initialPage?: number;
  initialPerPage?: number;
  initialSort?: SortValue[];
  isError?: boolean;
  isLoading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onParamsChange?: (params: LoadMoreParams<any>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onReady?: (params: LoadMoreParams<any>) => void;
  options?: ListingLoadMoreProps['loadMoreOptions'];
  pageResetTrigger?: string[];
  totalItemsCount?: number;
  withControls?: boolean;
  withRange?: PaginationProps['withRange'];
};

const LoadMore = <T extends DataItem>({
  children,
  controlsBottom = (options: LoadMoreControlsProps) => (
    <LoadMoreControls {...options} />
  ),
  controlsTop,
  data,
  'data-testid': testId = 'load-more',
  encode,
  error = DEFAULT_ERROR,
  hasNextPage,
  initialPage = DEFAULT_INITIAL_PAGE,
  initialPerPage = DEFAULT_INITIAL_PER_PAGE,
  initialSort: initialSortProps,
  isError = DEFAULT_IS_ERROR,
  isLoading,
  options,
  onParamsChange,
  onReady,
  pageResetTrigger = DEFAULT_PAGE_RESET_TRIGGER,
  totalItemsCount: totalItemsCountProps = DEFAULT_TOTAL_ITEMS_COUNT,
  type = DEFAULT_LOAD_MORE_TYPE,
  withControls = DEFAULT_WITH_CONTROLS,
  withRange,
}: LoadMoreProps<T> & LoadMoreInternalProps) => {
  const isPaginated = !!initialPerPage;
  const isStaticListing = !!totalItemsCountProps || !isDefined(isLoading);

  const [totalPages, setTotalPages] = useState(0);
  const [firstLoadingDone, setFirstLoadingDone] = useState(isStaticListing);
  const [isReady, setIsReady] = useState(!onReady);
  const [totalItemsCount, setTotalItemsCount] = useState(totalItemsCountProps);
  const [previousData, setPreviousData] = useState(data);

  const { currentSorts } = useListingSortsContext();
  const { theme } = useThemeContext();

  const initialState: State = {
    page: initialPage || DEFAULT_INITIAL_PAGE,
    perPage: initialPerPage || DEFAULT_INITIAL_PER_PAGE,
    sort: initialSortProps ? [initialSortProps].flat() : [],
  };

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case Actions.SET_PAGE:
        const { page } = action.payload;
        return { ...state, page };
      case Actions.SET_PER_PAGE:
        const { perPage } = action.payload;
        return { ...state, page: 1, perPage };
      case Actions.SORT:
        return { perPage: state.perPage, page: 1, sort: action.payload.sort };
      case Actions.RESET_PAGE:
        return { ...state, page: 1 };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue: LoadMoreContextType<T> = {
    data,
    error,
    isError,
    isLoading: isLoading ?? DEFAULT_IS_LOADING,
    firstLoadingDone,
    page: state.page,
    previousData,
    totalItemsCount,
    totalPages,
    type,
  };

  useEffect(() => {
    onReady?.(buildLoadMoreParams());
    setIsReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInfiniteScroll = () => {
    dispatch({ type: Actions.SET_PAGE, payload: { page: state.page + 1 } });
  };

  const buildLoadMoreParams = (): LoadMoreParams => {
    return {
      offset: calcOffset({ page: state.page, perPage: state.perPage }),
      type,
      ...state,
    };
  };

  const handlePaginate = () => {
    const params = buildLoadMoreParams();
    onParamsChange?.(params);
    encode?.(params);
  };

  // watch current sort
  useDidMountEffect(() => {
    dispatch({ type: Actions.SORT, payload: { sort: currentSorts } });
  }, [currentSorts]);

  useDidMountEffect(() => {
    handlePaginate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // update total pages
  useEffect(() => {
    setTotalPages(isPaginated ? Math.ceil(totalItemsCount / state.perPage) : 1);
  }, [totalItemsCount, state.perPage, isPaginated]);

  useWatchValue(totalItemsCountProps, ({ current, previous }) => {
    setTotalItemsCount(current || previous);
  });

  useEffect(() => {
    isDefined(data) && setPreviousData(data);
    data && setFirstLoadingDone(true);
  }, [data]);

  useEffect(() => {
    isError && setFirstLoadingDone(true);
  }, [isError]);

  useDidMountEffect(() => {
    dispatch({ type: Actions.RESET_PAGE });
  }, pageResetTrigger);

  const checkPaginationEnabled = () => {
    if (isLoading && firstLoadingDone) {
      return true;
    }

    if (!data?.length) {
      return false;
    }

    return (
      isPaginated &&
      !!totalItemsCount &&
      state.page <= totalPages &&
      !isError &&
      !!data?.length
    );
  };

  const paginationEnabled = checkPaginationEnabled();

  const showGoToPage =
    paginationEnabled && type == 'pagination' && totalPages > 1;

  const showPagination =
    paginationEnabled &&
    type === 'pagination' &&
    !!state.perPage &&
    totalPages > 1;

  const showItemsPerPage = paginationEnabled && type === 'pagination';

  const transition = useTransition(isLoading && firstLoadingDone, {
    from: {
      backgroundColor:
        theme === 'dark'
          ? getColor('neutral', { alpha: 0 })
          : getColor('white', { alpha: 4 }),
    },
    enter: {
      backgroundColor:
        theme === 'dark'
          ? getColor('neutral', { alpha: 70, variant: 900 })
          : getColor('white', { alpha: 70 }),
    },
    ...ANIMATION_SHARED_CONFIG,
    duration: 100,
  });

  const buildControls = (
    position: 'top' | 'bottom',
  ): LoadMoreControlsProps => ({
    'data-testid': suffixTestId(testId, `controls-${position}`),
    onPageChange: page =>
      dispatch({ type: Actions.SET_PAGE, payload: { page } }),
    onPerPageChange: perPage =>
      dispatch({ type: Actions.SET_PER_PAGE, payload: { perPage } }),
    page: state.page,
    perPage: state.perPage,
    totalItemsCount,
    totalPages,
    type,
    showGoToPage,
    showItemsPerPage,
    showPagination,
    withRange,
  });

  const controlsTopNode =
    withControls && controlsTop ? controlsTop(buildControls('top')) : null;

  const controlsBottomNode =
    withControls && controlsBottom
      ? controlsBottom(buildControls('bottom'))
      : null;

  if (!isReady) return null;

  return (
    <LoadMoreContext.Provider value={contextValue}>
      {isPaginated ? (
        <>
          {type === 'pagination' && (
            <Stack
              data-testid="load-more"
              direction="column"
              flexGrow={1}
              gap={8}
            >
              {controlsTopNode}
              <div className={styles.Listing}>
                {transition(
                  (transitionStyles, item) =>
                    item && (
                      <animated.div
                        className={styles.ListingLoader}
                        style={transitionStyles}
                      >
                        <Loader />
                      </animated.div>
                    ),
                )}
                {children}
              </div>
              {controlsBottomNode}
            </Stack>
          )}
          {type === 'infiniteScroll' && (
            <>
              {firstLoadingDone ? (
                <InfiniteScroll
                  {...options}
                  hasNextPage={hasNextPage ?? state.page < totalPages}
                  isLoading={isLoading}
                  onLoadMore={handleInfiniteScroll}
                >
                  {children}
                </InfiniteScroll>
              ) : (
                children
              )}
            </>
          )}
        </>
      ) : (
        children
      )}
    </LoadMoreContext.Provider>
  );
};

export default LoadMore;
