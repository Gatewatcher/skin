import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCircleFilledCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#circle-filled-check_svg__a)">
      <path
        d="M12 1.5a10.5 10.5 0 1 0 0 21 10.5 10.5 0 0 0 0-21m-1.5 14.693-3.75-3.75 1.193-1.193 2.557 2.557 5.558-5.557 1.196 1.19z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="circle-filled-check_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCircleFilledCheck);
export default Memo;
