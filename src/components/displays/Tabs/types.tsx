import type { TITLE_LIST_VARIANTS } from './constants';

export type TabId = number;

export type TabIdProps = {
  id?: TabId;
};

export type TitleListVariant = typeof TITLE_LIST_VARIANTS[number];
