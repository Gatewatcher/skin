import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgDevices = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#devices_svg__a)" fill="currentColor">
      <path d="M7.5 22.5H3A1.5 1.5 0 0 1 1.5 21v-9A1.5 1.5 0 0 1 3 10.5h4.5A1.5 1.5 0 0 1 9 12v9a1.5 1.5 0 0 1-1.5 1.5M3 12v9h4.5v-9z" />
      <path d="M21 3H4.5A1.5 1.5 0 0 0 3 4.5V9h1.5V4.5H21V15H10.5v1.5H12v3h-1.5V21h6.75v-1.5H13.5v-3H21a1.5 1.5 0 0 0 1.5-1.5V4.5A1.5 1.5 0 0 0 21 3" />
    </g>
    <defs>
      <clipPath id="devices_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgDevices);
export default Memo;
