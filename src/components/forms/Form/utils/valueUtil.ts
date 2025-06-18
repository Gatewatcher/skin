import { isFunction, isString } from '@gatewatcher/bistoury/utils-lang';

import type {
  EventArgs,
  InternalNamePath,
  NamePath,
  Store,
  StoreValue,
} from '../interface';
import cloneDeep from '../utils/cloneDeep';
import get from './get';
import set from './set';
import { toArray } from './typeUtil';

/**
 * Convert name to internal supported format.
 *
 * This function should keep since we're still thinking if we need support like `a.b.c` format.
 * 'a' => ['a']
 * 123 => [123]
 * ['a', 123] => ['a', 123]
 */
export const getNamePath = (path: NamePath | null): InternalNamePath => {
  return toArray(path);
};

export const getValue = (store: Store, namePath: InternalNamePath) => {
  return get(store, namePath);
};

export const setValue = (
  store: Store,
  namePath: InternalNamePath,
  value: StoreValue,
  removeIfUndefined = false,
): Store => {
  return set(store, namePath, value, removeIfUndefined);
};

export const cloneByNamePathList = (
  store: Store,
  namePathList: InternalNamePath[],
): Store => {
  let newStore = {};
  namePathList.forEach(namePath => {
    const value = getValue(store, namePath);
    newStore = setValue(newStore, namePath, value);
  });

  return newStore;
};

export const containsNamePath = (
  namePathList: InternalNamePath[],
  namePath: InternalNamePath,
) => {
  return (
    namePathList && namePathList.some(path => matchNamePath(path, namePath))
  );
};

const isObject = (obj: StoreValue): obj is Object => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
};

/**
 * Copy values into store and return a new values object
 * `({ a: 1, b: { c: 2 } }, { a: 4, b: { d: 5 } }) => { a: 4, b: { c: 2, d: 5 } }`
 */
const internalSetValues = <T>(store: T, values: T): T => {
  const newStore: T = (Array.isArray(store) ? [...store] : { ...store }) as T;

  if (!values) {
    return newStore;
  }

  Object.keys(values).forEach(key => {
    const prevValue = newStore[key as keyof typeof newStore];
    const value = values[key as keyof typeof newStore];

    // If both are object (but target is not array), we use recursion to set deep value
    const recursive = isObject(prevValue) && isObject(value);

    newStore[key as keyof typeof newStore] = recursive
      ? internalSetValues(prevValue, value)
      : cloneDeep(value); // Clone deep for arrays
  });

  return newStore;
};

export const setValues = <T>(store: T, ...restValues: T[]): T => {
  return restValues.reduce(
    (current: T, newStore: T): T => internalSetValues<T>(current, newStore),
    store,
  );
};

export const matchNamePath = (
  namePath: InternalNamePath,
  changedNamePath: InternalNamePath | null,
) => {
  if (
    !namePath ||
    !changedNamePath ||
    namePath.length !== changedNamePath.length
  ) {
    return false;
  }
  return namePath.every((nameUnit, i) => changedNamePath[i] === nameUnit);
};

// Like `shallowEqual`, but we don't check the data that may cause re-render.
export const isSimilar = (source: unknown, target: unknown) => {
  if (source === target) {
    return true;
  }

  if ((!source && target) || (source && !target)) {
    return false;
  }

  if (
    !source ||
    !target ||
    typeof source !== 'object' ||
    typeof target !== 'object'
  ) {
    return false;
  }

  const sourceKeys = Object.keys(source);
  const targetKeys = Object.keys(target);
  const keys = new Set([...sourceKeys, ...targetKeys]);

  return [...keys].every(key => {
    const sourceValue = source[key as keyof typeof source];
    const targetValue = target[key as keyof typeof target];

    if (isFunction(sourceValue) && isFunction(targetValue)) {
      return true;
    }
    return sourceValue === targetValue;
  });
};

export const defaultGetValueFromEvent = (
  valuePropName: string,
  ...args: EventArgs
) => {
  const event = args[0];
  if (
    event &&
    event.target &&
    typeof event.target === 'object' &&
    valuePropName in event.target
  ) {
    return (event.target as HTMLInputElement)[
      valuePropName as keyof HTMLInputElement
    ];
  }

  return event;
};

/**
 * Moves an array item from one position in an array to another.
 *
 * Note: This is a pure function, so a new array will be returned, instead of altering the array argument.
 *
 * @param array         Array in which to move an item.         (required)
 * @param moveIndex     The index of the item to move.          (required)
 * @param toIndex       The index to move item at moveIndex to. (required)
 */
export const move = <T>(array: T[], moveIndex: number, toIndex: number) => {
  const { length } = array;
  if (
    moveIndex < 0 ||
    moveIndex >= length ||
    toIndex < 0 ||
    toIndex >= length
  ) {
    return array;
  }
  const item = array[moveIndex];
  const diff = moveIndex - toIndex;

  if (diff > 0) {
    // move left
    return [
      ...array.slice(0, toIndex),
      item,
      ...array.slice(toIndex, moveIndex),
      ...array.slice(moveIndex + 1, length),
    ];
  }
  if (diff < 0) {
    // move right
    return [
      ...array.slice(0, moveIndex),
      ...array.slice(moveIndex + 1, toIndex + 1),
      item,
      ...array.slice(toIndex + 1, length),
    ];
  }
  return array;
};

export const trimValue = <T>(value: T): T => {
  if (isString(value)) {
    return value.trim() as T;
  }

  if (Array.isArray(value)) {
    return value.map((value: unknown): unknown => {
      return trimValue(value);
    }) as T;
  }

  if (isObject(value)) {
    const entries = Object.entries(value);

    const trimmedEntries = entries.map(([key, value]): [string, unknown] => {
      return [key, trimValue(value)];
    });

    return Object.fromEntries(trimmedEntries) as T;
  }

  return value;
};
