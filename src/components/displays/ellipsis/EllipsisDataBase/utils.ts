export type SliceDataOptions = {
  limit: number;
};

export type SliceDataReturn<T> = {
  hasRest: boolean;
  rest: T[];
  restCount: number;
  results: T[];
};

export function sliceData<T = unknown>(
  data: T[],
  { limit }: SliceDataOptions,
): SliceDataReturn<T> {
  return limit > 0 && Array.isArray(data) && limit <= data.length
    ? {
        hasRest: data.length > limit,
        rest: data.slice(limit),
        restCount: data.length - limit,
        results: data.slice(0, limit),
      }
    : { hasRest: false, rest: [], restCount: 0, results: data };
}
