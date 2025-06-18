import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgElements = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#elements_svg__a)" fill="currentColor">
      <path d="M6.75 9V7.5H3A1.5 1.5 0 0 0 1.5 9v12A1.5 1.5 0 0 0 3 22.5h12a1.5 1.5 0 0 0 1.5-1.5v-6.75H15V21H3V9" />
      <path d="M16.5 9h-6V3h6zM9 3v6a1.5 1.5 0 0 0 1.5 1.5h6A1.5 1.5 0 0 0 18 9V3a1.5 1.5 0 0 0-1.5-1.5h-6A1.5 1.5 0 0 0 9 3M10.5 13.5v3h-3v-3zm-4.5 0v3A1.5 1.5 0 0 0 7.5 18h3a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5h-3A1.5 1.5 0 0 0 6 13.5M21 12.75v1.5h-1.5v-1.5zM18 12v3a.75.75 0 0 0 .75.75h3a.75.75 0 0 0 .75-.75v-3a.75.75 0 0 0-.75-.75h-3A.75.75 0 0 0 18 12" />
    </g>
    <defs>
      <clipPath id="elements_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgElements);
export default Memo;
