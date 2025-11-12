import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { generateUniqId } from '@gatewatcher/bistoury/utils-lang';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import mermaid from 'mermaid';
import { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import svgPanZoom from 'svg-pan-zoom';

import { CircularLoader } from '@/skin/feedback';
import { Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';

import MermaidTabs from './compounds/MermaidTabs';
import {
  DEFAULT_RENDERING_ERROR_MESSAGE,
  RENDERING_ERROR_MESSAGE_TEST_ID,
  SVG_PAN_ZOOM_DEFAULT_OPTIONS,
} from './constants';

import styles from './styles.module.scss';

mermaid.initialize({
  suppressErrorRendering: true,
});

export type MermaidViewerProps = DataTestId & {
  code: string;
  renderingErrorMessage?: string;
  svgPanZoomOptions?: SvgPanZoom.Options;
};

const MermaidViewer = ({
  code,
  renderingErrorMessage = DEFAULT_RENDERING_ERROR_MESSAGE,
  svgPanZoomOptions = SVG_PAN_ZOOM_DEFAULT_OPTIONS,
  'data-testid': TestId = 'mermaid-container',
}: MermaidViewerProps) => {
  const [hasRenderingError, setHasRenderingError] = useState(false);
  const id = useRef(generateUniqId());

  const initializeMermaid = async (element: HTMLElement) => {
    if (element) {
      const loader = (
        <Stack alignItems="center" justifyContent="center">
          <CircularLoader size="large" />
        </Stack>
      );
      const root = createRoot(element);
      root.render(loader);

      try {
        const { svg, bindFunctions } = await mermaid.render(
          `mermaid-diagram-${id.current}`,
          code,
        );
        element.innerHTML = svg;
        bindFunctions?.(element);
        setHasRenderingError(false);
      } catch (error) {
        setHasRenderingError(true);
      }

      try {
        const svgElement = document.querySelector(`#${id.current} > svg`);
        const isSVGElement = svgElement instanceof SVGElement;

        if (svgElement && isSVGElement) {
          svgPanZoom(svgElement, svgPanZoomOptions);

          if (svgElement instanceof SVGGraphicsElement) {
            const bbox = svgElement.getBBox();
            svgElement.setAttribute('width', `${bbox.width}`);
            svgElement.setAttribute('height', `${bbox.height}`);
          }
        }
      } catch (error) {
        return;
      }
    }
  };

  return hasRenderingError ? (
    <Text data-testid={RENDERING_ERROR_MESSAGE_TEST_ID}>
      {renderingErrorMessage}
    </Text>
  ) : (
    <Stack
      className={classNames(styles.mermaidDiagramContainer)}
      data-testid={TestId}
      id={id.current}
      setRef={initializeMermaid}
    ></Stack>
  );
};

MermaidViewer.Tabs = MermaidTabs;

export default MermaidViewer;
