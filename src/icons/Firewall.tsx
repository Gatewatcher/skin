import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgFirewall = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#firewall_svg__a)" fill="currentColor">
      <path d="M20.25 15.298v2.25c-.75 0-1.5-1.125-1.5-3v-2.25c-3 3.75-3.75 5.25-3.75 6.75a3.75 3.75 0 0 0 2.284 3.452 5.65 5.65 0 0 1 1.466-2.702 5.65 5.65 0 0 1 1.466 2.702 3.75 3.75 0 0 0 2.284-3.452c0-1.5-.844-2.679-2.25-3.75M12.75 21H3v-3h9.75v-1.5H3A1.5 1.5 0 0 0 1.5 18v3A1.5 1.5 0 0 0 3 22.5h9.75z" />
      <path d="M21 9H5.25a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h7.5v-1.5h-7.5v-3H21V12h1.5v-1.5A1.5 1.5 0 0 0 21 9M18.75 7.5H3A1.5 1.5 0 0 1 1.5 6V3A1.5 1.5 0 0 1 3 1.5h15.75a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5M3 3v3h15.75V3z" />
    </g>
    <defs>
      <clipPath id="firewall_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgFirewall);
export default Memo;
