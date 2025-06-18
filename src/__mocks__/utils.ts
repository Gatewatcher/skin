import { range } from '@gatewatcher/bistoury/utils-lang';
import type { StrictRequest } from 'msw';
import { HttpResponse, delay as addDelay, http } from 'msw';

import type { PaginatedApiResponse } from '@/mocks/types';
import { convertOrderingToSortValue, sortData } from '@/skin/listings';

import type { ApiError } from './types';

type ApiMockOptions<T> = {
  dataFactory: (id: number) => T;
  delay?: number;
  errorFactory?: () => ApiError | object;
  maxItems?: number;
  searchFilter?: (item: T, term: string) => boolean;
};

type PageParams = {
  page: number;
  perPage: number;
  sort: string | null;
};

export const defaultErrorGenerator = (): ApiError => ({
  detail: 'Unexpected error [msw mock]',
  statusCode: 404,
});

export const defaultSearchFilter = () => true;

export const generateApiMocks = <T>(
  endpoint: string,
  {
    dataFactory,
    delay = 2000,
    errorFactory = defaultErrorGenerator,
    searchFilter = defaultSearchFilter,
    maxItems = 100,
  }: ApiMockOptions<T>,
) => {
  const getPageOptions = (request: StrictRequest<never>): PageParams => {
    const params = new URL(request.url).searchParams;

    return {
      page: Number(params.get('page') || 1),
      perPage: Number(params.get('page_size') || 10),
      sort: params.get('sort'),
    };
  };

  const generateData = <T>(factory?: (id: number) => T) => {
    return factory ? range({ stop: maxItems }).map(factory) : [];
  };

  const successResults = generateData(dataFactory);

  const generateSuccessResults = (
    pageOptions: PageParams,
    items?: T[],
    count: number = maxItems,
  ): PaginatedApiResponse<T> => {
    const { page, perPage, sort } = pageOptions;

    const data = items ? items.slice((page - 1) * perPage, perPage * page) : [];

    const sortedData = sort
      ? sortData(data, convertOrderingToSortValue(sort))
      : data;

    return {
      count: items ? count : 0,
      prev: page > 1 ? page - 1 : null,
      next: page < count / perPage ? page + 1 : null,
      results: sortedData,
    };
  };

  const apiEndpoint = `/${endpoint.replace(/^\//, '')}`;

  const success = http.get<never, never, PaginatedApiResponse<T>>(
    apiEndpoint,
    async ({ request }) => {
      await addDelay(delay);
      return HttpResponse.json(
        generateSuccessResults(getPageOptions(request), successResults),
      );
    },
  );

  const successEmpty = http.get<never, never, PaginatedApiResponse<T>>(
    `${apiEndpoint}-empty`,
    async ({ request }) => {
      await addDelay(delay);
      return HttpResponse.json(
        generateSuccessResults(getPageOptions(request), [], 0),
      );
    },
  );

  const update = http.put(`${apiEndpoint}-update`, async ({ request }) => {
    await addDelay(delay);
    return HttpResponse.json(await request.json());
  });

  const error = http.get(`${apiEndpoint}-error`, async () => {
    await addDelay(delay);
    return HttpResponse.json(errorFactory(), { status: 404 });
  });

  const post = http.post(`${apiEndpoint}-post`, async ({ request }) => {
    await addDelay(delay);
    return HttpResponse.json(await request.json());
  });

  const search = http.get<never, never, PaginatedApiResponse<T>>(
    `${apiEndpoint}-search`,
    async ({ request }) => {
      const params = new URL(request.url).searchParams;
      const term = params.get('term')?.toString();

      const items = term
        ? successResults.filter(item => searchFilter(item, term))
        : successResults;

      const data = generateSuccessResults(
        getPageOptions(request),
        items,
        items.length,
      );

      await addDelay(delay);
      return HttpResponse.json(data);
    },
  );

  return [success, successEmpty, update, error, search, post];
};
