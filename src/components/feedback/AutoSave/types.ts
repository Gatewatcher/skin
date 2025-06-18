import type { STATUSES, STATUSES_WITH_ICON } from './constants';

export type Status = typeof STATUSES[number];
export type StatusWithIcon = typeof STATUSES_WITH_ICON[number];
export type Labels = Record<Status, string>;
