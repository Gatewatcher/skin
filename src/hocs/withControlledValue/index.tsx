import type { ChangeEvent, ComponentType } from 'react';
import { useState } from 'react';

export const withControlledValue =
  <T extends { value?: string | number | readonly string[] }>(
    Component: ComponentType<T>,
    { valuePropName }: { valuePropName: 'value' | 'checked' },
  ): ComponentType<Omit<T, 'ref'>> =>
  (props: Omit<T, 'ref'>) => {
    const [value, setValue] = useState<boolean | string>(
      props.value?.toString() ?? '',
    );

    const handleChange = (
      e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    ) => {
      if (valuePropName === 'checked') {
        return setValue((e.target as HTMLInputElement)[valuePropName]);
      }
      setValue(e.target.value);
    };
    const newProps = {
      ...props,
      [valuePropName]: value,
    };
    return <Component onChange={handleChange} {...(newProps as T)} />;
  };
