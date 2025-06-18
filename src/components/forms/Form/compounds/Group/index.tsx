import type { ReactNode } from 'react';
import { useContext, useMemo } from 'react';

import type { InternalNamePath, NamePath, StoreValue } from '../../interface';
import { getNamePath } from '../../utils/valueUtil';
import type { ShouldUpdate } from '../Field';
import Field from '../Field';
import FieldContext from '../Field/FieldContext';
import GroupContext from './GroupContext';

export type GroupProps = {
  name: NamePath;
  children?: ReactNode;
};

const Group = ({ name, children }: GroupProps) => {
  const context = useContext(FieldContext);

  const prefixName: InternalNamePath = useMemo(() => {
    const parentPrefixName = getNamePath(context.prefixName as NamePath) || [];
    return [...parentPrefixName, ...getNamePath(name)];
  }, [context.prefixName, name]);

  const fieldContext = useMemo(
    () => ({ ...context, prefixName }),
    [context, prefixName],
  );

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
    <GroupContext.Provider value={{ isGroupField: true }}>
      <FieldContext.Provider value={fieldContext}>
        <Field name={[]} shouldUpdate={shouldUpdate}>
          {() => children}
        </Field>
      </FieldContext.Provider>
    </GroupContext.Provider>
  );
};

export default Group;
