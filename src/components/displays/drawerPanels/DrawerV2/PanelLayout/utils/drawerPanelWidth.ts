import { get, set } from '@gatewatcher/bistoury/utils-web-storage';

const PANEL_WIDTH_KEY = 'skin-drawer-panel-width';

export const getPersistedPanelWidth = (id: string) => {
  const width = get(`${PANEL_WIDTH_KEY}/${id}`);
  return width;
};

export const persistPanelWidth = (id: string, width: number) => {
  set(`${PANEL_WIDTH_KEY}/${id}`, width);
};
