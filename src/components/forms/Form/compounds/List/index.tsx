import { isFunction } from '@gatewatcher/bistoury/utils-lang';
import { consoleWarn } from '@gatewatcher/bistoury/utils-log';
import type { Key, ReactElement, ReactNode } from 'react';
import { useContext, useMemo, useRef } from 'react';

import type {
  InternalNamePath,
  Meta,
  NamePath,
  StoreValue,
  ValidatorRule,
} from '../../interface';
import { getNamePath, move } from '../../utils/valueUtil';
import type { ShouldUpdate } from '../Field';
import Field from '../Field';
import FieldContext from '../Field/FieldContext';
import type { ListContextProps } from './ListContext';
import ListContext from './ListContext';

export interface ListField {
  name: number;
  key: Key;
  isListField: boolean;
}

export interface ListOperations {
  add: (defaultValue?: StoreValue, index?: number) => void;
  remove: (index: number | number[]) => void;
  move: (from: number, to: number) => void;
}

export type ListProps = {
  name: NamePath;
  rules?: ValidatorRule[];
  validateTrigger?: string | string[] | false;
  initialValue?: unknown[];
  children?: (
    fields: ListField[],
    operations: ListOperations,
    meta: Meta,
  ) => ReactElement | ReactNode;
};

const List = ({
  name,
  initialValue,
  children,
  rules,
  validateTrigger,
}: ListProps) => {
  const context = useContext(FieldContext);
  const keyRef = useRef<{ keys: number[]; id: number }>({
    keys: [],
    id: 0,
  });
  const keyManager = keyRef.current;

  const prefixName: InternalNamePath = useMemo(() => {
    const parentPrefixName = getNamePath(context.prefixName as NamePath) || [];
    return [...parentPrefixName, ...getNamePath(name)];
  }, [context.prefixName, name]);

  const fieldContext = useMemo(
    () => ({ ...context, prefixName }),
    [context, prefixName],
  );

  // List context
  const listContext = useMemo<ListContextProps>(
    () => ({
      getKey: (namePath: InternalNamePath) => {
        const len = prefixName.length;
        const pathName = namePath[len];
        return [keyManager.keys[pathName as number], namePath.slice(len + 1)];
      },
    }),
    [prefixName, keyManager.keys],
  );

  // User should not pass `children` as other type.
  if (!isFunction(children)) {
    consoleWarn('Form.List only accepts function as children.');
    return null;
  }

  const shouldUpdate: ShouldUpdate<unknown> = (
    prevValue: StoreValue,
    nextValue: StoreValue,
    { source },
  ) => {
    if (source === 'internal') {
      return false;
    }
    return prevValue !== nextValue;
  };

  return (
    <ListContext.Provider value={listContext}>
      <FieldContext.Provider value={fieldContext}>
        <Field
          initialValue={initialValue}
          name={[]}
          rules={rules}
          shouldUpdate={shouldUpdate}
          validateTrigger={validateTrigger}
          isList
        >
          {({ value = [], onChange }, meta) => {
            const { getFieldValue } = context;
            const getNewValue = () => {
              const values = getFieldValue(prefixName || []) as StoreValue[];
              return values || [];
            };
            // Always get latest value in case user update fields by `form` api.
            const operations: ListOperations = {
              add: (defaultValue, index = 0) => {
                // Mapping keys
                const newValue = getNewValue();

                if (index >= 0 && index <= newValue.length) {
                  keyManager.keys = [
                    ...keyManager.keys.slice(0, index),
                    keyManager.id,
                    ...keyManager.keys.slice(index),
                  ];
                  onChange([
                    ...newValue.slice(0, index),
                    defaultValue,
                    ...newValue.slice(index),
                  ]);
                } else {
                  if (index < 0 || index > newValue.length) {
                    consoleWarn(
                      'The second parameter of the add function should be a valid positive number.',
                    );
                  }
                  keyManager.keys = [...keyManager.keys, keyManager.id];
                  onChange([...newValue, defaultValue]);
                }
                keyManager.id += 1;
              },
              remove: (index: number | number[]) => {
                const newValue = getNewValue();
                const indexSet = new Set(
                  Array.isArray(index) ? index : [index],
                );

                if (indexSet.size <= 0) {
                  return;
                }
                keyManager.keys = keyManager.keys.filter(
                  (_, keysIndex) => !indexSet.has(keysIndex),
                );

                // Trigger store change
                onChange(
                  newValue.filter((_, valueIndex) => !indexSet.has(valueIndex)),
                );
              },
              move(from: number, to: number) {
                if (from === to) {
                  return;
                }
                const newValue = getNewValue();

                // Do not handle out of range
                if (
                  from < 0 ||
                  from >= newValue.length ||
                  to < 0 ||
                  to >= newValue.length
                ) {
                  return;
                }

                keyManager.keys = move(keyManager.keys, from, to);

                // Trigger store change
                onChange(move(newValue, from, to));
              },
            };

            let listValue = value || [];
            if (!Array.isArray(listValue)) {
              listValue = [];
              consoleWarn(
                `Current value of '${prefixName.join(
                  ' > ',
                )}' is not an array type.`,
              );
            }

            return children(
              (listValue as StoreValue[]).map((__, index): ListField => {
                let key = keyManager.keys[index];
                if (key === undefined) {
                  keyManager.keys[index] = keyManager.id;
                  key = keyManager.keys[index];
                  keyManager.id += 1;
                }

                return {
                  name: index,
                  key,
                  isListField: true,
                };
              }),
              operations,
              meta,
            );
          }}
        </Field>
      </FieldContext.Provider>
    </ListContext.Provider>
  );
};

export default List;
