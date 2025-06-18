import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgChevronLeftCenterLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#chevron-left-center-left_svg__a)">
      <path
        d="M-.5 12 7 4.5l1.05 1.05L1.6 12l6.45 6.45L7 19.5z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="chevron-left-center-left_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgChevronLeftCenterLeft);
export default Memo;
