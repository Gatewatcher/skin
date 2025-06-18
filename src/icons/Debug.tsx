import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgDebug = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#debug_svg__a)">
      <path
        d="m22.373 15 .255-1.5-3.878-.637V9.578l3.795-1.02-.383-1.448-3.622.968A6.75 6.75 0 0 0 15 3.75V1.5h-1.5v1.672a6.6 6.6 0 0 0-3 0V1.5H9v2.25a6.75 6.75 0 0 0-3.532 4.365L1.845 7.11 1.5 8.557l3.75 1.02v3.286l-3.87.637.24 1.5 3.63-.615c.017.925.227 1.837.615 2.678l-3.398 3.405 1.066 1.064 3.142-3.15a6.75 6.75 0 0 0 10.65 0l3.143 3.15 1.064-1.064-3.404-3.405c.39-.84.602-1.752.622-2.678zM11.25 19.44a5.25 5.25 0 0 1-4.5-5.19v-4.5h4.5zM6.968 8.25a5.25 5.25 0 0 1 10.064 0zm10.282 6a5.25 5.25 0 0 1-4.5 5.19V9.75h4.5z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="debug_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgDebug);
export default Memo;
