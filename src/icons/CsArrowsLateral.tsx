import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCsArrowsLateral = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#cs-arrows-lateral_svg__a)" fill="currentColor">
      <path d="m15.443 14.558 2.685 2.692H3v1.5h15.128l-2.685 2.692L16.5 22.5 21 18l-4.5-4.5zM21 6l-4.5-4.5-1.057 1.058 2.685 2.692H3v1.5h15.128l-2.685 2.693L16.5 10.5z" />
    </g>
    <defs>
      <clipPath id="cs-arrows-lateral_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCsArrowsLateral);
export default Memo;
