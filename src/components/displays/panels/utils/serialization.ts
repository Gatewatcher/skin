import type { PanelData, PanelGroupPersistence } from '../types';

type SerializedPanelGroupState = { [panelIds: string]: number[] };

// Note that Panel ids might be user-provided (stable) or useId generated (non-deterministic)
// so they should not be used as part of the serialization key.
// Using an attribute like minSize instead should work well enough.
// Pre-sorting by minSize allows remembering layouts even if panels are re-ordered/dragged.
function getSerializationKey(panels: PanelData[]): string {
  return panels
    .map(panel => {
      const { minSize, order } = panel;
      return order ? `${order}:${minSize}` : `${minSize}`;
    })
    .sort((a, b) => a.localeCompare(b))
    .join(',');
}

function loadSerializedPanelGroupState(
  autoSaveId: string,
  Persistence: PanelGroupPersistence,
): SerializedPanelGroupState | null {
  try {
    const serialized = Persistence.getItem(`PanelGroup:sizes:${autoSaveId}`);
    if (serialized) {
      const parsed = JSON.parse(serialized);
      if (typeof parsed === 'object' && parsed != null) {
        return parsed;
      }
    }
  } catch (error) {
    console.log(error);
  }

  return null;
}

export function loadPanelLayout(
  autoSaveId: string,
  panels: PanelData[],
  Persistence: PanelGroupPersistence,
): number[] | null {
  const state = loadSerializedPanelGroupState(autoSaveId, Persistence);
  if (state) {
    const key = getSerializationKey(panels || []);
    return state[key] ?? null;
  }

  return null;
}

export function savePanelGroupLayout(
  autoSaveId: string,
  panels: PanelData[],
  sizes: number[],
  Persistence: PanelGroupPersistence,
): void {
  const key = getSerializationKey(panels || []);
  const state = loadSerializedPanelGroupState(autoSaveId, Persistence) || {};
  state[key] = sizes;

  try {
    Persistence.setItem(
      `PanelGroup:sizes:${autoSaveId}`,
      JSON.stringify(state),
    );
  } catch (error) {
    console.error(error);
  }
}
