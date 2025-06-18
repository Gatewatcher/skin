import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgTabletPortrait = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#tablet-portrait_svg__a)" fill="currentColor">
      <path d="M14.25 19.5V18h-4.5v1.5z" />
      <path d="M18.75 22.5H5.25a1.5 1.5 0 0 1-1.5-1.5V3a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v18a1.5 1.5 0 0 1-1.5 1.5M5.25 3v18h13.5V3z" />
    </g>
    <defs>
      <clipPath id="tablet-portrait_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgTabletPortrait);
export default Memo;
