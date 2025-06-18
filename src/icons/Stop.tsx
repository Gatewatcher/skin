import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgStop = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#stop_svg__a)">
      <path
        d="M12 2.125a10.5 10.5 0 1 0 0 21 10.5 10.5 0 0 0 0-21m4.5 13.5a1.5 1.5 0 0 1-1.5 1.5H9a1.5 1.5 0 0 1-1.5-1.5v-6a1.5 1.5 0 0 1 1.5-1.5h6a1.5 1.5 0 0 1 1.5 1.5z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="stop_svg__a">
        <path d="M0 .625h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgStop);
export default Memo;
