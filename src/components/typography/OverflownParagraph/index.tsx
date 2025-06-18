import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { UseIsOverflownOptions } from 'hooks/useIsOverflown';
import { useIsOverflown } from 'hooks/useIsOverflown';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/skin/actions';
import { Stack } from '@/skin/layout';
import { getVariantClassNames } from '@/skin/typography/utils';

import type { ParagraphProps } from '../Paragraph';
import { InternalParagraph } from '../Paragraph';

import styles from './styles.module.scss';

export type OverflownParagraphProps = UseIsOverflownOptions &
  ParagraphProps & {
    height?: string | number;
    showMoreButton?: (showMore: Function) => ReactNode;
  };

const OverflownParagraph = ({
  children,
  'data-testid': testId = 'overflown-paragraph',
  height,
  overflowWrap,
  showMoreButton,
  withWatchScreenResize,
  wordBreak,
}: OverflownParagraphProps) => {
  const ref = useRef<HTMLParagraphElement>(null);

  const isOverflown = useIsOverflown(ref, {
    direction: 'vertical',
    ...(withWatchScreenResize && { withWatchScreenResize }),
  });

  const [fullyShown, setFullyShown] = useState(isOverflown);

  useEffect(() => {
    setFullyShown(!isOverflown);
  }, [isOverflown]);

  const showMore = () => {
    setFullyShown(true);
  };

  return (
    <Stack className={styles.container} direction="column">
      <InternalParagraph
        ref={ref}
        className={classNames(
          fullyShown
            ? styles.OverflownParagraphFull
            : styles.OverflownParagraph,
          getVariantClassNames({
            overflowWrap,
            wordBreak,
          }),
        )}
        data-testid={testId}
        style={{ height }}
      >
        {children}
      </InternalParagraph>

      {!fullyShown && (
        <Stack.Item className={classNames(styles.buttonContainer)}>
          {showMoreButton ? (
            showMoreButton(showMoreButton)
          ) : (
            <Button
              endIcon="ChevronDown"
              onClick={showMore}
              variant="transparent"
            >
              Show more
            </Button>
          )}
        </Stack.Item>
      )}
    </Stack>
  );
};

export default OverflownParagraph;
