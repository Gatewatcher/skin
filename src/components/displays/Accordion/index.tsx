import { useOnWindowResize } from '@gatewatcher/bistoury/hooks';
import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { isString } from '@gatewatcher/bistoury/utils-lang';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';
import { memo, useEffect, useMemo, useState } from 'react';
import { animated, useSpring } from 'react-spring';

import { ANIMATION_SHARED_CONFIG } from '@/constants';
import { Stack } from '@/skin/layout';
import { Title } from '@/skin/typography';
import { buildTestIds } from '@/utils/testIds';

import Icon from '../icons/Icon';
import AccordionGroup from './compounds/Group';
import SelectableItem from './compounds/SelectableItem';
import {
  DEFAULT_DEFAULT_EXPANDED,
  SUFFIX_TEST_IDS,
  TEST_ID,
} from './constants';

import styles from './styles.module.scss';

export type AccordionProps = DataTestId & {
  children: ReactNode;
  defaultExpanded?: boolean;
  title: ReactNode;
};

const Accordion = ({
  children,
  'data-testid': testId = TEST_ID,
  defaultExpanded = DEFAULT_DEFAULT_EXPANDED,
  title,
}: AccordionProps) => {
  const TEST_IDS = buildTestIds(testId, SUFFIX_TEST_IDS);

  const [offsetHeight, setOffsetHeight] = useState(0);
  const [opened, setOpened] = useState(defaultExpanded);

  const animationStyleOptions = useMemo(
    () => ({ height: opened ? offsetHeight : 64 }),
    [offsetHeight, opened],
  );

  const [animation, api] = useSpring(() => ({
    from: animationStyleOptions,
    config: ANIMATION_SHARED_CONFIG,
  }));

  useEffect(() => {
    api.start(animationStyleOptions);
  }, [api, animationStyleOptions]);

  useOnWindowResize(() => {
    if (opened) {
      api.set({ height: offsetHeight });
    }
  });

  return (
    <animated.div className={styles.Accordion} style={animation}>
      <div
        ref={element => setOffsetHeight(element?.offsetHeight ?? 0)}
        data-testid={testId}
      >
        <Stack
          alignItems="center"
          as="header"
          className={classNames(styles.Title, opened && styles.TitleOpened)}
          data-testid={TEST_IDS.title}
          gap={6}
          justifyContent="space-between"
          onClick={() => setOpened(val => !val)}
        >
          {(isString(title) && <Title as="h5">{title}</Title>) || title}
          <Icon name="ChevronDown" size="large" />
        </Stack>

        <div className={classNames(styles.Body)} data-testid={TEST_IDS.body}>
          {children}
        </div>
      </div>
    </animated.div>
  );
};

Accordion.Group = memo(AccordionGroup);
Accordion.SelectableItem = memo(SelectableItem);

export default Accordion;
