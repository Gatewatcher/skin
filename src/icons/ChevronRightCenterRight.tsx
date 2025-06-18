import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgChevronRightCenterRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#chevron-right-center-right_svg__a)">
      <path
        d="M24.5 12 17 19.5l-1.05-1.05L22.4 12l-6.45-6.45L17 4.5z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="chevron-right-center-right_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgChevronRightCenterRight);
export default Memo;
