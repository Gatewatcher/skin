import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCircleFilledWarning = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#circle-filled-warning_svg__a)">
      <path
        d="M12 1.5C6.225 1.5 1.5 6.225 1.5 12S6.225 22.5 12 22.5 22.5 17.775 22.5 12 17.775 1.5 12 1.5M11.175 6h1.65v8.25h-1.65zM12 18.75c-.6 0-1.125-.525-1.125-1.125S11.4 16.5 12 16.5s1.125.525 1.125 1.125S12.6 18.75 12 18.75"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="circle-filled-warning_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCircleFilledWarning);
export default Memo;
