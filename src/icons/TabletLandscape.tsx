import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgTabletLandscape = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#tablet-landscape_svg__a)" fill="currentColor">
      <path d="M19.5 9.75H18v4.5h1.5z" />
      <path d="M22.5 5.25v13.5a1.5 1.5 0 0 1-1.5 1.5H3a1.5 1.5 0 0 1-1.5-1.5V5.25A1.5 1.5 0 0 1 3 3.75h18a1.5 1.5 0 0 1 1.5 1.5M3 18.75h18V5.25H3z" />
    </g>
    <defs>
      <clipPath id="tablet-landscape_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgTabletLandscape);
export default Memo;
