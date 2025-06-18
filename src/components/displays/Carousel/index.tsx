import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { ButtonIcon } from '@/skin/actions';
import { useOnResizeElement } from '@/skin/displays/panels/DrawerV2/PanelLayout/hooks';
import { Stack } from '@/skin/layout';
import type { Gap } from '@/skin/layout/Grid/types';

import Dropdown from '../floating/Dropdown';
import { TEST_IDS } from './constants';

import styles from './styles.module.scss';

export type CarouselProps = DataTestId & {
  children: ReactNode;
  gap?: Gap;
  values?: unknown;
  leftDivider?: ReactNode;
  rightDivider?: ReactNode;
  dropdownContent?: ReactNode;
};

const Carousel = ({
  'data-testid': testId = 'carousel',
  children,
  gap = 4,
  values,
  leftDivider,
  rightDivider,
  dropdownContent,
}: CarouselProps) => {
  const [positionRight, setPositionRight] = useState(0);
  const [rightDisabled, setRightDisabled] = useState(true);
  const [leftDisabled, setLeftDisabled] = useState(true);
  const [preview, setPreview] = useState<HTMLElement | undefined>();
  const [previewContainer, setPreviewContainer] = useState<
    HTMLElement | undefined
  >();

  const handleLeftClick = () => {
    if (!previewContainer || !preview) {
      return null;
    }
    const previewContainerWidth = previewContainer.clientWidth;
    const previewWidth = preview.clientWidth;

    if (previewContainerWidth > previewWidth) {
      return setPositionRight(0);
    }

    let toTheLeft = previewContainerWidth / 2;
    if (previewContainerWidth + toTheLeft + positionRight < previewWidth) {
      toTheLeft = positionRight;
    }

    setPositionRight(positionRight => Math.max(positionRight - toTheLeft, 0));
  };

  const handleRightClick = () => {
    if (!previewContainer || !preview) {
      return null;
    }
    const previewContainerWidth = previewContainer.clientWidth;
    const previewWidth = preview.clientWidth;

    let toTheRight = previewContainerWidth / 2;
    if (previewContainerWidth + toTheRight + positionRight > previewWidth) {
      toTheRight = previewWidth - (previewContainerWidth + positionRight);
    }

    setPositionRight(positionRight => positionRight + toTheRight);
  };

  const handleRightAndLeftDisabling = useCallback(() => {
    const previewWidth = preview?.clientWidth;
    const containerWidth = previewContainer?.clientWidth;

    if (!containerWidth || !previewWidth) {
      setLeftDisabled(true);
      setRightDisabled(true);
      return;
    }

    const canScrollRight = containerWidth < previewWidth;
    const canScrollLeft = positionRight > 0;
    const atRightEnd = positionRight + containerWidth >= previewWidth;

    setRightDisabled(!canScrollRight || atRightEnd);
    setLeftDisabled(!canScrollLeft);
  }, [positionRight, preview?.clientWidth, previewContainer?.clientWidth]);

  useEffect(() => {
    handleRightAndLeftDisabling();
  });

  const resetCarousel = useCallback(() => {
    setPositionRight(0);
    handleRightAndLeftDisabling();
  }, [handleRightAndLeftDisabling]);

  const resetCarouselRef = useRef(resetCarousel);
  useEffect(() => {
    resetCarouselRef.current = resetCarousel;
  }, [resetCarousel]);
  useEffect(() => {
    resetCarouselRef.current();
  }, [values]);

  return (
    <Stack
      alignItems="center"
      className={styles.Carousel}
      data-testid={testId}
      justifyContent="space-between"
      setRef={useOnResizeElement(resetCarousel).setElement}
    >
      <ButtonIcon
        data-testid={TEST_IDS.leftButton}
        disabled={leftDisabled}
        icon="ChevronLeft"
        onClick={handleLeftClick}
        type="neutral"
        variant="ghosted"
      />
      {leftDivider}
      <Stack
        className={styles.PreviewContainer}
        data-testid={TEST_IDS.previewContainer}
        setRef={setPreviewContainer}
      >
        <Stack
          className={styles.Preview}
          data-testid={TEST_IDS.preview}
          gap={gap}
          setRef={setPreview}
          style={{ right: positionRight }}
        >
          {children}
        </Stack>
      </Stack>
      {rightDivider}
      <Stack>
        <ButtonIcon
          data-testid={TEST_IDS.rightButton}
          disabled={rightDisabled}
          icon="ChevronRight"
          onClick={handleRightClick}
          type="neutral"
          variant="ghosted"
        />
        {!!dropdownContent && (
          <Dropdown
            content={dropdownContent}
            maxHeight="fit"
            placement="bottom-end"
            strategy="fixed"
            triggerOn={['click', 'focus']}
          >
            <ButtonIcon
              data-testid={TEST_IDS.dropdownButton}
              icon="View"
              type="neutral"
              variant="ghosted"
            />
          </Dropdown>
        )}
      </Stack>
    </Stack>
  );
};

export default Carousel;
