import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ComponentType, SVGProps } from 'react';
import { useLayoutEffect, useState } from 'react';

import { ILLUSTRATION_DEFAULT_SIZE, ILLUSTRATION_SIZES_PX } from '@/constants';
import type { IllustrationName } from '@/skin/displays';
import type { IllustrationSize } from '@/types';

const componentCache = new Map<
  string,
  ComponentType<SVGProps<SVGSVGElement>>
>();

export type IllustrationProps = DataTestId & {
  name: IllustrationName;
  size?: IllustrationSize | number;
};

const Illustration = ({
  'data-testid': testId = 'illustration',
  name,
  size = ILLUSTRATION_DEFAULT_SIZE,
}: IllustrationProps) => {
  const [Component, setComponent] = useState<
    ComponentType<SVGProps<SVGSVGElement>> | null | undefined
  >(null);

  const pxSize = typeof size === 'number' ? size : ILLUSTRATION_SIZES_PX[size];

  useLayoutEffect(() => {
    let isMounted = true;
    if (componentCache.has(name)) {
      if (isMounted) setComponent(componentCache.get(name));
      return;
    }

    import(`./../../../illustrations/${name}.tsx`).then(importedComponent => {
      if (isMounted) {
        const Component = importedComponent.default;
        componentCache.set(name, Component);
        setComponent(Component);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [name]);

  return (
    <span data-testid={testId} style={{ width: pxSize }}>
      {Component && (
        <Component
          data-testid={suffixTestId(testId, name)}
          height="100%"
          role="img"
          width={pxSize}
        />
      )}
    </span>
  );
};

export default Illustration;
