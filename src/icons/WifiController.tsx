import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgWifiController = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#wifi-controller_svg__a)" fill="currentColor">
      <path d="M4.5 22.5h15A1.5 1.5 0 0 0 21 21v-4.5a1.5 1.5 0 0 0-1.5-1.5h-15A1.5 1.5 0 0 0 3 16.5V21a1.5 1.5 0 0 0 1.5 1.5m0-6h15V21h-15z" />
      <path d="M6.75 19.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M12 12a1.125 1.125 0 1 0 0-2.25A1.125 1.125 0 0 0 12 12M8.087 7.75a5.25 5.25 0 0 1 7.826 0l-1.118 1a3.75 3.75 0 0 0-5.59 0z" />
      <path d="M5.4 5.55a8.25 8.25 0 0 1 13.2 0l-1.2.9a6.75 6.75 0 0 0-10.801 0z" />
    </g>
    <defs>
      <clipPath id="wifi-controller_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgWifiController);
export default Memo;
